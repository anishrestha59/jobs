const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const seekerSchema = new Schema({
    seekername:{
        type: String,
        required: true,
        trim: true
    },
    gender:{
        type:string,
        string
    },
    seekeraddress:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true,
        trim :true,
    },
    contact:{
        type: Number,
        required: true,
        unique: true
    },
    skills:{
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required:true
    },
    experience:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const Seeker = mongoose.model('seeker', seekerSchema);

module.exports = Seeker;