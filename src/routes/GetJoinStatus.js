import {auth} from "../firebase";

function GetJoinStatus ({userList}) {
    let joined;
    const user = auth.currentUser.displayName;
    if(user in userList) joined="JOINED"
    else joined="NOT JOINED"
    return (
        <div style={{color:"red", fontWeight:"bold"}}>
            {joined}
        </div>
    )
}

export default GetJoinStatus;