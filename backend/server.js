const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Read and parse data.json
const rawData = fs.readFileSync(path.join(__dirname, 'data/data.json'));
const { nfts, traits } = JSON.parse(rawData);

// Serve static files from the 'frontend/build' directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Serve images from the 'public/images' directory
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// API Routes
app.get('/api/nfts', (req, res) => {
    res.json(nfts);
});

app.get('/api/traits', (req, res) => {
    res.json(traits);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
