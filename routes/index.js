var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'account', file: "app.js"});
});

router.get('/project', function (req, res, next) {
    res.render('index', {title: 'account', file: "app.js"});
});

module.exports = router;
