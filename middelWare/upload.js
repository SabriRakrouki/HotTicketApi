const path = require('path')
const multer = require('multer')
const {GridFsStorage} = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const methodOverride = require('method-override')
const { resolve } = require('path')
const express=require('express')
const app = express();
const crypto=require('crypto')
const {fileImageDao}=require('./FileImageDao')
const URI = process.env.MONGO_URL
const storage = new GridFsStorage({
    url: URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename =buf.toString('hex')+ path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });
app.use(upload.single('file'),(req,res)=>{
    
    
    fileImageDao.setFile(req.file)
   
})


module.exports=app



