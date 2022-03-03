const data = [
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
        <li class="text-start m-2" onClick={(e) => checkTimetable(data[i].ID, e)}>{data[i].Name}</li>
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


function Friend(props) {


    return (
        <>
            <SearchFriend />

            <ul>
                {data.map((list, index) => <FriendList i={index} key={index} />)}
            </ul>
        </>
    )
}

export { Friend }