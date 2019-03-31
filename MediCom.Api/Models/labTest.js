
var mongoose = require('mongoose');
var LabTestGroupSchema = require('../models/labTestGroup.js');

var LabTestSchema = new mongoose.Schema({
    name: String,
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'LabTestGroup' },
    default: String,
    unit: String,
    remark: String,
    sortOrder: Number,
    price: Number
});

module.exports = mongoose.model('LabTest', LabTestSchema);