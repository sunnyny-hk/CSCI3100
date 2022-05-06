/*
    Description : Operated as a main server, always listening for incoming port. Connect to the MongoDB.
                  Route URLs to backend functions, and import environment (constant) variables (.env).
    Contributer : Lau Chun Hin, Kwok Chun Yin, Wong Man Chun
    Written on : 2022/2/27
    Last modified : 2022/5/5
*/

require('dotenv').config(); 

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))

// User and Admin operations routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/upload'))

// GPA operations routes
const GPARouter = require('./routes/GPASystem')
app.use('/gpaserver', GPARouter)

// Friend operations routes
const FriendRouter = require('./routes/FriendSystem')
app.use('/friendserver', FriendRouter)

// Searching operations routes
const SearchRouter = require('./routes/SearchSystem')

app.use('/searchserver', SearchRouter)

// Timetable operations routes
const TimetableRouter = require('./routes/TimetableSystem')

app.use('/timetableserver', TimetableRouter)


// Connect to mongodb
const URL = process.env.MONGODB_URL

mongoose.connect(URL, {
    //userCreateIndex: true,    -> not supported
    //userFindAndModify: false, -> not supported
    //userNewURLParser: true,   -> not supported
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log("Connected to mongodb")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})

