const mongoose = require('mongoose');
const { getMate,preSave } = require('../helpers');

const ArticleSchema = new mongoose.Schema({

    ArticleTitle:String,
    ArticleClassification:String,
    Distributor:String,
    DistributionContent:String,
    creationTime:String,

    meta:getMate(),
});


mongoose.model('Article',ArticleSchema);