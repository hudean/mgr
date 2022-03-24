const mongoose = require('mongoose');
const { getMeta,preSave } = require('../helpers');

const FeedbackSchema = new mongoose.Schema({
    
    FeedbackContent:String,
    FeedbackUsers:String,
    creationTime:String,

    meta:getMeta(),
});

FeedbackSchema.pre('save',preSave);

mongoose.model('Feedback',FeedbackSchema);