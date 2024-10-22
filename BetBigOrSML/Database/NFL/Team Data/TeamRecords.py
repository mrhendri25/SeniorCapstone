import nfl_data_py as nfl
import pandas as pd
from pymongo import MongoClient
from datetime import datetime

client = MongoClient('mongodb+srv://sdeck1313:A!!yp3dr02020@statistics.b04y7.mongodb.net/')  # Replace with your MongoDB connection string
db = client['NFLData']
collection = db['Team Records']

schedules = nfl.import_schedules([2024])

completed_games = schedules[schedules['result'].notna()][['game_id', 'home_team', 'away_team', 'result', 'home_score', 'away_score']]

team_records = {}

for _, game in completed_games.iterrows():
    home_team = game['home_team']
    away_team = game['away_team']
    

    for team in [home_team, away_team]:
        if team not in team_records:
            team_records[team] = {'wins': 0, 'losses': 0}
    
    # Update records based on game result
    if game['home_score'] > game['away_score']:
        team_records[home_team]['wins'] += 1
        team_records[away_team]['losses'] += 1
    elif game['home_score'] < game['away_score']:
        team_records[home_team]['losses'] += 1
        team_records[away_team]['wins'] += 1
    # Ties are not accounted for in this simple example

# Convert the records to a list of dictionaries for MongoDB
records_list = [{"team": team, "wins": record['wins'], "losses": record['losses'], 
                 "win_loss_record": f"{record['wins']}-{record['losses']}",
                 "updated_at": datetime.now()} 
                for team, record in team_records.items()]

# Insert the records into MongoDB
collection.insert_many(records_list)

print(f"Successfully inserted {len(records_list)} team records into MongoDB.")

# Optionally, you can retrieve and print the records from MongoDB
for record in collection.find():
    print(f"{record['team']}: {record['win_loss_record']}")