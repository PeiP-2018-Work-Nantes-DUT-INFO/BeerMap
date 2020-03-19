const express = require("express");
const app = express();
const http = require('http').createServer(app);
const bodyParser = require("body-parser");
const cors = require("cors");
const io = require('socket.io')(http);
const database = require('./app/config/dbconfig');
const port = 3000;

const geocodeAPI = require("./geocodeApi");
const BeerDAO_file = require('./app/dao/beerDAO');
const BeerDAO = new BeerDAO_file();
const BreweryDAO_file = require('./app/dao/breweryDAO');
const BreweryDAO = new BreweryDAO_file();
const CategoryDAO_file = require('./app/dao/categorieDAO');
const CategoryDAO = new CategoryDAO_file();
database
    .init
    .then((db) => {
        app.use(cors());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        ///////////////////////////////////////////////////////////////////
        app.use(function (req, res, next) {
            console.log('Accès a : ', req.method, " - ", req.originalUrl)
            next()
        })
        ///////////////////////////////////////////////////////////////////

        /* Router configuration */
        app.use('/api', require('./app/routes/router'));

        /* Accès aux pages statiques */
        app.use(express.static('./static/build/'));


        /* WebSocket */
        io.on('connection', function (socket) {
            socket.on('search', function (search) {
                
                console.log("Recherche : ", search)

                const city = geocodeAPI.searchByName(search)
                const beer = BeerDAO.findAllByName(search)
                const brewery = BreweryDAO.findAllByName(search)
                const category = CategoryDAO.findAllByName(search)

                Promise.all([city, beer, brewery, category]).then(data => {
                    const d = {city: data[0], beer: data[1], brewery: data[2], category: data[3]}

                    socket.emit('search-result', d);

                }).catch(err => {
                    console.error("[ERROR] Erreur avec une des promesses de recherche", err)
                })

            });
        });

        http.listen(port, function () {
            console.log("Server listening on port : " + port);
        });

    })
    .catch(err => { console.log(err) });