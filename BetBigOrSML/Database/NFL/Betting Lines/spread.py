import pandas as pd
from pymongo import MongoClient

# MongoDB connection details
mongo_uri = "mongodb+srv://sdeck1313:A!!yp3dr02020@statistics.b04y7.mongodb.net/"
database_name = "BettingData"
collection_name = "Spread"

# Path to your Excel file
excel_file_path = "NFL Odds.xlsx"
sheet_name = "Spread"  # You can specify the sheet by name or index (e.g., 0 for the first sheet)

# Create a connection to MongoDB
client = MongoClient(mongo_uri)
db = client[database_name]
collection = db[collection_name]

# Load the specific sheet from the Excel file into a pandas DataFrame
df = pd.read_excel(excel_file_path, sheet_name=sheet_name)

# Convert DataFrame rows to a list of dictionaries for MongoDB
data = df.to_dict(orient='records')

# Insert data into MongoDB
if data:
    collection.insert_many(data)
    print(f"Inserted {len(data)} records into the {collection_name} collection.")
else:
    print("No data found in the Excel sheet.")

# Close the connection
client.close()
