import pandas as pd
import nfl_data_py as nfl
import numpy as np

def data_to_train_model():
    nfl_pbp = nfl.import_pbp_data([2023, 2022, 2021, 2020, 2019, 2018])
    pbp_rp = nfl_pbp[((nfl_pbp['pass'] == 1) | (nfl_pbp['rush'] == 1))].copy()


    pbp_rp.loc[pbp_rp['pass'] == 1, 'pass_success'] = (pbp_rp['epa'] > 0)
    pbp_rp.loc[pbp_rp['rush'] == 1, 'rush_success'] = (pbp_rp['epa'] > 0)
    pbp_rp['pass_success'] = pbp_rp['pass_success'].astype(bool)
    pbp_rp['rush_success'] = pbp_rp['rush_success'].astype(bool)

    pbp_rp['explosive_play'] = ((pbp_rp['pass'] == 1) | (pbp_rp['rush'] == 1)) & (pbp_rp['yards_gained'] > 20)

    pass_epa = pbp_rp[pbp_rp['pass'] == 1].groupby(['game_id', 'season', 'week', 'posteam', 'posteam_type'])['epa'].mean().reset_index(name='pass_epa')
    rush_epa = pbp_rp[pbp_rp['rush'] == 1].groupby(['game_id', 'season', 'week', 'posteam', 'posteam_type'])['epa'].mean().reset_index(name='rush_epa')
    pass_sr = pbp_rp[pbp_rp['pass'] == 1].groupby(['game_id', 'season', 'week', 'posteam', 'posteam_type'])['pass_success'].mean().reset_index(name='pass_sr')
    rush_sr = pbp_rp[pbp_rp['rush'] == 1].groupby(['game_id', 'season', 'week', 'posteam', 'posteam_type'])['rush_success'].mean().reset_index(name='rush_sr')
    explosive_rate = pbp_rp.groupby(['game_id', 'season', 'week', 'posteam', 'posteam_type'])['explosive_play'].mean().reset_index(name='explosive_rate')


    combined_metrics = pd.concat([pass_epa, rush_epa, pass_sr, rush_sr, explosive_rate], axis=1)

    combined_metrics = combined_metrics.loc[:, ~combined_metrics.columns.duplicated()]
    season_data = nfl.import_schedules([2023, 2022, 2021, 2020, 2019, 2018])

    season_data['home_team'] = season_data['home_team'].replace({'OAK': 'LV', 'SD': 'LAC'})
    season_data['away_team'] = season_data['away_team'].replace({'OAK': 'LV', 'SD': 'LAC'})

    season_data['home_win'] = np.where(season_data['home_score'] > season_data['away_score'], 1, 0)
    season_data['away_win'] = np.where(season_data['away_score'] > season_data['home_score'], 1, 0)

    short_season_data = pd.concat([season_data['game_id'], season_data['away_team'], season_data['home_team'], season_data['away_score'], season_data['home_score'], season_data['away_win'], season_data['home_win']], axis=1)
    
    df_away = short_season_data[['game_id', 'away_team', 'away_score', 'away_win']].rename(columns={'away_team': 'posteam', 'away_score': 'score', 'away_win': 'win'})
    df_home = short_season_data[['game_id', 'home_team', 'home_score','home_win']].rename(columns={'home_team': 'posteam', 'home_score': 'score', 'home_win': 'win'})

    short_season_data= pd.concat([df_away, df_home], ignore_index=True)

    merged_df = pd.merge(combined_metrics, short_season_data, on=['game_id','posteam'], how='left')

    return merged_df

def prediction_data():
    nfl_pbp = nfl.import_pbp_data([2024])

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
            weights.append((i+1)^2)
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
            weights.append((i+1)^2)
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

    predict_df = pd.DataFrame(columns=['team', 'pass_epa', 'rush_epa', 'pass_sr', 'rush_sr', 'explosive_rate'])
    for i in range(len(normal_df)):

        temp_team = normal_df.loc[i]

        team = temp_team['team']

        mu = temp_team['pass_epa_mean']
        sigma = temp_team['pass_epa_std']
        s = np.random.normal(mu, sigma, 10000)
        predict_pass_epa = np.mean(s)

        mu = temp_team['rush_epa_mean']
        sigma = temp_team['rush_epa_std']
        s = np.random.normal(mu, sigma, 10000)
        predict_rush_epa = np.mean(s)

        mu = temp_team['pass_sr_mean']
        sigma = temp_team['pass_sr_std']
        s = np.random.normal(mu, sigma, 10000)
        predict_pass_sr = np.mean(s)

        mu = temp_team['rush_sr_mean']
        sigma = temp_team['rush_sr_std']
        s = np.random.normal(mu, sigma, 10000)
        predict_rush_sr = np.mean(s)

        mu = temp_team['explosive_mean']
        sigma = temp_team['explosive_std']
        s = np.random.normal(mu, sigma, 10000)
        predict_explosive = np.mean(s)

        data = [team, predict_pass_epa, predict_rush_epa, predict_pass_sr, predict_rush_sr, predict_explosive]
        predict_df.loc[len(predict_df)] = data
    
    predict_def_df = pd.DataFrame(columns=['team', 'def_pass_epa', 'def_rush_epa', 'def_pass_sr', 'def_rush_sr', 'def_explosive_rate'])
    for i in range(len(def_normal_df)):

        temp_team = def_normal_df.loc[i]

        team = temp_team['team']

        mu = temp_team['pass_epa_mean']
        sigma = temp_team['pass_epa_std']
        s = np.random.normal(mu, sigma, 10000)
        predict_pass_epa = np.mean(s)

        mu = temp_team['rush_epa_mean']
        sigma = temp_team['rush_epa_std']
        s = np.random.normal(mu, sigma, 10000)
        predict_rush_epa = np.mean(s)

        mu = temp_team['pass_sr_mean']
        sigma = temp_team['pass_sr_std']
        s = np.random.normal(mu, sigma, 10000)
        predict_pass_sr = np.mean(s)

        mu = temp_team['rush_sr_mean']
        sigma = temp_team['rush_sr_std']
        s = np.random.normal(mu, sigma, 10000)
        predict_rush_sr = np.mean(s)

        mu = temp_team['explosive_mean']
        sigma = temp_team['explosive_std']
        s = np.random.normal(mu, sigma, 10000)
        predict_explosive = np.mean(s)

        data = [team, predict_pass_epa, predict_rush_epa, predict_pass_sr, predict_rush_sr, predict_explosive]
        predict_def_df.loc[len(predict_def_df)] = data

    return predict_df, predict_def_df
