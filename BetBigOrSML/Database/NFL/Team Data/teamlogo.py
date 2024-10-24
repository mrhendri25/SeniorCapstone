import nfl_data_py as nfl
from pymongo import MongoClient
import os

# Fetch the NFL team logo data
team_logos = nfl.import_team_desc()

# Connect to MongoDB
# Make sure to set these environment variables with your MongoDB connection details
mongo_uri = os.environ.get('MONGO_URI', 'mongodb+srv://sdeck1313:A!!yp3dr02020@statistics.b04y7.mongodb.net/')
db_name = os.environ.get('MONGO_DB_NAME', 'nfl_database')
collection_name = 'team_logos'

client = MongoClient(mongo_uri)
db = client[db_name]
collection = db[collection_name]

# Insert the team logo data into MongoDB
for index, row in team_logos.iterrows():
    logo_data = row.to_dict()
    collection.update_one(
        {'team_abbr': logo_data['team_abbr']},
        {'$set': logo_data},
        upsert=True
    )

print(f"Inserted {len(team_logos)} team logos into the database.")

# Close the MongoDB connection
client.close()
