const mongoose = require('mongoose');
const { getMeta,preSave } = require('../helpers');

const DoctorSchema = new mongoose.Schema({
    doctorImg:String,
    name:String,
    hospital:String,
    position:String,
    department:String,
    goodAt:String,
    hospitalGrade:String,
    personalProfile:String,
    creationTime:String,

    meta:getMeta(),
});

DoctorSchema.pre('save',preSave);

mongoose.model('Doctor',DoctorSchema);