const mongoose = require("mongoose")
const ticketsSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
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
    }
    ,entryNumber:{
    type:Number,
    require:true
    }


}, {
    timestamps: true
})
module.exports = mongoose.model('Ticket', categorySchema)