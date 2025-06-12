const express = require('express');
const router = express.Router();
const db = require('./db');
const { v4: uuidv4 } = require('uuid');

// Get all pcinfos
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM pcinfos ORDER BY createdAt DESC';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

// Get a pcinfo by _id
router.get('/:_id', (req, res) => {
    const { _id } = req.params;
    const sql = 'SELECT * FROM pcinfos WHERE _id = ?';
    db.query(sql, [_id], (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results[0]);
    });
});

// Create a new pcinfo
router.post('/', (req, res) => {
    const data = { ...req.body, _id: uuidv4() };
    const fields = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);
    const sql = `INSERT INTO pcinfos (${fields}) VALUES (${placeholders})`;
    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ _id: data._id });
    });
});

// Update a pcinfo by _id
router.put('/:_id', (req, res) => {
    const { _id } = req.params;
    const data = req.body;
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), _id];
    const sql = `UPDATE pcinfos SET ${fields} WHERE _id = ?`;
    db.query(sql, values, (err) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).send('Record updated successfully.');
    });
});

// Delete a pcinfo by _id
router.delete('/:_id', (req, res) => {
    const { _id } = req.params;
    const sql = 'DELETE FROM pcinfos WHERE _id = ?';
    db.query(sql, [_id], (err) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).send('Record deleted successfully.');
    });
});

module.exports = router;
