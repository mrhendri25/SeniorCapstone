import pandas as pd
import nfl_data_py as nfl


nfl_pbp = nfl.import_pbp_data([2023])
pbp_rp = nfl_pbp[(nfl_pbp['pass'] == 1) | (nfl_pbp['rush'] == 1)]
pbp_rp = pbp_rp.dropna(subset = ['epa', 'posteam', 'defteam'])
pbp_rp.loc[pbp_rp['pass'] == 1, 'pass_success'] = (pbp_rp['epa'] > 0)
pbp_rp.loc[pbp_rp['rush'] == 1, 'rush_success'] = (pbp_rp['epa'] > 0)
pbp_rp['pass_success'] = pbp_rp['pass_success'].astype(bool)
pbp_rp['rush_success'] = pbp_rp['rush_success'].astype(bool)
pbp_rp['explosive_play'] = ((pbp_rp['pass'] == 1) | (pbp_rp['rush'] == 1)) & (pbp_rp['yards_gained'] > 20)
pass_sr = pbp_rp[pbp_rp['pass'] == 1].groupby(['game_id', 'season', 'week', 'posteam', 'posteam_type'])['pass_success'].mean().reset_index(name='pass_sr')
rush_sr = pbp_rp[pbp_rp['rush'] == 1].groupby(['game_id', 'season', 'week', 'posteam', 'posteam_type'])['rush_success'].mean().reset_index(name='rush_sr')
pass_sr = pass_sr.groupby(['posteam','posteam_type'])['pass_sr'].mean().reset_index()
rush_sr = rush_sr.groupby(['posteam','posteam_type'])['rush_sr'].mean().reset_index()
explosive_rate = pbp_rp.groupby(['game_id', 'season', 'week', 'posteam', 'posteam_type'])['explosive_play'].mean().reset_index(name='explosive_rate')
pass_epa = pbp_rp[(nfl_pbp['pass'] == 1)].groupby(['posteam','posteam_type'])['epa'].mean().reset_index().rename(columns = {'epa': 'pass_epa'})
rush_epa = pbp_rp[(nfl_pbp['rush'] == 1)].groupby(['posteam','posteam_type'])['epa'].mean().reset_index().rename(columns = {'epa': 'rush_epa'})
explosive_rate = explosive_rate.groupby(['posteam','posteam_type'])['explosive_rate'].mean().reset_index()
epa = pd.merge(pass_epa, rush_epa, on=['posteam','posteam_type'])
sr = pd.merge(pass_sr, rush_sr, on=['posteam','posteam_type'])
epa_sr = pd.merge(epa, sr, on=['posteam','posteam_type'])
combined_stats = pd.merge(epa_sr, explosive_rate, on=['posteam','posteam_type'])
combined_stats = combined_stats.groupby('posteam_type')
for name, group in combined_stats:
    posteam_list = list(group['posteam_type'])
    if posteam_list[0] == 'away':
        away_df = group.reset_index()
        away_df = away_df.drop(columns=['index'], axis=1)
    else:
        home_df = group.reset_index()
        home_df = home_df.drop(columns=['index'], axis=1)
print(home_df)
print(away_df)
