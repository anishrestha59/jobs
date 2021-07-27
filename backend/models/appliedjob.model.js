const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appliedJobSchema = new Schema({
    jobid: {
        type: String,
        required: true,
       
    },
    seekerid: {
        type: String,
        required: true,
    },
});

const Applied = mongoose.model('AppliedJob', appliedJobSchema);

module.exports = Applied;