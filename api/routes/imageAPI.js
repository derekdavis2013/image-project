var express = require('express');
var router = express.Router();
var templates = require('../data/templates.json');


router.get('/', function(req, res, next) {
    res.send('Welcome to the image API');
});

router.get('/allTemplates', function(req, res, next) {
    res.json(templates);
});

module.exports = router;
