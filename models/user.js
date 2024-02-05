const { Schema, model } = require('mongoose');

const userSchema = Schema({
    username : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true,
        unique: true
    },
    password : {
        type : String,
        required: true
    },
    expense : {
        type : Number,
        required: true 
    },
    isPremium : {
        type : Boolean,
        required: true,
    }
});

module.exports = model('User', userSchema);