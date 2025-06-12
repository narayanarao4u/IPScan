const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const routespcinfos = require('./route-pcinfos'); // <-- Add this line
const db = require('./db'); // <-- Use the db module

// Create Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL database.');
    }
});

// Routes
app.use('/api/scan', routes);
app.use('/api-pcinfo', routespcinfos); // <-- Register new route

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
