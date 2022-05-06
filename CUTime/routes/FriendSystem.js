/*
    Description : Backend of the Friend System, 
                    receive the HTTP Requests from client and connect to the database
    Contributer : Lau Yu Hin, Wong Man Chun
    Written on : 2022/3/28
    Last modified : 2022/5/6
*/

const User = require('../models/userModel')
const Course = require('../models/courseModel')
const Registered = require('../models/registeredModel')
const router = require('express').Router()
const bodyParser = require('body-parser')
const urlencodeedParser = bodyParser.urlencoded({extended: true})
router.use(bodyParser.json())
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:CSCI3100Admin@timetable.tzczu.mongodb.net/timetable_info?retryWrites=true&w=majority')



 
async function getfriendrequest(list_received,request_list){
    //get the friend request list in user db//
    for (const i in list_received) {
        await User.find(
            {_id: list_received[i]._id},
            (err, e) => {
                if (err) res.send(err)
                else {
                    if(e.length !=0){
                        let obj = 
                        { 
                            Name: e[0].userName,
                            ID: e[0]._id 
                
                        }
                        request_list.push(obj)
                    }
                }
                console.log(request_list)
            } 
        ).clone()
    }
    return new Promise(resolve => {
        setTimeout(()=>{
        resolve('resolved');},10);
    });
}

router.get("/",async(req, res) => {
    //get friend and friend request list from the user db//
    if(req.query.current_id != null&&req.query.type == 'start'){
        let name_list = []
        let user_id = req.query.current_id;
        let counter = 0
        console.log(user_id)

        let friend_info = await User.find(
            {_id: mongoose.Types.ObjectId(user_id)}, 
            'friend _id',
            (err, e) => {
                if (err) res.send(err)
                else return e
            }
        ).clone()
        let list_friend = friend_info[0].friend

        for (const i in list_friend) {
            counter = counter +1
            await User.find(
                {_id: list_friend[i]._id},
                (err, e) => {
                    if (err) res.send(err)
                    else {
                        if(e.length !=0){
                            let obj = 
                            {
                                Name: e[0].userName,
                                ID: e[0]._id 
                    
                            }
                            name_list.push(obj)
                        }
                    }
                }
            ).clone()
        }

       let request_list = []

        let received_info = await User.find(
            {_id: mongoose.Types.ObjectId(user_id)},
            'received _id',
            (err, e) => {
                if (err) res.send(err)
                else return e
            }
        ).clone()
        
        let list_received = received_info[0].received
        console.log(list_received)
        await getfriendrequest(list_received,request_list);
        console.log(request_list)
        res.json({friend: name_list,
                friendRequest: request_list})
    }else if(req.query.type == "search"){
        let user_id = req.query.current_id;
        let event = await User.find( 
            {userName:{ $regex: req.query.username},_id:{ $ne: mongoose.Types.ObjectId(user_id) }},
            'userName _id',
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
        }
//-----
        var data = [];
        for(let i = 0;i<event.length;i++){
            var obj = {
                Name: event[i].userName,
                ID: event[i]._id
            }
            data.push(obj);
        }
        res.json({
            relatedUser: data
        })
    }else{
        res.json("incorrect input format for userid in Friend system")
    }
    console.log(req.query.current_id)
    console.log(req.query)
})

router.post("/", urlencodeedParser, async(req, res) => {
    //delete and add and send request//
    console.log("hi, is post ")
    console.dir(req.body)
    console.log(req.body.type)
    if(req.body.type == "delete"){
        //delete the friend in the db for both guys//
        let user_id = req.body.current_id;
        let user_id_ref = mongoose.Types.ObjectId(user_id)
        let requester_ID = req.body.User_ID // need to get requester's name

        let requester_info = User.findOneAndUpdate(
            {_id: requester_ID},
            {'$pull': {'friend': user_id_ref}},
            async (err, e) => {
                if (err) res.send(err)
                else return e
            }
        ).clone();

        let requester_id = requester_info._id
        let requester_id_ref = mongoose.Types.ObjectId(requester_id)

        let user_info = User.findOneAndUpdate(
            {_id: user_id},
            {'$pull': {'friend': mongoose.Types.ObjectId(requester_ID)}},
            async (err, e) => {
                if (err) res.send(err)
                else return e
            }
        )

    }else if(req.body.type == "add"){
        //delete the friend request and add friend to both guys//
        let user_id = req.body.current_id;
        let user_id_ref = mongoose.Types.ObjectId(user_id)
        let requester_ID = req.body.User_ID // need to get requester's name
        let requester_info = User.findOneAndUpdate(
            {_id: mongoose.Types.ObjectId(requester_ID)},
            {'$push': {'friend': user_id_ref}, '$pull': {'request': user_id_ref}},
            async (err, e) => {
                if (err) res.send(err)
                else return e
            }
        ).clone();

        let requester_id = requester_info._id
        let requester_id_ref = mongoose.Types.ObjectId(requester_id)

        let user_info = User.findOneAndUpdate(
            {_id: user_id},
            {'$push': {'friend': mongoose.Types.ObjectId(requester_ID)}, '$pull': {'received': mongoose.Types.ObjectId(requester_ID)}},
            async (err, e) => {
                if (err) res.send(err)
                else return e
            }
        );
    }else if(req.body.type == "sendRequest"){
        //add a friend request to the related user request list//
        // check is receiver in the list of request/ check is user in the list of receiver/ check are they friend already before enter this state
        let user_id = req.body.current_id;
        let user_id_ref = mongoose.Types.ObjectId(user_id)
        let receiver_ID = req.body.User_ID //need to get receiver's name
        console.log("1 time")
        console.log(user_id_ref)
        console.log(receiver_ID)
        
        let checking = await User.find(
            {_id: mongoose.Types.ObjectId(user_id)},
            'request _id',
            (err, e) => {
                if (err) res.send(err)
                else return e
            }
        ).clone(); 
        console.log(checking[0])
        for(let i=0;i<checking[0].request.length;i++){
            if(checking[0].request[i] == receiver_ID){
            res.end(JSON.stringify("Already Added"))
            return 
            }
        }
        let receiver_info = User.findOneAndUpdate(
            {_id: mongoose.Types.ObjectId(receiver_ID)},
            {'$push': {'received': user_id_ref}},
            async (err, e) => {
                if (err) res.send(err)
                else return e
            }
        ).clone();

        let received_id = receiver_info._id
        let receiver_id_ref = mongoose.Types.ObjectId(received_id)
        
        let user_info = User.findOneAndUpdate(
            {_id: user_id},
            {'$push': {'request': mongoose.Types.ObjectId(receiver_ID)}},
            async (err, e) => {
                if (err) res.send(err)
                else return e
            }
        ).clone();

    }else{
        res.end(JSON.stringify("Wrong type"))
    }
    //update the value in the db
    res.end(JSON.stringify("successful"))
})



module.exports = router