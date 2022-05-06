/*
    Description : backend function for upload a image using cloud services and generate the URL and store to DB
    Contributer : Kwok Chun Yin
    Written on : 2022/3/29
    Last modified : 2022/5/5

    Reference : (configuring Cloudinary) https://www.youtube.com/watch?v=npsi7ZkjvQo for uploading file and retain the URL
*/


const cloudinary = require('cloudinary')
const fs = require('fs')
const Users = require('../models/userModel')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const uploadCtrl = {
    uploadAvatar: (req, res) => {
        try {
            
            const file = req.files.file;
            
            cloudinary.v2.uploader.upload(file.tempFilePath, {
                folder: 'avatar', width: 150, height: 150, crop: "fill"
            }, async(err, result) => {
                if(err) throw err;
                
                //console.log(result)

                await Users.findOneAndUpdate({_id: req.user.id},{
                    image: result.secure_url
                })
                removeTmp(file.tempFilePath)

                res.json({url: result.secure_url})
            })
        
        } catch (err) {
            removeTmp(file.tempFilePath)
            return res.status(500).json({msg: err.message})
        }
    }

}

// remove local temparary file
const removeTmp = (path) => {
    console.log(path)
    fs.unlink(path, err => {
        if(err) {
            throw err
        }
    })
}

module.exports = uploadCtrl