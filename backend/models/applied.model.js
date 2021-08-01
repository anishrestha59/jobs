const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applySchema = new Schema({
    jobid: {
        type: String,
        required:true
    },
    seekerid: {
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Jobs = mongoose.model('appliedjobs', applySchema);

module.exports = Jobs;