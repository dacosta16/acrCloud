require('./config/config');
const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');

//Habilitar la carpeta Public
app.use(express.static(path.resolve(__dirname, './public')));

//Middlewares 
app.use(morgan('dev'));
app.use(express.json())

//Configuracion Global de Rutas
app.use(require('./routes/index'));



app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto: ', process.env.PORT);
});