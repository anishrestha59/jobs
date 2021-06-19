const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const companySchema = new Schema({
    companyname:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true,
        unique: true
    },
    companyaddress:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, {
    timestamps: true,
});


//Hashing password
companySchema.pre('save', async function (next){
    if(!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//dehashing password
companySchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};


const Company = mongoose.model('Company', companySchema);

module.exports = Company;