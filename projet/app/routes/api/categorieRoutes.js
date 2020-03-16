const express = require('express');
const router = express.Router();

const CategorieController = require('../../controller/categorieController');
const categorieController = new CategorieController();

// Toutes les catégories
router.get('/', function (req, res) {
    categorieController.findAll(req, res);
});

// La catégorie ayant un certain id
router.get('/id/:id', function (req, res) {
    categorieController.findById(req, res)
});

// La catégorie ayant un certain nom
router.get('/name/:name', function (req, res) {
    categorieController.findByName(req, res)
});


// Ajouter une catégorie
router.post('/', function (req, res) {
    categorieController.create(req,res);
});
router.put('/id/:id', function (req, res) {
    categorieController.update(req, res)
});

router.delete('/id/:id', function (req, res) {
    categorieController.deleteById(req, res)
});
module.exports = router;