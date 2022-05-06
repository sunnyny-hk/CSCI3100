/*
    Description : middleware for checking the format of the file 
    Contributer : Kwok Chun Yin
    Written on : 2022/3/31
    Last modified : 2022/5/5

    Reference : (file processing in node.js/http) https://www.youtube.com/watch?v=npsi7ZkjvQo 
*/

const fs = require('fs')

module.exports = async function(req, res, next){
    try {
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: "No files were uploaded."})
            
        const file = req.files.file;

        if(file.size > 1024 * 1024){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Size too large."})
        } // 1mb

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "File format is incorrect."})
        }

        next()

    } catch (err) {
        removeTmp(file.tempFilePath)
        return res.status(500).json({msg: err.message})
    }
}

// remove local temparary file
const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    })
}