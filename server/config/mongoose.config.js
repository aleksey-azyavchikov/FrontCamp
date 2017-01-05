var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var article = new Schema({
    "author": "string",
    "title": "string",
    "description": "string",
    "url": "string",
    "urlToImage": "string",
    "publishedAt": "string"
}, { collection: "news" });
var Article = mongoose.model('Article', article, 'news');

var grade = new Schema({
    "student_id": "number",
    "class_id": "number",
    "scores": "array"
}, { colletion: "grades" })
var Grade = mongoose.model('Grade', grade, 'grades');

var Shemes = { Shemes: { Article, Grade } }

module.exports = Shemes;