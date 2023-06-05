const multer = require("multer");
const path = require("path");

const { HttpError } = require("../helpers");

const tmpPath = path.join(__dirname, "../", "tmp");


const storage = multer.diskStorage({
    destination: tmpPath,
    filename: (req, file, cb) => {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const newName = `${uniquePrefix}_${file.originalname}`;
        cb(null, newName);
    }
});

const limits = {
    fileSize: 1024 * 1024
}

const fileFilter = (req, file, cb) => {
    const { mimetype } = file;

    if (mimetype !== "image/jpeg") {
        cb(HttpError(400, "File can have only .jpg extension"), false)
    }

    cb(null, true);
}

const upload = multer({
    storage,
    limits,
    fileFilter,
})

module.exports = upload;