const mongoose = require('mongoose');
const { getMate,preSave } = require('../helpers');

const FeedbackSchema = new mongoose.Schema({
    
    FeedbackContent:String,
    FeedbackUsers:String,
    creationTime:String,

    meta:getMate(),
});

// FeedbackSchema.pre('save',preSave);

mongoose.model('Feedback',FeedbackSchema);