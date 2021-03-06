/*
    Description : middleware for checking the token for authenication of any users
    Contributer : Kwok Chun Yin
    Written on : 2022/3/31
    Last modified : 2022/4/10

    Reference : (configuring middleware structure for authentication in node.js) https://www.youtube.com/watch?v=npsi7ZkjvQo 
*/

const jwt = require('jsonwebtoken')

const auth = (req, res, next) => { // translate token to user.id and pass back to req.user
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Invalid Authentication."})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({msg: "Invalid Authentication."})

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth 