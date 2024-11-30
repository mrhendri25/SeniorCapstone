import nfl_data_py as nfl
import pymongo
from pymongo import MongoClient
import pandas as pd
import numpy as np
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
    offense_df, defense_df, week = prediction_data()
    df_games = get_schedule(week)
    all_simulations_results = []
    home_team_wins = []
    home_team_differential = []

    for _ in range(num_simulations):
        offense_df, defense_df = determine_points(offense_df, defense_df, regress)
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
        for i in range(df_merged):
            if home_team_total[i] > away_team_total[i]:
                temp_home_team_win.append(1)
            else:
                temp_home_team_win.append(0)
        if home_team_wins == []:
            home_team_wins = temp_home_team_win
        else:
            home_team_wins = np.add(home_team_wins, temp_home_team_win)

        temp_home_team_differential = np.array(home_team_total) - np.array(away_team_total)
        if home_team_differential == []:
            home_team_differential = temp_home_team_differential
        else:
            home_team_differential = np.add(home_team_differential, temp_home_team_differential)
        

        simulation_result = df_merged.to_dict(orient='records')
    
    home_team_win_percentage = [w / num_simulations for w in home_team_wins]
    home_team_differential_average = [d / num_simulations for d in home_team_differential]
    
    all_simulations_results.extend(simulation_result)

    schedule_collection.insert_many(all_simulations_results)

    return df_merged

x = monte_carlo_simulation(1)
print(x)
