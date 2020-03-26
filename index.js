const express = require("express");
const app = express();
const http = require('http').createServer(app);
const bodyParser = require("body-parser");
const cors = require("cors");
const io = require('socket.io')(http);
const database = require('./app/config/dbconfig');
const port = 3000;

const arcgis = require("./app/extern/arcgis");
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

        app.use((req, res, next) => {
            console.log(req.method + " ::: " + req.protocol + '://' + req.get('host') + req.originalUrl)
            console.log(req.body)
            next()
        })

        /* Router configuration */
        app.use('/api', require('./app/routes/router'));

        /* Accès aux pages statiques */
        app.use(express.static('./static/build/'));


        /* WebSocket */
        io.on('connection', function (socket) {
            socket.on('search', function (search) {
                
                console.log("Recherche : ", search)

                // On fais une recher sur différent secteur
                const city = arcgis.searchByName(search)
                const beer = BeerDAO.findAllByName(search)
                const brewery = BreweryDAO.findAllByName(search)
                const category = CategoryDAO.findAllByName(search)

                // On attend que toutes les recherches soit terminé
                Promise.all([city, beer, brewery, category]).then(data => {
                    const d = {city: data[0], beer: data[1], brewery: data[2], category: data[3]}

                    // On envoie le résultat
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