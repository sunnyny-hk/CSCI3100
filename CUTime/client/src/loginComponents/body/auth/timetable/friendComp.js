/*
    Description : page for URL "/friend" 
                  user access this part once they click Friend button at home page
                  require input from user
                  display the friend list, friend request to user
                  provide search features
                  check the format and send request to backend server by "/friendserver" 
                  return the search result to user
                  
                  uses friendComp.css
                  
    Contributer : Lau Yu Hin
    Written on : 2022/3/28
    Last modified : 2022/5/6
*/

import { dblClick } from '@testing-library/user-event/dist/click';
import React ,{useEffect, useState}from 'react';
import {useSelector} from 'react-redux';
import './friendComp.css'


function Friend(props) {
    const [friend,setFriend] = useState([]);

    const [relatedUser,setRelatedUser] = useState([]);

    const [friendRequest,setFriendRequest] = useState([]);

    const [relatedFriend,setRelatedFriend] = useState([]);

    const [backendData,setBackendData]= useState([{
        Name: "Flash",
        ID: '0010'

    }]) //for checking only//

    const auth = useSelector(state => state.auth)

    const {user, isLogged} = auth
    const current_id = user._id;
    console.log(current_id)
    const [searchField,setSearchField] = useState("");
    useEffect(() => {
        if(user._id)
        fetch("/friendserver?type=start&current_id="+current_id).then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
                setFriend(data["friend"])
                setRelatedFriend(data["friend"])
                setFriendRequest(data["friendRequest"])
                console.log(data)
            }
        )
    },[user._id])

    function RFriendList(props) {
        let i = props.i;

        function checkTimetable(id, e) {
            //window.alert("check timetable of user " + id);
        }
        return (
            <>
            <li class="Friendrecord">
                <a onClick={(e) => checkTimetable(relatedFriend[i].ID, e)}>{relatedFriend[i].Name}</a>
                {DeleteFriend (relatedFriend[i].ID)
                }
            </li>
            </>
        )
    }

    const SearchFriend = (e) =>{
        //window.alert(document.querySelector("#search-text").value);
            if(e.target.value == ""){
                setRelatedFriend(friend)
                console.log("break1")
            }else{
                const newData = friend.filter(
                    (value) =>{
                        return (
                            value.Name.toLowerCase().includes(e.target.value.toLowerCase())
                        );
                    }
                );
                setRelatedFriend(newData);
                console.log("break2")
            }
            
    }

    function DeleteFriend(UserID){
        //delete friend from the user database
        function DeleteUser(props) {
            console.log(friend[0].ID)
            console.log(UserID);
            setFriend(friend => friend.filter((value, i) => value.ID !== UserID));
            setRelatedFriend(relatedFriend => relatedFriend.filter((value, i) => value.ID !== UserID));
            

            //update the server//
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: "delete",
                    current_id: current_id,
                    User_ID: UserID
                })
            }
            fetch("/friendserver", requestOptions).then(
                response => response.json()
            ).then(
                data => {
                    console.log(data)
                }
            )

        }
        return (
            <>
                <button 
                    title="DeleteFriend" 
                    onClick ={() => DeleteUser()}>
                    -
                </button>
            </>
        )
    }

    function ShowUserInfo(props){
        console.log("Show User Info : " + props);
    }

    function RelatedUserList(props) {
        let i = props.i;

        return (
            <>
            <li class="RelatedUserRecord">
                <a onClick={() => {
                    ShowUserInfo(relatedUser[i].ID);
                    console.log("Click on the user" + relatedUser[i].ID);
                }}>{relatedUser[i].Name}</a>
                {SendRequest (i)}
            </li>
            </>
        )
    }

    function SearchRelatedUser(props) {

        function search(props) {
            fetch("/friendserver?type=search&username="+document.getElementById("search-user").value+"&current_id="+current_id).then(
                response => response.json()
            ).then(
                data => {
                    setBackendData(data)
                    setRelatedUser(data["relatedUser"])
                    console.log(data)
                }
            )
        }

        return (
            <>
                <input 
                id="search-user" 
                type="text" 
                placeholder='Search for user' 
                onKeyPress = { (e) =>{
                    if(e.key ==="Enter"){
                        search()
                    }
                }}></input>
            </>
        )


    }

    function SendRequest(UserID){
        //send friend request to user
        function SendFriendRequest(props) {
            window.alert("Send friend request to " + relatedUser[UserID].Name);
            //update the server//
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: "sendRequest",
                    current_id: current_id,
                    User_ID: relatedUser[UserID].ID
                })
            }
            fetch("/friendserver", requestOptions).then(
                response => response.json()
            ).then(
                data => {
                    console.log(data)
                }
            )
        }
        
        return (
            <>
                { friend.filter((e) => e.ID === relatedUser[UserID].ID).length === 0 ? 
                <button 
                    title="SendFriendRequest" 
                    onClick ={() => SendFriendRequest()}>
                    +
                </button> : null
                }
            </>
        )
    }

    function FriendRequestList(props) {
        let i = props.i;
        
        return (
            <>
            <li class="FriendRequestRecord">
                <a onClick={() => {
                    ShowUserInfo(friendRequest[i].ID);
                    console.log("Click on the user" + friendRequest[i].ID);
                }}>{friendRequest[i].Name}</a>
                {AddFriend (i)}
            </li>
            </>
        )
    }

    function AddFriend(UserID){
        //delete friend from the user database
        function AddUser(props) {
            window.alert("You are now friend with "+friendRequest[UserID].Name);
            let obj = friend;
            obj.push(friendRequest[UserID]);
            setFriendRequest(friendRequest => friendRequest.filter((value, i) => i !== UserID));
            setFriend(obj);
            obj = relatedFriend;
            console.log("obj"+obj);
            console.log(relatedFriend);

            //update the server//
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: "add",
                    current_id: current_id,
                    User_ID: friendRequest[UserID].ID
                })
            }
            fetch("/friendserver", requestOptions).then(
                response => response.json()
            ).then(
                data => {
                    console.log(data)
                }
            )

        }
        return (
            <>
                <button 
                    title="AcceptFriendRequest" 
                    onClick ={() => AddUser()}>
                    Accept
                </button>
            </>
        )
    }

    return (
        <>
            <div className="Friend">
                <div className="MyFriend">
                    <h1>My Friends</h1>
                    <input 
                    type = "text" 
                    placeholder = "Search Friend"
                    onChange = {SearchFriend}
                    />
                    
                    <ul className="FriendsList">
                        {relatedFriend.slice(0,15).map((list, index) => <RFriendList i={index} key={index} />)}
                    </ul>
                </div>
                <div className='NewFriend'>
                <div className="AddFriend">
                    <h1>Friend Requests</h1>
                    <ul className="FriendRequestsList">
                    {friendRequest.map((list, index) => <FriendRequestList i={index} key={index} />)}
                    </ul>
                </div>

                <div className="FindFriend">
                    <h1>Find New Friends</h1>
                    <SearchRelatedUser />
                    <ul className="RelatedUsersList">
                    {relatedUser.map((list, index) => <RelatedUserList i={index} key={index} />)}
                    </ul>
                </div>
                </div>
                
            </div>
        </>
    )
}


export { Friend }