
//const cors = require('cors'); //??
//const methodOverride = require('method-override'); //??
//router.use(urlencodeedParser);
//app.use(methodOverride('_method')) //??
//app.use(cors()); //??
var mongoose = require('mongoose');
const res = require('express/lib/response');  //do i have to use??
// mongoose.connect('mongodb://admin:CSCI3100Admin@timetable-shard-00-00.tzczu.mongodb.net:27017,timetable-shard-00-01.tzczu.mongodb.net:27017,timetable-shard-00-02.tzczu.mongodb.net:27017/test?authSource=admin&replicaSet=atlas-voblrd-shard-0&readPreference=primary&ssl=true')
mongoose.connect('mongodb+srv://admin:CSCI3100Admin@timetable.tzczu.mongodb.net/timetable_info?retryWrites=true&w=majority')

const db = mongoose.connection;

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please enter your name!"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0  // 0 = user, 1 = admin
    },
    image:{
        type: String,
        default: "https://res.cloudinary.com/dtvp3fcjb/image/upload/v1649240412/3100_project/avator_default_qinijj.jpg"
    },
    request: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}]
    },
    received: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}]
    },
    friend: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}]
    },
    course: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'registered'}]
    }
});

const User = mongoose.model('user', userSchema);

db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open', function() {
    console.log("Connection is open...");
});

//const server = app.listen(serverport);

module.exports = userSchema;