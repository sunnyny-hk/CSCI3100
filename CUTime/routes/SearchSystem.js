const Users = require('../models/userModel')
const Course = require('../models/courseModel')
const Registered = require('../models/registeredModel')
const router = require('express').Router()
const bodyParser = require('body-parser')
const urlencodeedParser = bodyParser.urlencoded({extended: true})
//const cors = require("cors");
//app.use(cors());
router.use(bodyParser.json())



var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:CSCI3100Admin@timetable.tzczu.mongodb.net/timetable_info?retryWrites=true&w=majority')

//const server = app.listen(serverport);





router.get("/", async (req, res) => {
    //get data from the db
    //console.dir(req)
    //console.dir(req.query)
    if (req.query.keyword!=undefined){
//get data from db---
        console.log("start----------------")
        //var key = '/'+req.query.keyword+'/'
        let event = await Course.find(
            {0:{ $regex: req.query.keyword}},
            '0 1 2 3 4 5 6 7 8 9 _id',
            async (err, e) => {
                if(err){
                    res.set({'Content-Type': 'text/plain'});res.send(`${err}`);
                    return;
                } else{
                    return e;
                }
            }
        ).clone();
        
        if(event.length != 0){
            console.log(event);
            console.log("got in la")
        }
//-----
        var data = [];
        var cur_CODE;
        for(let i = 0;i<event.length;i++){
            console.log(i);
            if(cur_CODE == null||cur_CODE!=event[i]['0']){
                var obj = {
                    COURSE_ID : event[i]['1'],
                    COURSE_CODE : event[i]['0'],
                    COURSE_NAME : event[i]['2'],
                    CREDIT : event[i]['3'],
                    TIME : [event[i]['7'].slice(0,7),event[i]['7'].slice(10,17)],
                    DATE : event[i]['9'],
                    LECTURER: event[i]['4'],
                    TYPE: event[i]['5'],
                    TUTNO: event[i]['6'],
                    VENUE: event[i]['8'],
                    _id: event[i]['_id'],
                    SHOW: true
                }
                data.push(obj);
                cur_CODE = event[i]['0']; 
            }else{
                var obj = {
                    COURSE_ID : event[i]['1'],
                    COURSE_CODE : event[i]['0'],
                    COURSE_NAME : event[i]['2'],
                    CREDIT : event[i]['3'],
                    TIME : [event[i]['7'].slice(0,7),event[i]['7'].slice(10,17)],
                    DATE : event[i]['9'],
                    LECTURER: event[i]['4'],
                    TYPE: event[i]['5'],
                    TUTNO: event[i]['6'],
                    VENUE: event[i]['8'],
                    _id: event[i]['_id'],
                    SHOW: false
                }
                data.push(obj);
            }

        }
        //testdata[0].new = "hihi"
        //console.log(testdata[0])
        res.json(data)
    }else {
        res.json("incorrect input format in Search system")
    }
    console.log(req.query)
})

module.exports = router