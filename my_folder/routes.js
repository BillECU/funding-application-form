// routes/userRoutes.js
const express = require('express');
const pool = require('../server'); // Import the pool from server.js
const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
    const { fullName, email, phone } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO users (full_name, email, phone) VALUES ($1, $2, $3) RETURNING *',
            [fullName, email, phone]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});