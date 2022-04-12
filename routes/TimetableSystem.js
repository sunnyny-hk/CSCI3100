const User = require('../models/userModel')
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




const DateMapping = {
    "Mo": "2022-09-05",
    "Tu": "2022-09-06",
    "We": "2022-09-07",
    "Th": "2022-09-08",
    "Fr": "2022-09-09",
    "Sa": "2022-09-10",
    "Su": "2022-09-04"
}
const PMto24 = {
    "01": "13",
    "02": "14",
    "03": "15",
    "04": "16",
    "05": "17",
    "06": "18",
    "07": "19",
    "08": "20",
    "09": "21",
    "10": "22",
    "11": "23"
}




router.get("/",async(req, res) => {
    //get data from the db

    async function addtodata(register, e, data, index){
        var time;
        if (e['7'].slice(5,7) === "PM" && e['7'].slice(0,2) != "12") {time = PMto24[e['7'].slice(0,2)]+e['7'].slice(2,5);}
        else if (e['7'].slice(6,7) === "AM" && e['7'].slice(0,2) == "12"){ time = "00"+e['7'].slice(2,5);}
        else{ time = e['7'].slice(0,5);}
        var start = DateMapping[e['9']]+"T"+time+":00+08:00"
        console.log(new Date(start))
        if (e['7'].slice(15,17) === "PM" && e['7'].slice(10,12) != "12") {time = PMto24[e['7'].slice(10,12)]+e['7'].slice(12,15);}
        else if (e['7'].slice(16,17) === "AM" && e['7'].slice(10,12) == "12"){ time = "00"+e['7'].slice(12,15);}
        else{ time = e['7'].slice(10,15);}
        var end = DateMapping[e['9']]+"T"+time+":00+08:00"
        const obj = {
            title: e['0'],
            start: start,
            end: end,
            name: e['0']+": "+e['2'],
            venue: e['8'],
            lecturer: e['4'],
            class: e['6'],
            type: e['5'],
            _id: e['_id'],
            atr: 0
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
                    console.log(e, index)
                    //console.log("looping:"+index)
                    let error = await addtodata(register, e, data, index);
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


    if(req.query.current_id !='null'){
        const user_id = req.query.current_id
        let register = await Registered.find(
            {user: mongoose.Types.ObjectId(user_id)},
            'course',
            async (err, e) => {
                if(err){
                    res.json("No data1 for current_id in GPA system")
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
            res.json("No data for current_id in GPA system")
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
        res.json("incorrect input format for userid in Timetable system")
    }
    console.log(req.query.current_id)
    console.log(req.query)
})
router.post("/", urlencodeedParser, async(req, res) => {
    console.log("hi, is post ")
    console.dir(req.body)
    console.log(req.body.type)
    if(req.body.type == "save"&&req.body.current_id != null){

        //get data from the registered//
        const user_id = req.body.current_id
        let user_id_ref = mongoose.Types.ObjectId(user_id)
        console.log(req.body.event.length)
        let user_info1 = await User.findOneAndUpdate(
            {_id: user_id}, 
            {'$set': {'course': []}},
            async (err, e) => {
            console.log("clear data")
            if (err) res.send(err);
            else return e;
            
        }).clone();

        let register =await Registered.deleteMany(
            {
                user: user_id_ref
            }
        )

        for(let i=0; i<req.body.event.length;i++){
            const course = req.body.event[i];
            
            let user_info = User.findOneAndUpdate(
                {_id: user_id}, 
                {'$push': {'course': mongoose.Types.ObjectId(course._id)}},
                async (err, e) => {
                console.log("add data")
                if (err) res.send(err);
                else return e;
                
            }).clone();

            
            await Registered.create(
                {
                    course: mongoose.Types.ObjectId(course._id),
                    user: user_id_ref
                }
            )
        }
    }
    //update the value in the db
    res.end(JSON.stringify("successful"))
})



module.exports = router