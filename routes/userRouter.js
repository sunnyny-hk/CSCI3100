const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/register', userCtrl.register)

router.post('/activation', userCtrl.activateEmail)

router.post('/login', userCtrl.login)

router.post('/refresh_token', userCtrl.getAccessToken)

router.post('/forgotPassword', userCtrl.forgotPassword)

router.post('/resetPassword',auth, userCtrl.resetPassword)

router.get('/infor',auth, userCtrl.getUserInfor)

router.get('/allInfor',auth, authAdmin , userCtrl.getUserAllInfor)

router.get('/logout', userCtrl.logout)

router.patch('/update', auth, userCtrl.updateUser) // not using

router.patch('/updateRole/:id', auth, authAdmin, userCtrl.updateUsersRole)

router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)

router.patch('/updateUserName', auth, userCtrl.updateUserName)

router.patch('/updateUserName_A/:id', auth, authAdmin, userCtrl.updateUserName_A)

router.patch('/updatePassword_A/:id', auth, authAdmin, userCtrl.updateUserPassword_A)

module.exports = router