const express = require('express');
const xlsx = require('xlsx');
const path = require('path');

const app = express();
const PORT = 3000;

// Function to read Excel file and convert it to JSON
const readExcelFile = () => {
  const filePath = path.join(__dirname, 'FootballSchedule.xlsx');
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet);
};

// API endpoint to serve NFL schedule data
app.get('/api/nfl-schedule', (req, res) => {
  try {
    const data = readExcelFile();
    res.json(data); // Send the data as a JSON response
  } catch (error) {
    res.status(500).send('Error reading Excel file');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
