import {useState} from 'react'
import {auth, db} from "./firebase"
import "./routes/style.css"
import UploadImage from "./UploadImage";
import './routes/style.css'
import {Button} from "react-bootstrap"
import {deleteObject, getStorage, ref} from "firebase/storage";
import {doc, updateDoc} from "firebase/firestore";

function MyComps ({id, creator, theme, description, startDate, endDate, voteDate,
                  maxNum, joinNum, userList}) {
    const [open, setOpen] = useState(false);

    //use the specific id to find document in the competition collection in Firestore
    const compDocRef = doc(db, 'competition', id)

    //get userName
    const userName = auth.currentUser.displayName;

    const handleClose = () => {
        setOpen(false);
    }

    //get path of user's uploaded Image
    let pathUserUploadImage = userList[userName].photoRef

    const handleDelete = async (e) => {
        e.preventDefault();

        if (userList[userName].photoRef === "") alert("There is no photo to delete!")
        else {
            //we need to delete the photo first, get url->delete it from firebase
            let hisPhotoURL = ""
            if (userList[userName].photoRef !== "") { //if the photo has uploaded/existed
                hisPhotoURL = userList[userName].photoRef
                const storage = getStorage();

                // Create a reference to the file to delete
                const desertRef = ref(storage, hisPhotoURL);

                // Delete the photo from his URL
                deleteObject(desertRef).then(() => {
                    // File deleted successfully
                }).catch((error) => {
                    console.log(error)
                });
            }

            // delete the url and update the file-exist status
            userList[userName].photoRef = ""
            userList[userName].uploadExist = "No Photo Uploaded"
            try {
                // update the doc of the competition
                await updateDoc(compDocRef, {
                    joinList: userList
                })
            } catch (err) {
                alert(err)
            }

        }
    }

    return (
        <div className={'CompList'}>
            <div className="compInfo">
                <div><strong>Competition Creator: </strong>{creator}</div>
                <div><strong>Theme: </strong>{theme}</div>
                <div><strong>Description: </strong>{description}</div>
                <div><strong>Start Date to Upload: </strong>{startDate}</div>
                <div><strong>Last Date to Upload: </strong><strong
                    style={{fontWeight:"bold", color:"red"}}>{endDate}</strong></div>
                <div><strong>Last Date to Vote: </strong>{voteDate}</div>
                <div><strong>Number of Participants: </strong>{joinNum}/{maxNum}</div>
            </div>

            <div className={"comp_button"}>
                <div className={"comp_upload"}>
                    <h4 className={'h4'}>Upload Check: <strong>{userList[userName].uploadExist}</strong></h4>
                    <Button variant="success"
                        onClick={()=> setOpen(true)}>CLICK HERE TO UPLOAD
                    </Button>{' '}
                    <Button variant="danger" onClick={(e)=>handleDelete(e)}
                    >Delete</Button>
                </div>

                <div className={"imgContainer"}>
                    <img src={pathUserUploadImage ||
                        "https://firebasestorage.googleapis.com/v0/b/capstone-9b049.appspot.com/o/ForDev%2Fwhite.png?alt=media&token=4bc94576-6d61-41e1-b84e-f8f7bb5d92f9"} alt={"upImg"}
                    />
                </div>
            </div>

            {open &&
                <UploadImage
                    onClose={handleClose}
                    userList={userList}
                    open={open}
                    id={id}
                />
            }
        </div>
    )

    /** Optional Return:
     * because the above returning code will not filter the competitions, they include all joined competition for the user
     * we should not allow the user to upload the photo if the competition have not started yet*/
    // if (time >= startDate)
    //     return (
    //         <div className={'CompList'}>
    //             <div className="compInfo">
    //                 <div><strong>Competition Creator: </strong>{creator}</div>
    //                 <div><strong>Theme: </strong>{theme}</div>
    //                 <div><strong>Description: </strong>{description}</div>
    //                 <div><strong>Start Date: </strong>{startDate}</div>
    //                 <div><strong>End Date: </strong>{endDate}</div>
    //                 <div><strong>Vote End Date: </strong>{voteDate}</div>
    //                 <div><strong>Number of Participants: </strong>{joinNum}/{maxNum}</div>
    //             </div>
    //
    //             <div className={"comp_button"}>
    //                 <div className={"comp_upload"}>
    //                     <h4 className={'h4'}>Upload Check: <strong>{userList[userName].uploadExist}</strong></h4>
    //                     <button
    //                         className={"myComp__uploadBtn"}
    //                         onClick={()=> setOpen(true)}>CLICK HERE TO UPLOAD
    //                     </button>
    //                 </div>
    //
    //                 <div className={"imgContainer"}>
    //                     <img src={pathUserUploadImage ||
    //                         "https://firebasestorage.googleapis.com/v0/b/capstone-9b049.appspot.com/o/ForDev%2Fwhite.png?alt=media&token=4bc94576-6d61-41e1-b84e-f8f7bb5d92f9"} alt={"upImg"}
    //                     />
    //                 </div>
    //             </div>
    //
    //             {open &&
    //                 <UploadImage
    //                     onClose={handleClose}
    //                     userList={userList}
    //                     open={open}
    //                     id={id}
    //                 />
    //             }
    //         </div>
    //     )
    // else return (
    //     <div className={'CompList'}>
    //         <div className="compInfo">
    //             <div><strong>Competition Creator: </strong>{creator}</div>
    //             <div><strong>Theme: </strong>{theme}</div>
    //             <div><strong>Description: </strong>{description}</div>
    //             <div><strong>Start Date: </strong>{startDate}</div>
    //             <div><strong>End Date: </strong>{endDate}</div>
    //             <div><strong>Vote End Date: </strong>{voteDate}</div>
    //             <div><strong>Number of Participants: </strong>{joinNum}/{maxNum}</div>
    //         </div>
    //
    //         <h3>Upload Panel Disabled.
    //         <br/>Please Wait Util the Start Date</h3>
    //     </div>
    // )

}

export default MyComps;