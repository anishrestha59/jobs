const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSchema = new Schema({
    jobname: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
});

const Jobs = mongoose.model('Jobs', jobSchema);

module.exports = Jobs;