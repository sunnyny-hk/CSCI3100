/*
    Description : Schema for courses information
    Contributer : Sunny Tang, Lau Yu Hin, Kwok Chun Yin, Hui Hiu Kit, Wong Man Chun
    Written on : 2022/3/24
    Last modified : 2022/4/10
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = Schema({
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

module.exports = mongoose.model('course', courseSchema);
