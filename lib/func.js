var crypto = require('crypto');  //生成md5码
var moment = require('moment');


var func = {};

func.md5 = function (str) {
    return crypto.createHash('md5').update(str).digest('hex');
};


module.exports = func;