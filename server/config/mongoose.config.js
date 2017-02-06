var mongoose = require('mongoose');
var models = require('../models/models.export');

var Schema = mongoose.Schema;

var article = new Schema(models.Article.configMongoose(), { collection: "news" });
var ArticleSchema = mongoose.model('Article', article, 'news');

var grade = new Schema(models.Grade.configMongoose(), { colletion: "grades" })
var GradeSchema = mongoose.model('Grade', grade, 'grades');

var Schemes = { Schemes: { ArticleSchema, GradeSchema } }

module.exports = Schemes;