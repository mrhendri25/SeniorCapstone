import nfl_data_py as nfl
import pandas as pd
import pymongo
from pymongo import MongoClient
from datetime import datetime

mongo_uri = "mongodb+srv://sdeck1313:A!!yp3dr02020@statistics.b04y7.mongodb.net/"

client = MongoClient(mongo_uri)

db = client['NFLWeeklyPlayerData']
wr_collection = db['WR Weekly Statistics']

season = 2024

player_stats = nfl.import_weekly_data([season])

wr_stats = player_stats[player_stats['position'] == 'WR']

current_time = datetime.now()

wr_stats_dict = wr_stats.to_dict('records')

for record in wr_stats_dict:
    record['updated_at'] = current_time

wr_collection.delete_many({})

wr_collection.insert_many(wr_stats_dict)

print(f"Wide receiver stats have been successfully updated in MongoDB at {current_time}.")
