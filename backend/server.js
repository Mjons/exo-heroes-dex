const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory in the backend
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the 'build' directory in the frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Additional specific route for images if needed
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Mock data - initialize
let nfts = [];
let traits = {};

// Load data from JSON file
const loadData = async () => {
    try {
        const data = await fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8');
        const jsonData = JSON.parse(data);
        nfts = jsonData.nfts;
        traits = jsonData.traits;
        console.log("Data loaded successfully:", { nftsCount: nfts.length, traitsCount: Object.keys(traits).length });
    } catch (error) {
        console.error('Error loading data:', error);
    }
};

// Call loadData when the server starts
loadData();

// API Routes
app.get('/api/nfts', (req, res) => {
    res.json(nfts);
});

app.get('/api/traits', (req, res) => {
    res.json(traits);
});

// Serve the frontend index.html for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
