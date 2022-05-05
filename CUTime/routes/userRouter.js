/*
    Description : Route the request URLs for user/admin (./user) operations to backend operations with method indicated,
                  including middleware of authentication for users and admins.
    Contributer : Kwok Chun Yin
    Written on : 2022/2/27
    Last modified : 2022/5/5
*/

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

router.get('/allInfor',auth, authAdmin , userCtrl.getUserAllInfor) // by Admin

router.get('/logout', userCtrl.logout)

router.patch('/updateRole/:id', auth, authAdmin, userCtrl.updateUsersRole) // by Admin

router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser) // by Admin

router.patch('/updateUserName', auth, userCtrl.updateUserName)

router.patch('/updateUserName_A/:id', auth, authAdmin, userCtrl.updateUserName_A) // by Admin

router.patch('/updatePassword_A/:id', auth, authAdmin, userCtrl.updateUserPassword_A) // by Admin

module.exports = router