var express = require('express');
var router = express.Router();
var gradesRequests = require('../requests/grades');
var mongooseConfig = require('../config/mongoose.config');

/* GET home page. */
router.get('/', function(request, response, next) {
  mongooseConfig.Schemes.GradeSchema.find({}, function(error, data) {
    error ? response.send(error) : response.send(data);
  })
});

router.get('/bestclass', (request, response, next) => {
  mongooseConfig.Schemes.GradeSchema.aggregate(gradesRequests.bestclass, function(error, data) {
    error ? response.send(error) : response.send(data);
  })
});

module.exports = router;
