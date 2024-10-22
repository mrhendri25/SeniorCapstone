import pandas as pd
from pymongo import MongoClient

mongo_uri = "mongodb+srv://sdeck1313:A!!yp3dr02020@statistics.b04y7.mongodb.net/"
database_name = "BettingData"
collection_name = "Moneyline"

excel_file_path = "NFL Odds.xlsx"
sheet_ = "Moneyline"

client = MongoClient(mongo_uri)
db = client[database_name]
collection = db[collection_name]

df = pd.read_excel(excel_file_path, sheet_name=sheet_)

data = df.to_dict(orient='records')

if data:
    collection.insert_many(data)
    print(f"Inserted {len(data)} records into the {collection_name} collection.")
else:
    print("No data found in the Excel sheet.")

client.close()
