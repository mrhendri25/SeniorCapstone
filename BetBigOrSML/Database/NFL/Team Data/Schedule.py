import nfl_data_py as nfl
import pandas as pd
import pymongo
from pymongo import MongoClient

mongo_uri = "mongodb+srv://sdeck1313:A!!yp3dr02020@statistics.b04y7.mongodb.net/"

client = MongoClient(mongo_uri)

db = client['NFLData']
schedule_collection = db['NFL 2024-25 Schedule']

nfl_schedule = nfl.import_schedules([2024])


schedule_dict = nfl_schedule.to_dict('records')

schedule_collection.insert_many(schedule_dict)

print("2024 NFL schedule has been successfully inserted into MongoDB.")
