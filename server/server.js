const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require('cors')

const path = require('path');
require('dotenv').config({ path: path.resolve('./.env') });

//app.use(cors());

app.use(bodyParser.json());
app.use(express.static('Public'));
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(cors());
const port = process.env.PORT || 3500;

app.listen(port ,() =>{
    console.log(`Server is running on port ${port}`);
})

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection

connection.on('error', () => console.log("Error in connecting to MongoDB"));
connection.once('open', () => console.log('Connected to MongoDB'))

//NOT WORKING: Run react.js on node.js server
//app.use(express.static(path.join(__dirname, '..', 'react_login_form-main', 'public')));

app.get("/", (req,res) =>{

    //Allow all ports of local
    res.set({
        "Allow-access-Allow-Origin": "*"
    })

    //NOT WORKING: Run react.js on node.js server
    //res.sendFile(path.join(__dirname, '..', 'react_login_form-main', 'public', 'index.html'))
    /*

    #TODO: redirect to the first page (Login)

    */
})

const authRouter = require('./routes/loginSystem')

app.use('/auth', authRouter)

const registerRouter = require('./routes/RegisterSystem')

app.use('/register', registerRouter)

const ttbRouter = require('./routes/timetableSystem')

//app.use('/timtable', registerRouter)

