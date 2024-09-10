import pandas as pd
import numpy as np
from determine_points import determine_home_points, determine_away_points

def monte_carlo_simulation(num_simulations):
    home_wins = 0
    away_wins = 0
    draws = 0

    for _ in range(num_simulations):
        rng = np.random.default_rng()
        home_goals = determine_home_points(rng.random())
        away_goals = determine_away_points(rng.random())
        
        if home_goals > away_goals:
            home_wins += 1
        elif home_goals < away_goals:
            away_wins += 1
        else:
            draws += 1

    return home_wins, away_wins, draws

x, y, z = monte_carlo_simulation(1000)
print(x, y, z)
