var express = require('express');
var router = express.Router();
var mongooseConfig = require('../config/mongoose.config');

/* GET home page. */
router.get('/', function(request, response, next) {
  mongooseConfig.Shemes.Article.find({}, function(error, data) {
    error ? response.send(error) : response.send(data);
  })
});

module.exports = router;
