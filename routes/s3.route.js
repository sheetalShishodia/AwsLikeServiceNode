const fs = require('fs');
const router = require('express').Router();
const Auth = require('../middleware/auth.middleware');
const path = require('path');
const { upload } = require('../middleware/multer.middleware');
const UploadModel = require('../models/upload.model')

router.post('/createBucket', Auth.userAuthMiddle, async (req, res) => {
  const folderName = req.body.folderName;
  if (!folderName) {
    return res.json({ status: 400, message: "Folder Name is Mandatory" })
  }

  const rootFolder = "rootFolder";
  const folderPath = `${rootFolder}/${folderName}`;
  try {
    if (fs.existsSync(rootFolder)) {
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
        return res.json({
          status: 200,
          message: "Bucket created"
        })
      }
    }
    else {
      fs.mkdirSync(rootFolder);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath)
        return res.json({
          status: 200,
          message: "Bucket created"
        })
      }

    }
  }
  catch (error) {
    console.log(error)
  }

})

router.get('/getAllBucket', Auth.userAuthMiddle, async (req, res) => {
  const rootPath = path.join('rootFolder');
  fs.readdir(rootPath, (error, files) => {
    const directories = files.filter(file => {
      const filePath = path.join(rootPath, file);
      return fs.statSync(filePath).isDirectory();
    });
    if (directories) {
      return res.json({
        status: 200,
        success: directories
      })
    }
  })
})
// Upload the File in the particular bucket
router.post('/uploadFile', Auth.userAuthMiddle, upload().single('myFile'), async (req, res) => {
  if (req.file) {
    const fileFullPath = req.file.destination + req.file.filename;
    const uploadData = new UploadModel({
      userId: req.user._id,
      filename: req.file.fieldname, mimeType: req.file.mimetype, path: fileFullPath
    });
    await uploadData.save();
    return res.json({ status: 200, sucess: "File uploaded" })
  }
})

router.get('/getAllfiles', Auth.userAuthMiddle, async (req, res) => {
  const bucketName = req.body.bucketName;
  if (!bucketName) {
    return res.json({ status: 400, message: "please provide the bucket name" })
  }
  try {
    const directoryPath = path.join(`rootFolder/${bucketName}`);
    fs.readdir(directoryPath, (err, files) => {
      const allFiles = files.filter(file => {
        const filePath = path.join(directoryPath, file);
        return fs.statSync(filePath).isFile();
      });
      if (allFiles.length == 0) {
        return res.json({ status: true, message: "No Files Found" })
      }
      return res.json({ status: true, allFiles: allFiles })
    });

  } catch (error) {
    console.log(error)
  }
})

router.get('/downloadFile/:folderName/:fileName',(req,res)=>{
  const {folderName,fileName}= req.params;
  const filePath =`rootFolder/${folderName}/${fileName}`;
  res.setHeader('Content-Disposition',`attachment; fileName="${fileName}"`);
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res)
})

router.post('/deleteFileFromBucket',Auth.userAuthMiddle,async(req,res)=>{
  const {folderName,fileName} = req.body;
  if(!folderName)
  {
    return res.json({message:"FolderName is Mandatory"})
  }
  if(!fileName){
    return res.json({message:"FileName is mandatory"})
  }
  })

  try{

  } catch(error)
  {
    fs.unlink(filePath,(error)=>{
      if(error)
      {
        console.log(error);
      }
      return res.json({message:"File Deleted Successfull"})
    })
  }

  router.post('/deleteBucket', Auth.userAuthMiddle, async (req, res) => {

    const folderName = req.body.folderName;
  
    if (!folderName) {
  
      return res.json({ message: "FolderName is mandatory" })
  
    }
  
    try {
  
      const folderPath = `rootFolder/${folderName}`;
  
      fs.rmdirSync(folderPath);
  
      return res.json({ message: "Folder is been deleted successfully" })
  
    } catch (error) {
  
      console.log(error);
  
    }
  
  });

module.exports = router;