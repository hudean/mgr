const mongoose = require('mongoose');
const { getMeta,preSave } = require('../helpers');

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

    meta:getMeta(),
});
MedicineSchema.pre('save',preSave);

mongoose.model('Medicine',MedicineSchema);