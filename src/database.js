const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'acrcloud'
});

mysqlConnection.connect(function(err) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Base de Datos Online');
    }
});



module.exports = mysqlConnection;