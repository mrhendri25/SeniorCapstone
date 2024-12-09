import nfl_data_py as nfl
import pymongo
from pymongo import MongoClient
import pandas as pd
import numpy as np
import time
from determine_points import determine_points
from define_regression import points_regression
from pull_data import data_to_train_model, prediction_data, get_schedule

mongo_uri = "mongodb+srv://sdeck1313:A!!yp3dr02020@statistics.b04y7.mongodb.net/"

client = MongoClient(mongo_uri)

db = client['ModelData']
schedule_collection = db['Predictions']


def monte_carlo_simulation(num_simulations):
    training_df = data_to_train_model()
    regress = points_regression(training_df)
    nfl_pbp = prediction_data()
    week = max(nfl_pbp['week'])+1
    df_games = get_schedule(week)
    all_simulations_results = []
    home_team_wins = []
    home_team_differential = []
    total_score = []


    pbp_rp = nfl_pbp[((nfl_pbp['pass'] == 1) | (nfl_pbp['rush'] == 1))].copy()


    pbp_rp.loc[pbp_rp['pass'] == 1, 'pass_success'] = (pbp_rp['epa'] > 0)
    pbp_rp.loc[pbp_rp['rush'] == 1, 'rush_success'] = (pbp_rp['epa'] > 0)
    pbp_rp['pass_success'] = pbp_rp['pass_success'].astype(bool) # To remove warnings
    pbp_rp['rush_success'] = pbp_rp['rush_success'].astype(bool)

    pbp_rp['explosive_play'] = ((pbp_rp['pass'] == 1) | (pbp_rp['rush'] == 1)) & (pbp_rp['yards_gained'] > 20)

    pass_epa = pbp_rp[pbp_rp['pass'] == 1].groupby(['game_id', 'season', 'week', 'posteam', 'posteam_type'])['epa'].mean().reset_index(name='pass_epa')
    rush_epa = pbp_rp[pbp_rp['rush'] == 1].groupby(['game_id', 'season', 'week', 'posteam', 'posteam_type'])['epa'].mean().reset_index(name='rush_epa')
    pass_sr = pbp_rp[pbp_rp['pass'] == 1].groupby(['game_id', 'season', 'week', 'posteam', 'posteam_type'])['pass_success'].mean().reset_index(name='pass_sr')
    rush_sr = pbp_rp[pbp_rp['rush'] == 1].groupby(['game_id', 'season', 'week', 'posteam', 'posteam_type'])['rush_success'].mean().reset_index(name='rush_sr')
    explosive_rate = pbp_rp.groupby(['game_id', 'season', 'week', 'posteam', 'posteam_type'])['explosive_play'].mean().reset_index(name='explosive_rate')

    combined_metrics = pd.concat([pass_epa, rush_epa, pass_sr, rush_sr, explosive_rate], axis=1)

    combined_metrics = combined_metrics.loc[:, ~combined_metrics.columns.duplicated()]

    df_defense = combined_metrics.copy()

    df_defense['def_pass_epa'] = df_defense.groupby('game_id')['pass_epa'].shift(-1).fillna(df_defense.groupby('game_id')['pass_epa'].shift(1))
    df_defense['def_rush_epa'] = df_defense.groupby('game_id')['rush_epa'].shift(-1).fillna(df_defense.groupby('game_id')['rush_epa'].shift(1))
    df_defense['def_pass_sr'] = df_defense.groupby('game_id')['pass_sr'].shift(-1).fillna(df_defense.groupby('game_id')['pass_sr'].shift(1))
    df_defense['def_rush_sr'] = df_defense.groupby('game_id')['rush_sr'].shift(-1).fillna(df_defense.groupby('game_id')['rush_sr'].shift(1))
    df_defense['def_explosive_rate'] = df_defense.groupby('game_id')['explosive_rate'].shift(-1).fillna(df_defense.groupby('game_id')['explosive_rate'].shift(1))

    df_defense = df_defense.drop(columns=['pass_epa', 'rush_epa', 'pass_sr', 'rush_sr', 'explosive_rate'])

    normal_array = []
    groups = combined_metrics.groupby('posteam')
    for name, group in groups:
        team_list = list(group['posteam'])
        weights = []
        for i in range(len(group)):
            weights.append(i+1)
        team = team_list[0]
        pass_epa_mean = np.average(list(group['pass_epa']), weights=weights)
        pass_epa_std = np.std(list(group['pass_epa']))
        rush_epa_mean = np.average(list(group['rush_epa']), weights=weights)
        rush_epa_std = np.std(list(group['rush_epa']))
        pass_sr_mean = np.average(list(group['pass_sr']), weights=weights)
        pass_sr_std = np.std(list(group['pass_sr']))
        rush_sr_mean = np.average(list(group['rush_sr']), weights=weights)
        rush_sr_std = np.std(list(group['rush_sr']))
        explosive_mean = np.average(list(group['explosive_rate']), weights=weights)
        explosive_std = np.std(list(group['explosive_rate']))
        temp_array = [team, pass_epa_mean, pass_epa_std, rush_epa_mean, rush_epa_std, pass_sr_mean, pass_sr_std, rush_sr_mean, rush_sr_std, explosive_mean, explosive_std]
        normal_array.append(temp_array)
    normal_df = pd.DataFrame(normal_array, columns=['team', 'pass_epa_mean', 'pass_epa_std', 'rush_epa_mean', 'rush_epa_std', 'pass_sr_mean', 'pass_sr_std', 'rush_sr_mean', 'rush_sr_std', 'explosive_mean', 'explosive_std'])

    normal_array = []
    groups = df_defense.groupby('posteam')
    for name, group in groups:
        team_list = list(group['posteam'])
        weights = []
        for i in range(len(group)):
            weights.append(i+1)
        team = team_list[0]
        pass_epa_mean = np.average(list(group['def_pass_epa']), weights=weights)
        pass_epa_std = np.std(list(group['def_pass_epa']))
        rush_epa_mean = np.average(list(group['def_rush_epa']), weights=weights)
        rush_epa_std = np.std(list(group['def_rush_epa']))
        pass_sr_mean = np.average(list(group['def_pass_sr']), weights=weights)
        pass_sr_std = np.std(list(group['def_pass_sr']))
        rush_sr_mean = np.average(list(group['def_rush_sr']), weights=weights)
        rush_sr_std = np.std(list(group['def_rush_sr']))
        explosive_mean = np.average(list(group['def_explosive_rate']), weights=weights)
        explosive_std = np.std(list(group['def_explosive_rate']))
        temp_array = [team, pass_epa_mean, pass_epa_std, rush_epa_mean, rush_epa_std, pass_sr_mean, pass_sr_std, rush_sr_mean, rush_sr_std, explosive_mean, explosive_std]
        normal_array.append(temp_array)

    def_normal_df = pd.DataFrame(normal_array, columns=['team', 'pass_epa_mean', 'pass_epa_std', 'rush_epa_mean', 'rush_epa_std', 'pass_sr_mean', 'pass_sr_std', 'rush_sr_mean', 'rush_sr_std', 'explosive_mean', 'explosive_std'])


    for _ in range(num_simulations):
       
        predict_df = pd.DataFrame(columns=['team', 'pass_epa', 'rush_epa', 'pass_sr', 'rush_sr', 'explosive_rate'])
        for i in range(len(normal_df)):

            temp_team = normal_df.loc[i]

            team = temp_team['team']
            np.random.seed(int(time.time()))
            mu = temp_team['pass_epa_mean']
            sigma = temp_team['pass_epa_std']
            s = np.random.normal(mu, sigma, 1)
            predict_pass_epa = np.mean(s)

            np.random.seed(int(time.time()))
            mu = temp_team['rush_epa_mean']
            sigma = temp_team['rush_epa_std']
            s = np.random.normal(mu, sigma, 1)
            predict_rush_epa = np.mean(s)

            np.random.seed(int(time.time()))
            mu = temp_team['pass_sr_mean']
            sigma = temp_team['pass_sr_std']
            s = np.random.normal(mu, sigma, 1)
            predict_pass_sr = np.mean(s)

            np.random.seed(int(time.time()))
            mu = temp_team['rush_sr_mean']
            sigma = temp_team['rush_sr_std']
            s = np.random.normal(mu, sigma, 1)
            predict_rush_sr = np.mean(s)

            np.random.seed(int(time.time()))
            mu = temp_team['explosive_mean']
            sigma = temp_team['explosive_std']
            s = np.random.normal(mu, sigma, 1)
            predict_explosive = np.mean(s)

            data = [team, predict_pass_epa, predict_rush_epa, predict_pass_sr, predict_rush_sr, predict_explosive]
            predict_df.loc[len(predict_df)] = data
    
        predict_def_df = pd.DataFrame(columns=['team', 'pass_epa', 'rush_epa', 'pass_sr', 'rush_sr', 'explosive_rate'])
        for i in range(len(def_normal_df)):

            temp_team = def_normal_df.loc[i]

            team = temp_team['team']

            np.random.seed(int(time.time()))
            mu = temp_team['pass_epa_mean']
            sigma = temp_team['pass_epa_std']
            s = np.random.normal(mu, sigma, 1)
            predict_pass_epa = np.mean(s)

            np.random.seed(int(time.time()))
            mu = temp_team['rush_epa_mean']
            sigma = temp_team['rush_epa_std']
            s = np.random.normal(mu, sigma, 1)
            predict_rush_epa = np.mean(s)

            np.random.seed(int(time.time()))
            mu = temp_team['pass_sr_mean']
            sigma = temp_team['pass_sr_std']
            s = np.random.normal(mu, sigma, 1)
            predict_pass_sr = np.mean(s)

            np.random.seed(int(time.time()))
            mu = temp_team['rush_sr_mean']
            sigma = temp_team['rush_sr_std']
            s = np.random.normal(mu, sigma, 1)
            predict_rush_sr = np.mean(s)

            np.random.seed(int(time.time()))
            mu = temp_team['explosive_mean']
            sigma = temp_team['explosive_std']
            s = np.random.normal(mu, sigma, 1)
            predict_explosive = np.mean(s)

            data = [team, predict_pass_epa, predict_rush_epa, predict_pass_sr, predict_rush_sr, predict_explosive]
            predict_def_df.loc[len(predict_def_df)] = data

        offense_df, defense_df = determine_points(predict_df, predict_def_df, regress)
        offense_df = offense_df.drop(columns=['pass_epa', 'rush_epa', 'pass_sr', 'rush_sr', 'explosive_rate'])
        defense_df = defense_df.drop(columns=['pass_epa', 'rush_epa', 'pass_sr', 'rush_sr', 'explosive_rate'])
        df_merged = pd.merge(df_games, offense_df, left_on='home_team', right_on='team')
        df_merged = df_merged.rename(columns={'prediction_label': 'home_team_predicted_score'})
        df_merged = df_merged.drop(columns=['team'])

        df_merged = pd.merge(df_merged, offense_df, left_on='away_team', right_on='team')
        df_merged = df_merged.rename(columns={'prediction_label': 'away_team_predicted_score'})
        df_merged = df_merged.drop(columns=['team'])

        df_merged = pd.merge(df_merged, defense_df, left_on='home_team', right_on='team')
        df_merged = df_merged.rename(columns={'prediction_label': 'home_team_predicted_score_against'})
        df_merged = df_merged.drop(columns=['team'])

        df_merged = pd.merge(df_merged, defense_df, left_on='away_team', right_on='team')
        df_merged = df_merged.rename(columns={'prediction_label': 'away_team_predicted_score_against'})
        df_merged = df_merged.drop(columns=['team'])

        home_team_total = []
        away_team_total = []
        for i in range(len(df_merged)):
            temp_home_team_total = (df_merged['home_team_predicted_score'].iloc[i] + df_merged['away_team_predicted_score_against'].iloc[i]) / 2
            temp_away_team_total = (df_merged['away_team_predicted_score'].iloc[i] + df_merged['home_team_predicted_score_against'].iloc[i]) / 2
            home_team_total.append(temp_home_team_total)
            away_team_total.append(temp_away_team_total)

        df_merged['home_team_total'] = home_team_total
        df_merged['away_team_total'] = away_team_total

        df_merged = df_merged.drop(columns=['home_team_predicted_score', 'away_team_predicted_score', 'home_team_predicted_score_against', 'away_team_predicted_score_against'])

        temp_home_team_win = []
        for i in range(len(df_merged)):
            if home_team_total[i] > away_team_total[i]:
                temp_home_team_win.append(1)
            else:
                temp_home_team_win.append(0)
        if len(home_team_wins) == 0:
            home_team_wins = temp_home_team_win
        else:
            home_team_wins = np.add(home_team_wins, temp_home_team_win)

        temp_home_team_differential = np.array(home_team_total) - np.array(away_team_total)
        if len(home_team_differential) == 0:
            home_team_differential = temp_home_team_differential
        else:
            home_team_differential = np.add(home_team_differential, temp_home_team_differential)

        temp_total = np.array(home_team_total) + np.array(away_team_total)
        if len(total_score) == 0:
            total_score = temp_total
        else:
            total_score = np.add(total_score, temp_total)
        
    home_team_wins = list(home_team_wins)
    home_team_differential = list(home_team_differential)
    total_score = list(total_score)
    
    home_team_win_percentage = [w / num_simulations for w in home_team_wins]
    home_team_differential_average = [d / num_simulations for d in home_team_differential]
    total_avg_score = [s / num_simulations for s in total_score]

    winner = []
    game_id = list(df_merged['game_id'])
    home_team = list(df_merged['home_team'])
    away_team = list(df_merged['away_team'])
    for i in range(len(df_merged)):
        if home_team_win_percentage[i] > 0.5:
            winner.append(home_team[i])
        else:
            home_team_win_percentage[i] = 1 - home_team_win_percentage[i]
            winner.append(away_team[i])
        
    avg_point_differential = [abs(x) for x in home_team_differential_average]

    final_df = pd.DataFrame({
        'game_id': game_id,
        'home_team': home_team,
        'away_team': away_team,
        'winner': winner,
        'win_pct': home_team_win_percentage,
        'avg_pt_diff': avg_point_differential,
        'avg_total_score': total_avg_score
        })
        
    simulation_result = final_df.to_dict(orient='records')

    all_simulations_results.extend(simulation_result)

    schedule_collection.insert_many(all_simulations_results)

    return final_df

x = monte_carlo_simulation(1000)
print(x)
