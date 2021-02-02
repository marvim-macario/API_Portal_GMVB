const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');


const app = express();

//carregamento de rotas
const index = require('./routes/index')
const usersRoute = require('./routes/users'); //importatando de rotas
const propostasRoute = require('./routes/propostas');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//configurando cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-Width, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors());
    next();
});

//imprementando rotas
app.use('/', index);
app.use('/users', usersRoute);
app.use('/propostas',propostasRoute)

module.exports = app;
