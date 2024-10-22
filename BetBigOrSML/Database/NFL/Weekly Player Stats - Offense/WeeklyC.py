import nfl_data_py as nfl
import pandas as pd
import pymongo
from pymongo import MongoClient
from datetime import datetime

mongo_uri = "mongodb+srv://sdeck1313:A!!yp3dr02020@statistics.b04y7.mongodb.net/"

client = MongoClient(mongo_uri)

db = client['NFLData']
qb_collection = db['C Weekly Statistics']

season = 2024

player_stats = nfl.import_weekly_data([season])

c_stats = player_stats[player_stats['position'] == 'QB']

current_time = datetime.now()

c_stats_dict = c_stats.to_dict('records')

for record in c_stats_dict:
    record['updated_at'] = current_time

qb_collection.delete_many({})

qb_collection.insert_many(c_stats_dict)

print(f"Center stats have been successfully updated in MongoDB at {current_time}.")
