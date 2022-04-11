import { dblClick } from '@testing-library/user-event/dist/click';
import React ,{useEffect, useState}from 'react'
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
    const current_id = '00020'
    const [searchField,setSearchField] = useState("");
    useEffect(() => {
        fetch("/friendserver?type=start&current_id="+current_id).then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
                setFriend(data["friend"])
                setFriendRequest(data["friendRequest"])
                setRelatedFriend(data["friend"])
                console.log(data["friend"])
                console.log(data)

            }
        )
    },[])

/*    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            current_id: "00001",
            addfriend: "00002"
        })
    }*/

    /*function FriendColumn(props){
        const friendList = friend.map((list, index) => <FriendList i={index} key={index} />);
        return(
            <>
                <div className="FriendListPanel">
                    <div className="FriendListIcon">
                    </div>
                    <div className='FriendList'>
                        <h2>My Friends</h2>
                        <h2><SearchFriend /></h2>
                        <ul>{friendList}</ul>
                    </div>
                </div>
            </>
        )
        
    }*/

    function RFriendList(props) {
        let i = props.i;

        function checkTimetable(id, e) {
            window.alert("check timetable of user " + id);
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
            //console.log("search text: " + e.target.value)
            //console.log("relatedfriend: ")
            //console.log(relatedFriend)
        

    }

    function DeleteFriend(UserID){
        //delete friend from the user database
        //console.log("delete friend "+UserID);
        function DeleteUser(props) {
            window.alert("Unfriend with " + UserID);
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
                    current_User: current_id,
                    User_ID: UserID
                })
                //body: JSON.stringify([ancd])
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
                    //onClick={() => SaveGPA(i, document.getElementById(COURSEGPA[i].COURSE_CODE).value)} >
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
            window.alert(document.querySelector("#search-user").value);
            fetch("/friendserver?type=search&username="+document.getElementById("search-user").value).then(
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
        //console.log(UserID);
        function SendFriendRequest(props) {
            window.alert("Send friend request to " + relatedUser[UserID].Name);
            //setFriend(friend => friend.filter((value, i) => i !== UserID));
            
            //update the server//
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: "sendRequest",
                    current_User: current_id,
                    User_ID: relatedUser[UserID].ID
                })
                //body: JSON.stringify([ancd])
            }
            fetch("/friendserver", requestOptions).then(
                response => response.json()
            ).then(
                data => {
                    console.log(data)
                }
            )
        }
        //const obj = {Name: 'Ann', ID: '0001'};
        //console.log("comparison: "+friend.filter((e) => e.ID === relatedUser[UserID].ID).length);
        //console.log(friend[0]);
        //console.log(obj);

        return (
            <>
                { friend.filter((e) => e.ID === relatedUser[UserID].ID).length === 0 ? 
                <button 
                    title="SendFriendRequest" 
                    //onClick={() => SaveGPA(i, document.getElementById(COURSEGPA[i].COURSE_CODE).value)} >
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
        //console.log(UserID);
        function AddUser(props) {
            window.alert("You are now friend with "+friendRequest[UserID].Name);
            let obj = friend;
            obj.push(friendRequest[UserID]);
            //console.log(obj);
            setFriendRequest(friendRequest => friendRequest.filter((value, i) => i !== UserID));
            setFriend(obj);
            obj = relatedFriend;
            console.log("obj"+obj);
            //obj.push(friendRequest[UserID]);
            //setRelatedFriend(obj);
            console.log(relatedFriend);

            //update the server//
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: "add",
                    current_User: current_id,
                    User_ID: friendRequest[UserID].ID
                })
                //body: JSON.stringify([ancd])
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
                    //onClick={() => SaveGPA(i, document.getElementById(COURSEGPA[i].COURSE_CODE).value)} >
                    onClick ={() => AddUser()}>
                    Accept
                </button>
            </>
        )
    }
//testing for search//
/*    function RFriendList(props) {
        let i = props.i;

        function checkTimetable(id, e) {
            window.alert("check timetable of user " + id);
        }
        return (
            <>
            <li class="Friendrecord">
                <a>{relatedFriend[i].Name}</a>
                {DeleteFriend (i)}
            </li>
            </>
        )
    }
*/
    return (
        <>
            {/*<FriendColumn />*/}
            <div className="Friend">
                <div className="MyFriend">
                    <h1>My Friends</h1>
                    <input 
                    type = "text" 
                    placeholder = "Search Friend"
                    onChange = {SearchFriend}
                    />
                    
                    <ul className="FriendsList">
                    {/*{friend.map((list, index) => <FriendList i={index} key={index} />)}*/}
                    {/*<div style={{overflowY: 'scroll', height:'20vh'}}>*/}
                        {relatedFriend.slice(0,15).map((list, index) => <RFriendList i={index} key={index} />)}
                    {/*</div>*/}
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