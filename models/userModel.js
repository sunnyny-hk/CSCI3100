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