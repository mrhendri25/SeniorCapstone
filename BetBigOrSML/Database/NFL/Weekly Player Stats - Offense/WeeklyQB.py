import nfl_data_py as nfl
import pandas as pd
import pymongo
from pymongo import MongoClient
from datetime import datetime

mongo_uri = "mongodb+srv://sdeck1313:A!!yp3dr02020@statistics.b04y7.mongodb.net/"

client = MongoClient(mongo_uri)

db = client['NFLWeeklyPlayerData']
qb_collection = db['QB Weekly Statistics']

season = 2024

player_stats = nfl.import_weekly_data([season])

qb_stats = player_stats[player_stats['position'] == 'QB']

current_time = datetime.now()

qb_stats_dict = qb_stats.to_dict('records')

for record in qb_stats_dict:
    record['updated_at'] = current_time

qb_collection.delete_many({})

qb_collection.insert_many(qb_stats_dict)

print(f"QB stats have been successfully updated in MongoDB at {current_time}.")
