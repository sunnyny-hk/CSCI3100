/*
    Description : Schema for register courses of a user in MongDB
                    in specific, 
                        course attribute reference to "course" collection
                        user attribute reference to "user" collection

    Contributer : Sunny Tang, Lau Yu Hin, Kwok Chun Yin, Hui Hiu Kit, Wong Man Chun
    Written on : 2022/3/24
    Last modified : 2022/4/10
*/

const mongoose = require('mongoose')


const registeredSchema = mongoose.Schema({
    course: {type: mongoose.Schema.Types.ObjectId, ref: 'course'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    GPA: {type: Number
        //, default: undefined
    },
})

module.exports = mongoose.model("registered", registeredSchema)