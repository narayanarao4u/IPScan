const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// MySQL connection
const db = mysql.createConnection({
    host: '10.34.130.254',
    user: 'bsnlvm',
    password: 'bsnl@123',
    database: 'ipScanDb',
    timezone: 'IST' // Set timezone to IST
});

// Get all records
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM scanTb order by Date desc, time desc ';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(results);
    });
});

//Get Data by Date and Time
router.get('/dateTime', (req, res) => {
    const sql = `select Date, Time, count(*) PCs from  ipScanDb.scanTb 	
                    group by Date, Time 
                    order by  Date desc, Time desc`;
                    
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(results);
    });
})

//macip address count
router.get('/macip', (req, res) => {
    const sql = `select Physical_Address, IP_Address from  ipScanDb.scanTb 
	group by Physical_Address, IP_Address order by 1`;
                    
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(results);
    });
})


//IPs Never Used
router.get('/ipNeverUsed', (req, res) => {
    const sql = `
    with tb as (
	select distinct IP_Address from scanTb
        )
        select ip.IP_Address from IPRange ip left join tb on ip.IP_Address = tb.IP_Address 
        where tb.IP_Address is null
        order by INET_ATON(ip.IP_Address)

    `;
                    
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(results);
    });
})


// Get a record by ID
router.get('/:Physical_Address', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM scanTb WHERE Physical_Address = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(results[0]);
    });
});

// Add a new record
router.post('/', (req, res) => {
    const { IP_Address, Physical_Address, Type, File, Date, Time } = req.body;
    const sql = 'INSERT INTO scanTb (IP_Address, Physical_Address, Type, File, Date, Time) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [IP_Address, Physical_Address, Type, File, Date, Time], (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(201).json({ id: result.insertId });
    });
});

// Update a record
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { IP_Address, Physical_Address, Type, File, Date, Time } = req.body;
    const sql = 'UPDATE scanTb SET IP_Address = ?, Physical_Address = ?, Type = ?, File = ?, Date = ?, Time = ? WHERE id = ?';
    db.query(sql, [IP_Address, Physical_Address, Type, File, Date, Time, id], (err) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).send('Record updated successfully.');
    });
});

// Delete a record
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM scanTb WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).send('Record deleted successfully.');
    });
});

module.exports = router;
