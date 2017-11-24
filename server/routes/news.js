var express = require('express');
var router = express.Router();
var mongooseConfig = require('../config/mongoose.config');
var models = require('../models/models.export');
var mapper = require('../helpers/mapper')

/* GET home page. */
router.get('/articles', function(request, response, next) {
  mongooseConfig.Schemes.ArticleSchema.find({}, function(error, data) {
    error ? response.send(error) : response.send({articles: data});
  });

});

router.get('/article/:articleId', function(request, response, next) {
  mongooseConfig.Schemes.ArticleSchema.findById(request.params.articleId , function(error, data) {
    error ? response.send(error) : response.send({ article: data });
  });

});

router.post('/article', function(request, response, next) {
  let article = new models.Article();
  
  mapper.mapProperties(request.body.article, article, (index) => true, (source, destination) => {
    destination.image.data = source.image && source.image.data || null;
    destination.image.contentType = source.image && source.image.contentType || "";
  });
  new mongooseConfig.Schemes.ArticleSchema(article).save((error, document) => {
    if (error) request.send("Error");
  });
  response.send("ok");
});

router.put('/article/:articleId', function(request, response, next) {
  let article = new models.Article();
   //console.log("Body", request.body.article);
  mapper.mapProperties(request.body.article, article, 
  (index) => { 
    return ['_id', '__v'].find((element) => element === index) === undefined;
  }, 
  (source, destination) => {
    destination.image.data = source.image && source.image.data || "";
    destination.image.contentType = source.image && source.image.contentType || "";
  });

  mongooseConfig.Schemes.ArticleSchema.findByIdAndUpdate(request.params.articleId, { $set: models.Article.getObjectToUpdate(article) }, function(error, article) {
  if (error) { 
    response.send(error);
  }
    response.send(article);
  });  
});

router.delete('/article/:articleId', function(request, response, next) {
  console.log(request);
  mongooseConfig.Schemes.ArticleSchema.find({_id: request.params.articleId}).remove(function(error) {
    error 
      ? response.send(error) 
      : mongooseConfig.Schemes.ArticleSchema.find({}, function(error, data) {
        error ? 
          response.send(error) : 
          response.send({articles: data});
    });
  });
})



module.exports = router;
