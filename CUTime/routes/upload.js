/*
    Description : Route the request URLs (./api) for uploading user icon operations to backend functions with method indicated,
                  including middleware of  authentication
    Contributer : Kwok Chun Yin
    Written on : 2022/3/31
    Last modified : 2022/4/8
*/

const router = require('express').Router()
const uploadImage = require('../middleware/uploadImage')
const uploadCtrl = require('../controllers/uploadCrtl')
const auth = require('../middleware/auth')

router.post('/uploadImage', uploadImage, auth, uploadCtrl.uploadAvatar)

module.exports = router