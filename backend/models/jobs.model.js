const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSchema = new Schema({
    companyprofile: { type: String },
    companyname: {
        type: String
    },
    companyid: {
        type: String,
        required:true,
    },
    jobname: {
        type: String,
        required: true,
    },
    jobtype: {
        type: String,
        required: true,
    },
    gender:{
        type: String,
    },
    jobshift: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    employementtype:{
        type: String,

    },
    vacancynumber:{
        type: Number
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