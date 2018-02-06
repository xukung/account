var express = require('express');
var router = express.Router();

/**
 * 路由前缀 /sort
 */


router.get('/list', function (req, res, next) {
    res.render('index', {title: 'tech', file: "app.js"});
});

router.get('/add', function (req, res, next) {
    res.render('index', {title: 'tech', file: "app.js"});
});

router.get('/edit', function (req, res, next) {
    res.render('index', {title: 'tech', file: "app.js"});
});


module.exports = router;