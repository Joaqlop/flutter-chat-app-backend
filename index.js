const express = require('express');
const path = require('path');
require('dotenv').config();

// Express APP
const app = express();

// HTTP Petition
app.use(express.json());

// DB Config
const {dbConnection} = require('./database/config');
dbConnection();

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


// Public Path
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );

// Routes
app.use('/api/login', require('./routes/auth'));

server.listen(process.env.PORT, (error) => {
    if (error) throw new Error(error);
    console.log('Servidor corriendo en puerto', process.env.PORT);
});


