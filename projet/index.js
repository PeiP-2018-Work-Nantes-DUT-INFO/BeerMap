const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const database = require('./app/config/dbconfig');
const port = process.argv[2] || 3000;

process.on('exit', function (code) {
    return console.log(`About to exit with code ${code}`);
});

database
    .init
    .then((db) => {

        app.listen(port, function () {
            console.log("Server listening on port : " + port);
        });

        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());

        /* Router configuration */
        app.use('/api', require('./app/routes/router'));

        //accès aux pages statiques
        app.use(express.static('../static/build/'));

    })
    .catch(err => {console.log(err)});





