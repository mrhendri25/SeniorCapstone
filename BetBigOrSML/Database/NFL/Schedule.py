import nfl_data_py as nfl
import pymongo
from pymongo import MongoClient

# MongoDB connection details
mongo_uri = "mongodb+srv://sdeck1313:A!!yp3dr02020@statistics.b04y7.mongodb.net/"
client = MongoClient(mongo_uri)

# Define the database and collection
db = client['NFLData']
schedule_collection = db['NFL 2024-25 Schedule']

# Import NFL schedule data
nfl_schedule = nfl.import_schedules([2024])

def add_spreads(game):
    spread = game['spread_line']
    
    if spread > 0:  
        game['away_spread'] = f"+{spread}"
        game['home_spread'] = f"-{spread}"
    elif spread < 0:  
        game['home_spread'] = f"+{-spread}"
        game['away_spread'] = f"-{-spread}"
    else:  
        game['home_spread'] = "No Spread"
        game['away_spread'] = "No Spread"
    
    return game

nfl_schedule = nfl_schedule.apply(add_spreads, axis=1)

def determine_winner(game):
    if game['home_score'] is not None and game['away_score'] is not None:
        if game['home_score'] > game['away_score']:
            return game['home_team']
        elif game['away_score'] > game['home_score']:
            return game['away_team']
    return None

nfl_schedule['winner'] = nfl_schedule.apply(determine_winner, axis=1)

# Convert the DataFrame to a list of dictionaries
schedule_dict = nfl_schedule.to_dict('records')

# Clear existing data in the collection
schedule_collection.delete_many({})

# Insert the updated data into MongoDB
schedule_collection.insert_many(schedule_dict)

print("2024 NFL schedule has been successfully updated in MongoDB with winner and spread information.")
