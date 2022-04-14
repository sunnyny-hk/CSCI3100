const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')

const {CLIENT_URL} = process.env

const userCtrl = {
    register: async (req, res) => {
        try{
            const {userName, email, password} = req.body
            //console.log({userName, email, password}) // hv {}: print in json 

            if (!userName|| !email || !password)
                return res.status(400).json({msg: "Please fill in all fiels."}) // 400: bad request
            
            if (!valideEmail(email))
                return res.status(400).json({msg: "Please use CUHK email"})
            
            const checkEmail = await Users.findOne({email}) 
            if (checkEmail) return res.status(400).json({msg: "This email already exists."})

            const checkUserName = await Users.findOne({userName})
            if (checkUserName) return res.status(400).json({msg: "This username already exists."})

            if (password.length < 8){
                return res.status(400).json({msg: "Password must be at least 8 characters."})
            }
            const passwordHash = await bcrypt.hash(password, 10)
            //console.log({password, passwordHash})

            const newUser = {
                userName, email, password:passwordHash
            }

            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/user/activate/${activation_token}`

            sendMail(email, url, "Activate your account")

            //console.log({activation_token})

            res.json({msg: "Register Success! Please activate your email to start."})

        }catch (err){
            return res.status(500).json({msg: err.message}) // 500: Internal Server Error
        }
    },
    activateEmail: async (req, res) =>{
        try{
            const {activation_token} = req.body
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            //console.log(user)
            const {userName, email, password} = user

            // maybe duplicated
            const check = await Users.findOne({email})
            if (check) return res.status(400).json({msg: "This email already exits."})

            const newUser = new Users({
                userName, email ,password
            })

            await newUser.save()

            res.json({msg: "Account have been activated!"})

        }catch (err){
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) => {
        try{
            const {userNameEmail, password} = req.body //name of attributes in json from frontend hv to be the same
            
            const user = await Users.findOne({
                $or: [{
                  "userName": userNameEmail
                }, {
                  "email": userNameEmail
                }]
              });

            if (!user) return res.status(400).json({msg: "This username or email does not exist"}) 
            //else res.json({msg: user.password})
            
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({msg: "Pass is incorrect"})
            
            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })
            res.json({msg: "Login Suceess!"})

        }catch(err){
            return res.status(500).json({msg: err.message})
        }

        
    },
    getAccessToken: (req, res) =>{
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({msg: "Please login now!"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if (err) return res.status(400).json({msg: "Please login now!"})

                const access_token = createAccessToken({id: user.id})
                res.json({access_token})
                
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body
            const user = await Users.findOne({"email": email})
            if (!user) return res.status(400).json({msg: "This email does not exist"})

            
            const access_token = createAccessToken({id: user._id})
            const url = `${CLIENT_URL}/user/reset/${access_token}`
            sendMail(email, url, "Reset your password")

            res.json({msg: "Re-send the password, please check your email."})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    resetPassword: async (req,res) => {
        try {
            const {password} = req.body
            if (password.length < 8){
                return res.status(400).json({msg: "Password must be at least 8 characters."})
            }
            const passwordHash = await bcrypt.hash(password, 10)

            await Users.findOneAndUpdate({_id: req.user.id},{
                password: passwordHash
            })
            res.json({msg: "Successfully reseted"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUserInfor: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password') // exclude pw

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUserAllInfor : async (req, res) =>{
        try {
            
            const users = await Users.find().select('-password')
            res.json(users)

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout : async (req, res) =>{
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logged out."})
           
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser :async (req, res)=>{
        try {

            const {userName, image}  = req.body
            await Users.findOneAndUpdate({_id: req.user.id}, {
                "userName": userName,
                "image" : image
            })
            
            return res.json({msg: "Update success."})
           
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUsersRole: async (req, res) => {
        try {
            const {role} = req.body

            await Users.findOneAndUpdate({_id: req.params.id}, {
                role
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteUser: async (req, res) => {
        try {
            
            console.log(req.params.id)

            await Users.findOneAndDelete({_id: req.params.id})

            res.json({msg: "Delete success!"})

        } catch (err) {
            console.log(err)
            return res.status(500).json({msg: err.message})
        }
    },
    updateUserName: async (req, res) => {
        try {
            const {userName} = req.body

            const checkUserName_exist = await Users.findOne({userName})

            if (checkUserName_exist) return res.status(400).json({msg: "This username already exists."})

            await Users.findOneAndUpdate({_id: req.user.id},{
                "userName" : userName
            })

            res.json({msg: "Successfully Updated Username"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUserName_A: async (req, res) => {
        try {
            const {userName} = req.body

            const checkUserName_exist_A = await Users.findOne({userName: userName})

            if (checkUserName_exist_A) return res.status(400).json({msg: "This username already exists."})

            await Users.findOneAndUpdate({_id: req.params.id}, {
                userName: userName
            })

            res.json({msg: "Update userName Success!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUserPassword_A: async (req, res) => {
        try {
            const {password} = req.body

            if (password.length < 8){
                return res.status(400).json({msg: "Password must be at least 8 characters."})
            }
            const passwordHash = await bcrypt.hash(password, 10)

            await Users.findOneAndUpdate({_id: req.params.id}, {
                password: passwordHash
            })

            res.json({msg: "Update Success!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

function valideEmail(email){
    const regex = /^[0-9]{10}@link.cuhk.edu.hk$/
    //const regex = /.*/ // no restriction
    return regex.test(email);
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: "5m"}) 
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"})
}

module.exports = userCtrl