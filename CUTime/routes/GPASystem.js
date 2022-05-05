/*
    Description :
    Contributer : 
    Written on : 2022/3/28
    Last modified : 2022/4/10
*/

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




router.get("/",async (req, res) => {
    //get data from the db

/*    let event = await Course.find(
        {0:{ $regex: "CSCI3100"}},
        '0',
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

    let testing = await User.find(
        {userName: "Jacky"},
        'userName course _id',
        async (err, e) => {
            if(err){
                res.set({'Content-Type': 'text/plain'});res.send(`${err}`);
                return;
            } else{
                return e;
            }
        }
    ).clone();
    
    if(testing.length != 0){
        console.log(testing);
        console.log("got in testing la")
    }

    console.log(testing[0]._id)
    var ObjectId = require('mongoose').Types.ObjectId; 
    var query = { campaign_id: new ObjectId(testing[0]._id) };

    let testing1 = await Registered.find(
        {user: mongoose.Types.ObjectId(testing[0]._id)},
        'user course _id GPA',
        async (err, e) => {
            if(err){
                res.set({'Content-Type': 'text/plain'});res.send(`${err}`);
                return;
            } else{
                return e;
            }
        }
    ).clone();
    
    if(testing1.length != 0){
        console.log(testing1);
        console.log("got in testing1 la")
    }

    console.log(testing1[0].course)

    let testing2 = await Course.find(
        {_id: mongoose.Types.ObjectId(testing1[0].course)},
        '0 1 _id',
        async (err, e) => {
            if(err){
                res.set({'Content-Type': 'text/plain'});res.send(`${err}`);
                return;
            } else{
                return e;
            }
        }
    ).clone();
    
    if(testing2.length != 0){
        console.log(testing2);
        console.log("got in testing2 la")
    }*/

//create a record in the db schema//
    /*Registered.create({
        course: mongoose.Types.ObjectId("6251d908ead4bb42d6fe5028"),
        user: mongoose.Types.ObjectId(user_id),
        GPA: 3.0
    }, async (err, e) => {
        if (err) {res.set({'Content-Type': 'text/plain'}); res.send(`${err}`);}
        else {
            //res.status(201);
            //let s = await getEvent(eventRef, res);
            //res.set({'Content-Type': 'text/plain'});
            //res.send(s['message']);
        }
    });*/

//delete a record//
    /*Registered.findOneAndDelete(
        {user: mongoose.Types.ObjectId(user_id)},
        // 'eventId name loc quota',
        (err, e) => {
            if (err || e == null) {
                //res.status(404);
                //res.set({'Content-Type': 'text/plain'});res.send("404 not found.");
                console.log(err)
            }
            else{
                //res.sendStatus(204);
                console.log("success")
            }
        }
    );*/

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
                    /*res.json("No course for current_id in GPA system")
                    res.set({'Content-Type': 'text/plain'});res.send(`${err}`);
                    return;*/
                    console.log("error------------------")
                } else{
                    //console.log(e)
                    //console.log("looping:"+index)
                    let error = await addtodata(register, e, index);
                    console.log("after getting the obj")
                    //console.log(obj)
                    //console.log("looping:")
                    //console.dir(data);
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
            //res.json(await getcourseinfo(register, data))
            //console.log( "data ="+data)

            //var resolvedProm = await getcourseinfo(register, data)
            console.log("starting of the loop")
            var i=0;
            while(i<register.length){
            var thenProm = await getcourseinfo(register, data, i)
            i=i+1;
            console.log("i update")
            //console.log(event)
            }
            console.log("send to client")
            res.json(data);
        }
        
        if(register.length != 0){ // debugging
            //console.log(register);
            console.log("got in testing1 la")
        }

        
        
    }else{
        res.json("Please add course to account first")
    }
    console.log(req.query.current_id)
    console.log(req.query)
    //res.json(data);
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