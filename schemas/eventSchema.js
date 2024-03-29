const mongoose=require("mongoose")
const eventSchema= new mongoose.Schema({
    nameEvent:{
    type:String,
    require:true,
    trim:true,
    unique:true
    },
    dateBegin:{
        type:Date,
        require:true
    },
    dateEnd:{
        type:Date,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    eventProvider:{
        type:String,
        require:true
    },
    eventCategory:{
        type:String,
        require:true
    },userId:{
        type:String,
        require:true
    }
    ,ticketNumber:{
        type:Number,
        require:true
    }
    ,ticketId:{
        type:String,
        require:true
    }
})
module.exports=mongoose.model('Event',eventSchema)