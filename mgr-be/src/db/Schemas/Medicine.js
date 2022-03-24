const mongoose = require('mongoose');
const { getMate } = require('../helpers');

const MedicineSchema = new mongoose.Schema({

    price:String,
    drugName:String,
    pharmacy:String,
    count:Number,
    manufacturer:String,
    specification:String,
    element:String,
    indications:String,
    creationTime:String,

    meta:getMate(),
});

mongoose.model('Medicine',MedicineSchema);