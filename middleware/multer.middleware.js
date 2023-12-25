const fs = require('fs');
const path = require('path');
const multer = require('multer');

exports.upload = () => {
    return imageUpload = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                const folderName = req.query.folderName;
                console.log(req.query);
                const path = `rootFolder/${folderName}/`;
                fs.mkdirSync(path, { recursive: true })
                cb(null, path);
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname))
            }
        }),
        limits: {
            fileSize: 1024 * 1024 * 5, // 5 MB limit (adjust as needed)
        },
        fileFilter: function (req, file, cb) {
            cb(null, true);
        }
    })

}