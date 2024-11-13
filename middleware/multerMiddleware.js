//import multer
const multer = require('multer')

//create diskstorage
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')   //path to upload
    },
    filename: (req, file, callback) => {
        const filename = `image- ${Date.now()} - ${file.originalname}`
        callback(null, filename)
    }
})

//filefilter
const filefilter = (req, file, callback) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
        callback(null, true)
    }
    else {
        callback(null, false)
        return callback(new Error('Only png,jpg,jpeg files are allowed'))
    }

}

//multer configuration
const multerConfig = multer({
    storage,
    filefilter
})

module.exports = multerConfig