import nfl_data_py as nfl
import pandas as pd
import pymongo
from pymongo import MongoClient
from datetime import datetime

# MongoDB connection details
mongo_uri = "mongodb+srv://sdeck1313:A!!yp3dr02020@statistics.b04y7.mongodb.net/"
client = MongoClient(mongo_uri)
db = client['NFLSeasonPlayerData']
season_te_collection = db['TE Season Statistics']

# Define the season year
season = 2024

# Import weekly data for the entire season
weekly_data = nfl.import_weekly_data([season])

# Filter data for quarterbacks (QB)
qb_stats = weekly_data[weekly_data['position'] == 'TE']

# Define the columns that we want to sum (numeric stats)
numeric_columns_to_sum = [
    'completions', 'attempts', 'passing_yards', 'passing_tds', 'interceptions',
    'sacks', 'sack_yards', 'sack_fumbles', 'sack_fumbles_lost', 'passing_air_yards',
    'passing_yards_after_catch', 'passing_first_downs', 'passing_epa',
    'passing_2pt_conversions', 'pacr', 'dakota', 'carries', 'rushing_yards', 
    'rushing_tds', 'rushing_fumbles', 'rushing_fumbles_lost', 'rushing_first_downs', 
    'rushing_epa', 'rushing_2pt_conversions', 'fantasy_points', 'fantasy_points_ppr'
]

# Group by player and sum up the relevant stats
season_stats = qb_stats.groupby('player_id').agg({
    'player_name': 'first',                # Retain the player's name
    'recent_team': 'first',                # Retain the most recent team
    'season': 'first',                     # Keep the season information
    **{col: 'sum' for col in numeric_columns_to_sum}  # Sum numeric columns
}).reset_index()

# Downcast float columns to save memory
float_columns = season_stats.select_dtypes(include='float').columns
season_stats[float_columns] = season_stats[float_columns].apply(pd.to_numeric, downcast='float')

# Add a timestamp for when the data is inserted
current_time = datetime.now()
season_stats['updated_at'] = current_time

# Convert the DataFrame to a dictionary for MongoDB insertion
season_stats_dict = season_stats.to_dict('records')

# Insert data into the MongoDB collection
season_te_collection.delete_many({})  # Clear existing season stats (if needed)
season_te_collection.insert_many(season_stats_dict)

print(f"Full season TE stats have been successfully updated in MongoDB at {current_time}.")
