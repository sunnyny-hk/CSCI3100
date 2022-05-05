/*
    Description : Schema for register courses of a user A in MongDB, describe the user information
                  it also describe the friend relation of a user:
                    in specific,
                        request store the objectId of user B that A sent a request to B
                        received store the objectId of user B that A received a friend request from B
                        friend store the objectId of user B that A is a friend of B after B/A accept a friend request

    Contributer : Sunny Tang, Lau Yu Hin, Kwok Chun Yin, Hui Hiu Kit, Wong Man Chun
    Written on : 2022/3/24
    Last modified : 2022/4/10
*/

const mongoose = require('mongoose')
const course = require('./courseModel')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName:{
        type: String,
        required : [true, "Please enter you name!"],
        trim: true,
        unique: true
    },
    email:{
        type: String,
        required : [true, "Please enter you name!"],
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required : [true, "Please enter you name!"],
    }, 
    role:{
        type: Number,
        default: 0 // 0 = user, 1 = admin
    },
    image:{
        type: String,
        default: "https://res.cloudinary.com/dcdo2ckkx/image/upload/v1649445784/csci3100/avator_default_tej9pj.jpg",
    },
    course:[{
        type: Schema.Types.ObjectId,
        //default: undefined,
        ref: 'registered'
    }],
    request:{
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}]
    },
    received:{
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}]
    },
    friend:{
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}]
    },
    
}, {
    timestamps: true
    
    /*
    timestamps will add two properties of type Date to your schema:

    createdAt: a date representing when this document was created
    updatedAt: a date representing when this document was last updated
    */
})

module.exports = mongoose.model("user", userSchema)