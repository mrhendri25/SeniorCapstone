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

    return nfl_pbp

def get_schedule(week):
    schedules = nfl.import_schedules([2024])
    schedules = schedules[schedules['week'] == week]
    df_games = pd.DataFrame({
        'game_id': list(schedules['game_id']),
        'home_team': list(schedules['home_team']),
        'away_team': list(schedules['away_team'])
    })
    return df_games
