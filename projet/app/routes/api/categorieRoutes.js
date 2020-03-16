const express = require('express');
const router = express.Router();

const CategorieController = require('../../controller/categorieController');
const categorieController = new CategorieController();

router.get('/', function (req, res) {
    categorieController.findAll(req, res);
});

router.get('/id/:id', function (req, res) {
    categorieController.findById(req, res)
});

router.get('/name/:name', function (req, res) {
    categorieController.findByName(req, res)
});

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