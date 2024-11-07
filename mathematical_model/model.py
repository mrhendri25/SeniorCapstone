import pandas as pd
import numpy as np
from determine_points import determine_points
from define_regression import points_regression
from pull_data import data_to_train_model, prediction_data, get_schedule

def monte_carlo_simulation(num_simulations):
    training_df = data_to_train_model()
    regress = points_regression(training_df)
    offense_df, defense_df = prediction_data()
    df_games = get_schedule()
    for _ in range(num_simulations):
        offense_df, defense_df = determine_points(offense_df, defense_df, df_games, regress)
    return offense_df, defense_df

x, y = monte_carlo_simulation(1)
print(x)
print(y)
