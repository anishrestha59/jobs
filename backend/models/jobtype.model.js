const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobtype = new Schema({
    jobtype:{
        type: String
    }
});

const JobType = mongoose.model('JobType', jobtype);
module.exports = JobType;