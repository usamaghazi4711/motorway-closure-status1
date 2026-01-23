const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path'); 
const app = express();

app.use(cors());
app.use(express.json());

// 1. MySQL Connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'u401300623_498mws',
    password: 'Dre123hea@!',
    database: 'u401300623_498mws',
    waitForConnections: true,
    connectionLimit: 10
});

// 2. API Routes
app.get('/api/status', (req, res) => {
    // Changed table name to 'plaza_statuses' to match your database
    db.query('SELECT * FROM plaza_statuses', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/api/update', (req, res) => {
    const { key, motorway, plaza, direction, status, reason, startTime } = req.body;
    // Changed table name to 'plaza_statuses' here too
    const sql = `INSERT INTO plaza_statuses (id, motorway, plaza_name, direction, status, reason, start_time) 
                 VALUES (?, ?, ?, ?, ?, ?, ?) 
                 ON DUPLICATE KEY UPDATE status=?, reason=?, start_time=?`;
    
    db.query(sql, [key, motorway, plaza, direction, status, reason, startTime, status, reason, startTime], (err) => {
        if (err) return res.status(500).send(err);
        // Ensure you have an 'app_metadata' table or remove this line
        db.query("UPDATE app_metadata SET meta_value = NOW() WHERE meta_key = 'last_updated'");
        res.json({ success: true });
    });
});

// 3. FRONTEND SERVING
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
