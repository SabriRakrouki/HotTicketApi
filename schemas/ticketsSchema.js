const mongoose = require("mongoose")
const ticketsSchema = new mongoose.Schema({

    email: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    eventName: {
        type: String,
        require: true
    }
    , entryNumber: {
        type: Number,
        require: true
    }


}, {
    timestamps: true
})
module.exports = mongoose.model('Ticket', categorySchema)