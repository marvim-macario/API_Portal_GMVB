const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports ={
  dest: path.resolve(__dirname,"..","tmp","excel"),
  storage: multer.diskStorage({ 
    destination:(req, file, cb )=>{
      cb(null, path.resolve(__dirname,"..","tmp","excel"));
    },
    filename: (req, file, cb ) => {
      crypto.randomBytes(16,(err, hash)=>{
        if (err) cb(err);

        const filename =`${file.originalname}`
       
        cb(null, filename);
      });
    },

  }),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter:(req,file,cb)=>{
    const ext = path.extname(file.originalname).toLowerCase()
    const allowedMimes =[
      ".xlsx"
    ];

    if(allowedMimes.includes(ext)) {
      cb(null, true);
    }else {
      cb(new Error("formato invalido"))
    }
  }
};