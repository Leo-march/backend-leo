const mysql = require('mysql2');

const pool = mysql.createConnection({
    "user": "root",
    "password": "root",
    "database": "hopi_hari",
    "host": "localhost",
    "port": "3306"
});

exports.execute = (query, param = [], varPool = pool) => {
    return new Promise((resolve, reject) => {
        varPool.query(query, param, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

exports.pool = pool