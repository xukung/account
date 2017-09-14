var express = require('express');
var router = express.Router();

/**
 * 所有请求前缀  /json
 * */

router.get('/list', function (req, res) {
    let name = req.query.name;

    let obj = {};
    res.json(obj);
});

router.post('/add', function (req, res) {
    let name = req.body.name;

    let obj = {};

    res.json(obj);
});


module.exports = router;
