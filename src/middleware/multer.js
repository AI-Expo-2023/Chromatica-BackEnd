const multer = require('multer');
const path = require('path')

const upload = multer({
    dest: 'uploads/',
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `uploads/${req.file.filename}` || 'uploads/image.png');
        },
        filename: (req, file, cb) => {
            let newFileName = new Date().valueOf() + path.extname(file.originalname)
            cb(null, newFileName);
        }
    }),
});

module.exports = upload;