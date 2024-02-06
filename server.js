// server.js
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));

// Define a route to serve the JavaScript file (index.js)
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.js'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
