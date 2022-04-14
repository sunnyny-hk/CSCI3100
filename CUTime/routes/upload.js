const router = require('express').Router()
const uploadImage = require('../middleware/uploadImage')
const uploadCtrl = require('../controllers/uploadCrtl')
const auth = require('../middleware/auth')

router.post('/uploadImage', uploadImage, auth, uploadCtrl.uploadAvatar)

module.exports = router