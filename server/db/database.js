var mongoose = require('mongoose');

let configureShemes = function () {
    var mongooseConfig = require('../config/mongoose.config');
}

let connect = function () {
    const path = "mongodb://localhost:27017/newsdb";
    mongoose.connect(path,  function(err) {
        if(err) {
            console.log('connection error with db tamonsys', err);
        } else {
            console.log('connection successful with db');
        }
    });
}

module.exports = { configureShemes, connect}