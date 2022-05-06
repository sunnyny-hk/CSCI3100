/*
    Description : middleware for checking the token for authenication of admin
    Contributer : Kwok Chun Yin
    Written on : 2022/3/31
    Last modified : 2022/4/10

    Reference : (configuring middleware workflow for token in js) https://www.youtube.com/watch?v=npsi7ZkjvQo 
*/

const Users = require('../models/userModel')

const authAdmin = async (req, res, next) => {
    try {
        
        const user = await Users.findOne({_id: req.user.id})

        if(user.role !== 1) 
            return res.status(500).json({msg: "Admin resources access denied."})

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authAdmin