const mongoose = require('mongoose');
const { getMeta,preSave } = require('../helpers');

const ArticleSchema = new mongoose.Schema({

    ArticleTitle:String,
    ArticleClassification:String,
    Distributor:String,
    DistributionContent:String,
    creationTime:String,

    meta:getMeta(),
});

ArticleSchema.pre('save',preSave);

mongoose.model('Article',ArticleSchema);