const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const viewSchema = new Schema({
    jobid: { type: String },
    seekerid: {
        type: String
    },
    

});

const Views = mongoose.model('Views', viewSchema);

module.exports = Views;