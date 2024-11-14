import nfl_data_py as nfl
import pandas as pd
import pymongo
from pymongo import MongoClient
from datetime import datetime

mongo_uri = "mongodb+srv://sdeck1313:A!!yp3dr02020@statistics.b04y7.mongodb.net/"

client = MongoClient(mongo_uri)

db = client['NFLWeeklyPlayerData']
rb_collection = db['RB Weekly Statistics']

season = 2024

player_stats = nfl.import_weekly_data([season])

rb_stats = player_stats[player_stats['position'] == 'RB']

current_time = datetime.now()

rb_stats_dict = rb_stats.to_dict('records')

for record in rb_stats_dict:
    record['updated_at'] = current_time

rb_collection.delete_many({})

rb_collection.insert_many(rb_stats_dict)

print(f"RB stats have been successfully updated in MongoDB at {current_time}.")
