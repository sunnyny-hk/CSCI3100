
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


const registeredSchema = mongoose.Schema({
    course: {type: mongoose.Schema.Types.ObjectId, ref: 'course'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    GPA: {type: Number, default: undefined},
})
module.exports = registeredSchema;









