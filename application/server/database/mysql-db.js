const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'kumaaraso',
    port: 3306
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

function add_entry(pathUrl) {
    const sql = `INSERT INTO audio (path) VALUES ('${pathUrl}')`;

    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
    });
}

module.exports = {conn, add_entry};