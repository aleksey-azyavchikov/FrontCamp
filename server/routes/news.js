var express = require('express');
var router = express.Router();
var mongooseConfig = require('../config/mongoose.config');
var models = require('../models/models.export');
var mapper = require('../helpers/mapper')

/* GET home page. */
router.get('/', function(request, response, next) {
  mongooseConfig.Schemes.ArticleSchema.find({}, function(error, data) {
    error ? response.send(error) : response.send({articles: data});
  })
});

router.post('/article', function(request, response, next) {
  let article = new models.Article();
  mapper.mapProperties(request.body, article, (source, destination) => {
    destination.image.data = source.image.data;
    destination.image.contentType = source.image.contentType
  });
  new mongooseConfig.Schemes.ArticleSchema(article).save((error, document) => {
    if (error) request.send("Error");
  });
  response.send('ok');
  // var article = new mongooseConfig.Shemes.Article({

  // });
  // mongooseConfig.Shemes.Article.create(,()=>{

  // });
});


module.exports = router;
