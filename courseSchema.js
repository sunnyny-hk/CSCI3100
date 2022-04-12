
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


const courseSchema = mongoose.Schema({
    0: {type: String, required: true}, //ANTH1020
    1: {type: String, required: true}, //4354
    2: {type: String, required: true}, //Anth: The Study of Culture 人類學與多樣文化研究
    3: {type: String, required: true}, //3.00
    4: {type: String, required: true}, // Professor KUAN Teresa
    5: {type: String, required: true}, //TUT
    6: {type: String}, //T02
    7: {type: String, required: true}, //01:30PM - 02:15PM
    8: {type: String, required: true}, //UCC_206
    9: {type: String}, //We
});

module.exports = courseSchema;