const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');




const app = express();

//carregamento de rotas

const usersRoute = require('./routes/users'); //importatando de rotas



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


//configurando cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-Width, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors());
    next();
});


//implementando rotas
// app.use('/', index);
app.use('/user', usersRoute);
app.use(
    "/arquivos",
    express.static(path.resolve(__dirname,"tmp","uploads"))
);

module.exports = app;
