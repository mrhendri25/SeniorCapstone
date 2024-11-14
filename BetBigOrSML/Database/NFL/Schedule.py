import nfl_data_py as nfl
import pymongo
from pymongo import MongoClient

# MongoDB connection URI
mongo_uri = "mongodb+srv://sdeck1313:A!!yp3dr02020@statistics.b04y7.mongodb.net/"

# Connect to MongoDB client
client = MongoClient(mongo_uri)

# Select the database and collection
db = client['NFLData']
schedule_collection = db['NFL 2024-25 Schedule']

# Import the NFL schedule for the 2024 season
nfl_schedule = nfl.import_schedules([2024])

# Convert the schedule data to a list of dictionaries
schedule_dict = nfl_schedule.to_dict('records')

# Delete existing documents in the schedule collection
schedule_collection.delete_many({})

# Insert the new schedule data
schedule_collection.insert_many(schedule_dict)

print("2024 NFL schedule has been successfully updated in MongoDB.")
