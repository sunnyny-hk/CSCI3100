/*
    Description : Backend of the GPA System, 
                    receive the HTTP Requests from client and connect to the database
    Contributer : Lau Yu Hin
    Written on : 2022/3/28
    Last modified : 2022/5/6
*/

const Users = require('../models/userModel')
const Course = require('../models/courseModel')
const Registered = require('../models/registeredModel')
const router = require('express').Router()
const bodyParser = require('body-parser')
const urlencodeedParser = bodyParser.urlencoded({extended: true})
router.use(bodyParser.json())
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:CSCI3100Admin@timetable.tzczu.mongodb.net/timetable_info?retryWrites=true&w=majority')




router.get("/",async (req, res) => {
    //get data from the db
    async function addtodata(register, e, index){
        const obj = {
            COURSE_ID: parseInt(e['1']),
            COURSE_CODE: e['0'],
            COURSE_NAME: e['2'],
            COURSE_CREDIT: parseFloat(e['3']),
            GPA: register[index].GPA,
            _id: register[index].course
        }
        data.push(obj);
        return new Promise(resolve => {
              resolve('resolved');
          });
    }
    async function getcourseinfo (register, data, i){
        
            var index = i;
            console.log("i = "+i);
            let event = await Course.findById(
            register[i].course,
            async(err, e) => {
                if(err){
                    console.log("error------------------")
                } else{
                   let error = await addtodata(register, e, index);
                    console.log("after getting the obj")
                    console.log("index, i, length"+index+i+register.length);
                }
            }
            ).clone();
           console.log("after getting the data")


            return new Promise(resolve => {
                setTimeout(()=>{
                  resolve('resolved');},10);
              });
    }

    
    async function senddata(){

        res.json(data)
                console.log( "data =")
                console.dir(data)
    }

    if(req.query.current_id != null){

        //get data from the registered//
        const user_id = req.query.current_id
        let register = await Registered.find(
            {user: mongoose.Types.ObjectId(user_id)},
            'course GPA',
            async (err, e) => {
                if(err){
                    res.json("Please add course to account first")
                    return;
                } else{
                    return e;
                }
            }
        ).clone();
        console.log(register.length)
        console.log (register)
        
        var data = [];
        if(register.length == 0){
            res.json("Please add course to account first")
        }else{
            console.log("starting of the loop")
            var i=0;
            while(i<register.length){
            var thenProm = await getcourseinfo(register, data, i)
            i=i+1;
            console.log("i update")
            }
            console.log("send to client")
            res.json(data);
        }
        
        if(register.length != 0){ // debugging
            console.log("got in testing1 la")
        }

        
        
    }else{
        res.json("Please add course to account first")
    }
    console.log(req.query.current_id)
    console.log(req.query)
})

router.post("/", urlencodeedParser, async(req, res) => {
    console.log("hi, is post ")
    console.dir(req.body)
    console.log(req.body.COURSE_ID)
    //update the value in the db
    const user_id = req.body.current_id

    let update = await Registered.findOneAndUpdate(
        {user: mongoose.Types.ObjectId(user_id),course: mongoose.Types.ObjectId(req.body.COURSE_ID)},
        {GPA: req.body.COURSEUpdatedGPA}
        
    ).clone();


    res.end(JSON.stringify("successful"))
})



module.exports = router