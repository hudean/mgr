const mongoose = require('mongoose');
const { getMate } = require('../helpers');

const InventoryLogSchema = new mongoose.Schema({
    type:String,
    num:Number,
    user:String,

    meta:getMate(),
});

mongoose.model('InventoryLog',InventoryLogSchema);