const mongoose = require('mongoose');
const { getMate } = require('../helpers');

const DoctorSchema = new mongoose.Schema({
    // doctorImg:String,
    name:String,
    hospital:String,
    position:String,
    department:String,
    goodAt:String,
    hospitalGrade:String,
    creationTime:String,

    meta:getMate(),
});

mongoose.model('Doctor',DoctorSchema);