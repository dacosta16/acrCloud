const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const mysqlConnection = require('../database');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())



//Convertir milisegundos a segundos
// var ms = 298999,
//     min = Math.floor((ms / 1000 / 60) << 0),
//     sec = Math.floor((ms / 1000) % 60);
//console.log(min + ':' + sec);
//==================================


app.post('/monitor', (req, res) => {

    var estacion = req.body.estacion;
    var fecha = req.body.fecha.replace(/-/g, "");
    var stream_Id = '';
    var access_Key = '';

    if (estacion === 'mvs') {
        stream_Id = 236710;
        access_Key = '10092c059f8bac6dccc8160833cd8758'
    } else if (estacion === 'siempre') {
        stream_Id = '236711';
        access_Key = '10092c059f8bac6dccc8160833cd8758';
    } else {
        stream_Id = '236761';
        access_Key = '10092c059f8bac6dccc8160833cd8758';
    }

    if (estacion.length === 0 && fecha.length === 0) {
        throw new Error("No se recibieron datos");
    } else {
        axios.get(`https://api.acrcloud.com/v1/monitor-streams/${stream_Id}/results?access_key=${access_Key}&date=${fecha}`)
            .then((result) => {

                let array = result.data;

                let todos = [];

                for (i = 0; i < array.length; i++) { // inicio del for

                    objInArr = array[i].metadata.custom_files[0];
                    duracionAlAir = array[i].metadata.played_duration + '"';
                    horaEmision = array[i].metadata.timestamp_utc;

                    let tituloAnuncio = objInArr.title;
                    let duracionTotal = objInArr.duration_ms;
                    let duracionTotalConv = Math.floor((duracionTotal / 1000) % 60) + '"'

                    let completo = ""
                    if (duracionAlAir != duracionTotalConv) {
                        completo = 'incompleto'
                    } else {
                        completo = 'completo'
                    }


                    let separadorFecha = horaEmision.split(" ", 1).toString();
                    let separadorHora = horaEmision.slice(-8);

                    let datos = {};
                    datos.fecha = separadorFecha;
                    datos.hora = separadorHora;
                    datos.titulo = tituloAnuncio;
                    datos.duracion_total = duracionTotalConv;
                    datos.tiempo_transmitido = duracionAlAir;
                    datos.status = completo;
                    // datos.total_registros = array.length;

                    todos.push(datos);

                }; // Final del For



                return res.json(todos);


            }).catch((err) => {
                console.log(err);
            });

    }

});


// ====================================================================================


// ====================================================================================
module.exports = app;