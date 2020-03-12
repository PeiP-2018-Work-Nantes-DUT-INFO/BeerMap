const express = require('express');
const router = express.Router();

const BeerController = require('../../controller/beerController');
const beerController = new BeerController();

router.get('/', function (req, res) {
    beerController.findAll(req, res);
});

router.get('/id/:id', function (req, res) {
    beerController.findById(req, res);
});

router.get('/name/:name', function (req, res) {
    beerController.findByName(req, res);
});

router.get('/min-volume/:volume', function (req, res) {
    beerController.findByVolumeHigherThan(req, res);
});

router.get('/max-volume/:volume', function (req, res) {
    beerController.findByVolumeLowerThan(req, res);
});

router.get('/country/:country', function (req, res) {
    beerController.findByCountry(req, res);
});

router.get('/city/:city', function (req, res) {
    beerController.findByCity(req, res);
});

module.exports = router;