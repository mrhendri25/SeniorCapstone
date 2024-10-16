import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://sdeck1313:A!!yp3dr02020@statistics.b04y7.mongodb.net/';
const client = new MongoClient(uri);
let isConnected = false; // Track connection status

async function connectToDatabase() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
}

export async function get({ url }) {
  const playerName = url.searchParams.get('name');

  if (!playerName) {
    return {
      status: 400,
      body: { error: 'Player name is required' },
    };
  }

  try {
    await connectToDatabase(); // Connect to the database if not already connected
    const database = client.db('NFLData'); // Replace with your database name
    const players = database.collection('QB Statistics'); // Replace with your collection name

    const player = await players.findOne({
      $or: [
        { player_name: playerName },
        { player_display_name: playerName }
      ],
      season: '2024'  // Ensure we're only getting stats from the 2024 season
    });

    if (!player) {
      return {
        status: 404,
        body: { error: 'Player not found' },
      };
    }

    return {
      status: 200,
      body: player,
    };
  } catch (error) {
    console.error('Error fetching player data:', error); // Log error for debugging
    return {
      status: 500,
      body: { error: 'Internal server error' },
    };
  }
}
