const mongoose = require('mongoose');
const { getMate } = require('../helpers');

const ConsultSchema = new mongoose.Schema({

    Consultants:String,
    ConsultationContent:String,
    WhetherPublic:String,
    creationTime:String,

    meta:getMate(),
});

mongoose.model('Consult',ConsultSchema);