const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const seekerSchema = new Schema({
    profile: String,
    seekername:{
        type: String,
        required: true,
        trim: true
    },
    gender:{
        type: String,
        required: true,
    },
    seekeraddress:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
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

//Hashing password
seekerSchema.pre('save', async function (next){
    if(!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//dehashing password
seekerSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

const Seeker = mongoose.model('seeker', seekerSchema);

module.exports = Seeker;