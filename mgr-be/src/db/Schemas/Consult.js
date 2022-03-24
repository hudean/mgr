const mongoose = require('mongoose');
const { getMeta,preSave } = require('../helpers');

const ConsultSchema = new mongoose.Schema({

    Consultants:String,
    ConsultationContent:String,
    WhetherPublic:String,
    creationTime:String,

    meta:getMeta(),
});

ConsultSchema.pre('save',preSave);

mongoose.model('Consult',ConsultSchema);