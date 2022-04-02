const mongoose = require('mongoose');
const { getMeta,preSave } = require('../helpers');

const ArticleClassifySchema = new mongoose.Schema({
    title:String,
    
    meta:getMeta(),
});
ArticleClassifySchema.pre('save',preSave);

mongoose.model('ArticleClassify',ArticleClassifySchema);