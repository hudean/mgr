const mongoose = require('mongoose');
const { getMeta,preSave } = require('../helpers');

const MedicineSchema = new mongoose.Schema({
    drugName:String,
    price:String,
    pharmacy:String,
    count:Number,
    medicineImg:String,
    manufacturer:String,
    specification:String,
    element:String,
    indications:String,
    creationTime:String,

    meta:getMeta(),
});
MedicineSchema.pre('save',preSave);

mongoose.model('Medicine',MedicineSchema);