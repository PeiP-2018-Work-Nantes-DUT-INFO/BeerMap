const express = require('express');
const router = express.Router();

const BeerController = require('../../controller/beerController');
const beerController = new BeerController();

// Toutes les bières
router.get('/', function (req, res) {
    beerController.findAll(req, res);
});

// La bière d'un certain id
router.get('/id/:id', function (req, res) {
    beerController.findById(req, res);
});

// La bière d'un certain nom
router.get('/name/:name', function (req, res) {
    beerController.findByName(req, res);
});

// Les bières d'une certaine brasserie
router.get('/brewery/:brewery_id', function (req, res) {
    beerController.findAllByBrewery(req, res);
});

// Les bières ayant un volume supérieur ou égal au volume en paramètre
router.get('/min-volume/:volume', function (req, res) {
    beerController.findByVolumeHigherThan(req, res);
});

// Les bières ayant un volume inférieur ou égal au volume en paramètre
router.get('/max-volume/:volume', function (req, res) {
    beerController.findByVolumeLowerThan(req, res);
});

// Les bières d'un certain pays
router.get('/country/:country', function (req, res) {
    beerController.findByCountry(req, res);
});

// Les bières d'une certaine ville
router.get('/city/:city', function (req, res) {
    beerController.findByCity(req, res);
});

// Les bières d'une certaine catégorie
router.get('/categorie/:categorie', function (req, res) {
    beerController.findByCategory(req, res);
});
module.exports = router;