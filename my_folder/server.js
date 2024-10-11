const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// PostgreSQL Client
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123321',
    port: 5432,
});

client.connect();

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/form.html');
});

// Handle form submission
app.post('/submit', async (req, res) => {
    const { BusinessName, Email } = req.body;

    try {
        const query = 'INSERT INTO businesses (BusinessName, Email) VALUES ($1, $2)';
        await client.query(query, [BusinessName, Email]);
        res.send('Data saved successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving data');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});