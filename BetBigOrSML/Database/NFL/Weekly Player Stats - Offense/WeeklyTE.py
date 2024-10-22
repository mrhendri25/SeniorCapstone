import nfl_data_py as nfl
import pandas as pd
import pymongo
from pymongo import MongoClient
from datetime import datetime

mongo_uri = "mongodb+srv://sdeck1313:A!!yp3dr02020@statistics.b04y7.mongodb.net/"

client = MongoClient(mongo_uri)

db = client['NFLWeeklyPlayerData']
te_collection = db['TE Weekly Statistics']

season = 2024

player_stats = nfl.import_weekly_data([season])

te_stats = player_stats[player_stats['position'] == 'TE']

current_time = datetime.now()

te_stats_dict = te_stats.to_dict('records')

for record in te_stats_dict:
    record['updated_at'] = current_time

te_collection.delete_many({})

te_collection.insert_many(te_stats_dict)

print(f"TE stats have been successfully updated in MongoDB at {current_time}.")
