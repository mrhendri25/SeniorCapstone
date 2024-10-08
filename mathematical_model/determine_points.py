import numpy as np
import pandas as pd

def determine_home_points(rv, home_df, away_df, home_player_df, away_player_df):
    home_ppg = home_df['PPG']
    away_papg = away_df['PAPG']
    base_points_scored = np.mean([home_ppg, away_papg])
    return base_points_scored

def determine_away_points(rv, home_df, away_df, home_player_df, away_player_df):
    away_ppg = away_df['PPG']
    home_papg = home_df['PAPG']
    base_points_scored = np.mean([away_ppg, home_papg])
    return base_points_scored

def determine_qb_passing_yards(rv, home_df, away_df, home_player_df, away_player_df):
    pass_yards = home_df['Pass_Yds']

