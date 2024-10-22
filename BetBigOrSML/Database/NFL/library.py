import nfl_data_py as nfl
import pandas as pd

# Specify the year you want to import data for (e.g., 2024)
years = [2024]

# Import the weekly data for the specified year(s)
weekly_data = nfl.import_weekly_data(years=years)

# Import player data
players = nfl.import_seasonal_rosters(years=years)

# Merge weekly data with player data to show player information alongside weekly performance
merged_data = pd.merge(weekly_data, players, on='player_id', how='left')

# Display the first few rows of the merged DataFrame to check the data
print(merged_data.head())

# Export the merged data to an Excel file
merged_data.to_excel('weekly_data_with_players.xlsx', index=False)

print("Weekly data with player information exported to weekly_data_with_players.xlsx")
