import { dblClick } from '@testing-library/user-event/dist/click';
import React from 'react'
import './friendComp.css'

const friend = [
    {
        Name: "Ann",
        ID: '0001'

    },
    {
        Name: "Bob",
        ID: '0002'

    },
    {
        Name: "Connie",
        ID: '0003'

    },
    {
        Name: "Dennis",
        ID: '0004'

    },
    {
        Name: "Elsa",
        ID: '0005'

    },
];

function FriendList(props) {
    let i = props.i;

    function checkTimetable(id, e) {
        window.alert("check timetable of user " + id);
    }


    return (
        <li class="text-start m-2" onClick={(e) => checkTimetable(friend[i].ID, e)}>{friend[i].Name}</li>
    )
}

function SearchFriend(props) {

    function searchUser(props) {
        window.alert(document.querySelector("#search-text").value);
    }

    return (
        <>
            <input id="search-text" type="text"></input>
            <button title="search" onClick={searchUser}>search</button>
        </>
    )


}

function AddFriend(UserID){
    //send friend request to user
    
}
function DeleteFriend(UserID){
    //delete friend from the user database

}

function FriendColumn(){
    const friendList = friend.map((list, index) => <FriendList i={index} key={index} />);
    // key is the index of the list, calling the component of FriendList as defined so checkTimetable() could be call

    return(
        <>
            <div className="FriendListPanel">
                <div className="FriendListIcon">
                </div>
                <div className='FriendList'>
                    <h2>Search</h2>
                    <h2>Friends</h2>
                    <ul>{friendList}</ul>
                </div>
            </div>
        </>
    )
    
}

function Friend(props) {
    return (
        <>
            <FriendColumn />
            <SearchFriend />
            
            <ul>
            {friend.map((list, index) => <FriendList i={index} key={index} />)}
            </ul>
        </>
    )
}


export { Friend }
