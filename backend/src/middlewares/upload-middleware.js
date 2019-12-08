'use strict'

const MyResponse = require('../response/response');
const fs = require('fs');

const mdUpload = {};

mdUpload.avatar = (req, res, next) => {

    if (!req.files) return res.status(400).json(MyResponse._400('the file cannot be null'));

    const filePath = req.files.file0.path;
    const fileName = filePath.split('\\')[3];
    const fileNameSplit = fileName.split('.');
    const fileExtension = fileNameSplit[fileNameSplit.length - 1]

    if (req.files.file0.size > 10000000) {
        fs.unlinkSync(filePath);
        return res.status(400).json(MyResponse._400('File must not be larger than 10mb'));
    }

    const validExtensions = ['svg', 'png', 'jpg', 'jpeg', 'gif'];

    if (validExtensions.indexOf(fileExtension) < 0) {
        fs.unlinkSync(filePath);
        return res.status(400).json(MyResponse._400(`Invalid file name extension. Valid extensions are: ${validExtensions.join(', ')}`));
    } else {
        req.body.fileName = fileName;
        next();
    }

}

module.exports = mdUpload;