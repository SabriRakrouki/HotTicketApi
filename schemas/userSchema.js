const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
       type:String,
       required:true,
       unique:true
   }, name:{
       type:String,
       required:true,
       trim:true
   },
   phoneNumber:{
    type:String,
    required:true,
    
},
   surname:{
    type:String,
    required:true,
    
},
   password:{
       type:String,
       required:true,
       
   },
  role:{
      type:Number,
      default:0
  },
  birthDate:{
      type:Date,
      required:true,
      
  }
},{timestamps:true})
module.exports=mongoose.model('Users',userSchema)