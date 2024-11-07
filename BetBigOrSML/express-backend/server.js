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

//qbweeklydata api
app.get('/api/qbweeklydata', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('NFLWeeklyPlayerData');
        const collection = db.collection('QB Weekly Statistics');
        
        const players = await collection.find({}).toArray();

        res.status(200).json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

//rbweeklydata api
app.get('/api/rbweeklydata', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('NFLWeeklyPlayerData');
        const collection = db.collection('RB Weekly Statistics');
        
        const players = await collection.find({}).toArray();

        res.status(200).json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch RB data' });
    }
});

//wrweeklydata api
app.get('/api/wrweeklydata', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('NFLWeeklyPlayerData');
        const collection = db.collection('WR Weekly Statistics');
        
        const players = await collection.find({}).toArray();

        res.status(200).json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch WR data' });
    }
});

//teweeklydata api
app.get('/api/teweeklydata', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('NFLWeeklyPlayerData');
        const collection = db.collection('TE Weekly Statistics');
        
        const players = await collection.find({}).toArray();

        res.status(200).json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch WR data' });
    }
});

//qbseasondata api
app.get('/api/qbseasondata', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('NFLSeasonPlayerData');
        const collection = db.collection('QB Season Statistics');
        
        const players = await collection.find({}).toArray();

        res.status(200).json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch QB data' });
    }
});

//wrseasondata api
app.get('/api/wrseasondata', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('NFLSeasonPlayerData');
        const collection = db.collection('WR Season Statistics');
        
        const players = await collection.find({}).toArray();

        res.status(200).json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch WR data' });
    }
});

//rbseasondata api
app.get('/api/rbseasondata', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('NFLSeasonPlayerData');
        const collection = db.collection('RB Season Statistics');

        const players = await collection.find({}).toArray();

        res.status(200).json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch RB data' });
    }
});

//teseasondata api
app.get('/api/teseasondata', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('NFLSeasonPlayerData');
        const collection = db.collection('TE Season Statistics');

        const players = await collection.find({}).toArray();

        res.status(200).json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch TE data' });
    }
});

//spread api
app.get('/api/spread', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('BettingData');
        const collection = db.collection('Spread');

        const spread = await collection.find({}).toArray();

        res.status(200).json(spread);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch spread data' });
    }
});

//totals api
app.get('/api/totals', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('BettingData');
        const collection = db.collection('Totals');

        const totals = await collection.find({}).toArray();

        res.status(200).json(totals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch Totals data' });
    }
});

//moneyline api
app.get('/api/moneyline', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('BettingData');
        const collection = db.collection('Moneyline');

        const spread = await collection.find({}).toArray();

        res.status(200).json(spread);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch moneyline data' });
    }
});

//algorithm moneyline prediction api
app.get('/api/moneylineprediction', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('Predictions');
        const collection = db.collection('Moneyline Prediction');

        const moneylinep = await collection.find({}).toArray();

        res.status(200).json(moneylinep);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch moneyline prediction data' });
    }
});

//algorithm spread prediction api
app.get('/api/spreadprediction', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('Predictions');
        const collection = db.collection('Spread Prediction');

        const spreadp = await collection.find({}).toArray();

        res.status(200).json(spreadp);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch spread prediction data' });
    }
});

//algorithm totals prediction api
app.get('/api/totalsprediction', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('Predictions');
        const collection = db.collection('Totals Prediction');

        const totalsp = await collection.find({}).toArray();

        res.status(200).json(totalsp);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch totals prediction data' });
    }
});

//2024-25 schedule api
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
    }
});

//2024-25 WL record api
app.get('/api/wlrecord', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('NFLData');
        const collection = db.collection('Team Records');

        const wlrecord = await collection.find({}).toArray();

        res.status(200).json(wlrecord);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch WL record data' });
    }
});

//team descriptions api
app.get('/api/teamdesc', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('nfl_database');
        const collection = db.collection('team_logos');

        const teamdesc = await collection.find({}).toArray();

        res.status(200).json(teamdesc);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch team desc data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
