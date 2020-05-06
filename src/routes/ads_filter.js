var express = require('express');

const mysqlConnection = require('../database');

const app = express();



app.post('/metadata', (req, res) => {

    let pais = req.body.pais;
    let titles = req.body.title;
    let firstDate = req.body.firstDate;
    let secondDate = req.body.secondDate;
    let array = req.body.checkedStations;
    let registros = [];


    for (var i = 0; i < array; i++) {
        registros[i] = array[i];
    }

    let sql = `
        SELECT * FROM metada 
        WHERE country = "${pais}" 
        AND title = "${titles}" 
        AND channel IN(?)
        AND DATE(fechaHora) >= DATE("${firstDate}")
        AND DATE(fechaHora) <= DATE("${secondDate}")
        `

    let query = mysqlConnection.query(sql, [array], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result)
    });


}); // app Final











module.exports = app;