const express = require("express");
const app = express();

///////////////////////////////////////////////
const http = require('http').createServer(app);
///////////////////////////////////////////////

const bodyParser = require("body-parser");
const io = require('socket.io')(http);
const database = require('./app/config/dbconfig');
const port = process.argv[2] || 3000;

process.on('exit', function (code) {
    return console.log(`About to exit with code ${code}`);
});

database
    .init
    .then((db) => {

        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());

        /* Router configuration */
        app.use('/api', require('./app/routes/router'));

        io.on('connection', socket => {
            console.log('a user connected');
            socket.on('search', function(msg){

                console.log("Recherche : ", msg)



                io.emit('search-response', msg);
            });
        });

        //accès aux pages statiques
        app.use(express.static('./static/build/'));

        http.listen(port, function () {
            console.log("Server listening on port : " + port);
        });

    })
    .catch(err => {console.log(err)});





