const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');


const app = express();
const port = 4000;

const uri = 'mongodb+srv://sdeck1313:A!!yp3dr02020@statistics.b04y7.mongodb.net/';
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the NFL Data API');
});

// Helper function to convert moneyline odds to decimal
function moneylineToDecimal(moneyline) {
  return moneyline > 0 ? (moneyline / 100) + 1 : (100 / Math.abs(moneyline)) + 1;
}

// Helper function to calculate parlay odds
function calculateParlayOdds(selections) {
  return selections.reduce((totalOdds, selection) => {
    const decimalOdds = moneylineToDecimal(selection.moneyline);
    return totalOdds * decimalOdds;
  }, 1);
}

// Helper function to calculate potential payout
function calculatePotentialPayout(betAmount, totalOdds) {
  return betAmount * totalOdds;
}

// API endpoint to process bets (Parlay Calculation)
app.post('/process_bet', async (req, res) => {
  const { betId, userId, selections } = req.body;
  const betAmount = 100;

  // Calculate total odds and potential payout
  const totalOdds = calculateParlayOdds(selections);
  const potentialPayout = calculatePotentialPayout(betAmount, totalOdds);

  // Prepare output data
  const outputData = {
    betId,
    userId,
    totalOdds,
    potentialPayout,
    betAmount,
    selections,
  };

  try {
    await client.connect();
    const db = client.db('TEST');
    const outputCollection = db.collection('useroutput');
    await outputCollection.insertOne(outputData);
    res.status(201).json(outputData);
  } catch (error) {
    console.error('Error saving output data:', error);
    res.status(500).json({ message: 'Failed to save output data' });
  } finally {
    await client.close();
  }
});

// API endpoint to save user bet input
app.post('/api/input', async (req, res) => {
    const { betId, userId, selections } = req.body;
  
    try {
      await client.connect();
      const database = client.db('TEST');
      const collection = database.collection('userinput');
  
      await collection.insertOne({ betId, userId, selections });
  
      const totalOdds = calculateParlayOdds(selections);
      const betAmount = 100;
      const potentialPayout = calculatePotentialPayout(betAmount, totalOdds);
  
      const outputData = {
        betId,
        userId,
        totalOdds,
        potentialPayout,
        betAmount,
        selections,
      };
  
      const outputCollection = database.collection('useroutput');
      await outputCollection.insertOne(outputData);
  
      res.status(200).json({ message: 'Bet slip saved and output calculated successfully!' });
    } catch (error) {
      console.error('Error saving bet slip and processing:', error);
      res.status(500).json({ message: 'Failed to save bet slip and process data' });
    } finally {
      await client.close();
    }
});

// Endpoint to fetch user output
app.get('/api/useroutput', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('TEST');
        const collection = db.collection('useroutput');

        const userOutputs = await collection.find({}).toArray();
        res.status(200).json(userOutputs);
    } catch (error) {
        console.error('Error fetching user output data:', error);
        res.status(500).json({ error: 'Failed to fetch user output data' });
    } finally {
        await client.close();
    }
});

// Endpoint to fetch NFL 2024-25 schedule
app.get('/api/schedule', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('NFLData');
        const collection = db.collection('NFL 2024-25 Schedule');

        const schedule = await collection.find({}).toArray();
        res.status(200).json(schedule);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch schedule data' });
    } finally {
        await client.close();
    }
});

// NFL Player Weekly Data Endpoints
app.get('/api/qbweeklydata', getData('NFLWeeklyPlayerData', 'QB Weekly Statistics'));
app.get('/api/rbweeklydata', getData('NFLWeeklyPlayerData', 'RB Weekly Statistics'));
app.get('/api/wrweeklydata', getData('NFLWeeklyPlayerData', 'WR Weekly Statistics'));
app.get('/api/teweeklydata', getData('NFLWeeklyPlayerData', 'TE Weekly Statistics'));

// NFL Player Season Data Endpoints
app.get('/api/qbseasondata', getData('NFLSeasonPlayerData', 'QB Season Statistics'));
app.get('/api/wrseasondata', getData('NFLSeasonPlayerData', 'WR Season Statistics'));
app.get('/api/rbseasondata', getData('NFLSeasonPlayerData', 'RB Season Statistics'));
app.get('/api/teseasondata', getData('NFLSeasonPlayerData', 'TE Season Statistics'));

// Betting Data Endpoints
app.get('/api/spread', getData('BettingData', 'Spread'));
app.get('/api/totals', getData('BettingData', 'Totals'));
app.get('/api/moneyline', getData('BettingData', 'Moneyline'));

// Prediction Data Endpoints
app.get('/api/moneylineprediction', getData('Predictions', 'Moneyline Prediction'));
app.get('/api/spreadprediction', getData('Predictions', 'Spread Prediction'));
app.get('/api/totalsprediction', getData('Predictions', 'Totals Prediction'));

// Generic data-fetching function
function getData(databaseName, collectionName) {
    return async (req, res) => {
        try {
            await client.connect();
            const db = client.db(databaseName);
            const collection = db.collection(collectionName);

            const data = await collection.find({}).toArray();
            res.status(200).json(data);
        } catch (error) {
            console.error(`Error fetching data from ${collectionName}:`, error);
            res.status(500).json({ error: `Failed to fetch data from ${collectionName}` });
        } finally {
            await client.close();
        }
    };
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
