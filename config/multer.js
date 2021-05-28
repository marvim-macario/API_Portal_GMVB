const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports ={
  dest: path.resolve(__dirname,"..","tmp","uploads"),
  storage: multer.diskStorage({ 
    destination:(req, file, cb )=>{
      cb(null, path.resolve(__dirname,"..","tmp","uploads"));
    },
    filename: (req, file, cb ) => {
      crypto.randomBytes(16,(err, hash)=>{
        if (err) cb(err);

        const filename =`${hash.toString('hex')}- ${file.originalname}`
       

        cb(null, filename);

        req.body.hashFile = filename;
      });
    },

  }),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter:(req,file,cb)=>{
    const ext = path.extname(file.originalname).toLowerCase()
    const allowedMimes =[
      ".jpg",
      ".png",
      ".pdf",
      ".doc",
      ".docx"
    ];

    if(allowedMimes.includes(ext)) {
      cb(null, true);
    }else {
      cb(new Error("formato invalido"))
    }
  }
};