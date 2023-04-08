const multer = require('multer');
const fs = require('fs')
const path = require('path')

try {
    fs.readdirSync('./upload');
} catch (error) {
    console.error('not exist directory.');
    fs.mkdirSync('./upload');
}

const upload = multer({
    dest: 'upload/',
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `upload/`);
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
});

module.exports = upload;