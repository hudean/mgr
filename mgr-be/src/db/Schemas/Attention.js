const mongoose = require('mongoose');
const { getMeta,preSave } = require('../helpers');

const AttentionSchema = new mongoose.Schema({

    DoctorId:String,
    WhetherAttention:Boolean,

    meta:getMeta(),
});

AttentionSchema.pre('save',preSave);

mongoose.model('Attention',AttentionSchema);