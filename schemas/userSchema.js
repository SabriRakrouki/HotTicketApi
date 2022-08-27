const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,


    },
    surname: {
        type: String,


    },
    password: {
        type: String,
        required: true,

    },
    role: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,


    },
    image: {
        type: String

    }
    , eventComapny: {
        type: String
    },
    activeAcc: {
        type: Boolean
    }
}, { timestamps: true })
module.exports = mongoose.model('Users', userSchema)