require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const fileuse=require('./middelWare/upload');
const test = require("./middelWare/fileImageDao");
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

//Routes
app.use("/user",require('./routes/userRouter'))
const URI = process.env.MONGO_URL
mongoose.connect(URI, {

}, err => {
    if (err) throw err;
    console.log("connected to mongoDB")
})


app.get('/', (req, res) => {

    res.json({ msg: "welcome my to firt project" })
})
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('server is running on port ', PORT)
})