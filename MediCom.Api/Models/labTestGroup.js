
var mongoose = require('mongoose');

var LabTestGroupSchema = new mongoose.Schema({
    name: String,
    price: Number,
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LabTestGroup'
    }
});

module.exports = mongoose.model('LabTestGroup', LabTestGroupSchema);