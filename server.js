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

// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/upload'))

// Timetable routes
const GPARouter = require('./routes/GPASystem')

app.use('/gpaserver', GPARouter)

const FriendRouter = require('./routes/FriendSystem')

app.use('/friendserver', FriendRouter)

const SearchRouter = require('./routes/SearchSystem')

app.use('/searchserver', SearchRouter)

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

