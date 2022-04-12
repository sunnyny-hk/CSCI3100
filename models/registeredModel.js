const mongoose = require('mongoose')


const registeredSchema = mongoose.Schema({
    course: {type: mongoose.Schema.Types.ObjectId, ref: 'course'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    GPA: {type: Number
        //, default: undefined
    },
})

module.exports = mongoose.model("registered", registeredSchema)