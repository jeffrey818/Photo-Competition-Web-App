import '../App.css';
import '../firebase';
import './style.css'
import {useState, useEffect} from "react";
import GetJoinStatus from "./GetJoinStatus";

import Sidebar from '../Components/Sidebar/Sidebar';
import Navigation from '../Components/Topbar/Navigation'

import { collection, query, onSnapshot, where, updateDoc, doc, orderBy } from "firebase/firestore";
import { db,auth } from "../firebase";
import {Button} from 'react-bootstrap'
import { getStorage, ref, deleteObject } from "firebase/storage";


function pad(num) {
    num = num.toString();
    while (num.length < 2) num = "0" + num;
    return num;
}

function JoinCompetition() {
    const [competition, setCompetition] = useState([]);

    // get the username of the current user
    const user = auth.currentUser.displayName

    // handle the event of user click the join button
    const handleJoin = (id, userList, numUser)=>  async() => {

        //use the specific id to find document in the competition collection in Firestore
        const compDocRef = doc(db, 'competition', id)

        // check if the userList dictionary has the existed key of current user
        if (user in userList) {
            alert("Join Failed! You have already joined!")
        } else {
            /*create a dictionary for the user. userList is an Array storing the information of a
                    user who join the competition, it stores the reference of photos and the number of vote
                    */
            userList[user] = {}

            //initial the information to the user's Array when the user join the competition
            userList[user].voteNum = 0
            userList[user].photoRef = ""
            userList[user].uploadExist = "No Photo Uploaded"

            try{
                // update the doc of the competition
                await updateDoc(compDocRef, {
                    joinList: userList,
                    joinedUser: numUser + 1
                })
            } catch (err) {
                alert(err)
            }
        }
    }

    const handleUnJoin = (id, userList, numUser)=>  async() => {

        //use the specific id to find document in the competition collection in Firestore
        const compDocRef = doc(db, 'competition', id)

        // check if the userList dictionary has the existed key of current user
        if (!(user in userList)) {
            alert("Failed! You did not join this one!")
        } else { //if user is in the joined List of the competition, next step is to remove his info from the dict

            //first, we need to delete the photo first, get url->delete it from firebase
            let hisPhotoURL=""
            if (userList[user].photoRef !== "") { //if the photo has uploaded/existed
                hisPhotoURL = userList[user].photoRef
                const storage = getStorage();

                // Create a reference to the file to delete
                const desertRef = ref(storage, hisPhotoURL);

                // Delete the photo from his URL
                deleteObject(desertRef).then(() => {
                    // File deleted successfully
                }).catch((error) => {
                    console.log(error)
                });

                //second, we remove him from the dictionary
                delete userList[user]
                try{
                    // update the doc of the competition
                    await updateDoc(compDocRef, {
                        joinList: userList,
                        joinedUser: numUser - 1
                    })
                } catch (err) {
                    alert(err)
                }
            }

            //if the photo has not uploaded but the user want to unjoin the comp
            //we only delete the user key in the dictionary
            delete userList[user]
            try{
                // update the doc of the competition
                await updateDoc(compDocRef, {
                    joinList: userList,
                    joinedUser: numUser - 1
                })
            } catch (err) {
                alert(err)
            }
        }
    }

    useEffect( () => {
        let now = new Date();
        let time = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());

        const comRef = collection(db, 'competition')

        const q = query(
            comRef, where("endDate", ">=", time),
            orderBy("endDate")
        );

        onSnapshot(q, (querySnapshot) => {
            setCompetition(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })

    }, []);

    return (
        <div className="joinCompetition">
            <header className="joinCompetition-header">
                <Navigation />
            </header>
                <div className='rowC'>
                    <Sidebar />

                    <div className={"compBody"}>
                        <div className={'title'}>Join Competitions:</div>
                        {competition.map((comp) => (
                        comp.data.joinedUser <= comp.data.numOfParticipants
                            ? (
                            <div key={comp.id} className={"comps"}>
                                <div><strong>Competition Creator: </strong>{comp.data.createBy}</div>
                                <div><strong>Theme: </strong>{comp.data.theme}</div>
                                <div><strong>Description: </strong>{comp.data.description}</div>
                                <div><strong>Start Date: </strong>{comp.data.startDate}</div>
                                <div><strong>Last Date to Join: </strong><strong style={{fontWeight:"bold", color:"red"}}>{comp.data.endDate}</strong></div>
                                <div><strong>Last Date to Vote: </strong>{comp.data.voteDate}</div>
                                <div><strong>Number of Participants: </strong>{comp.data.joinedUser}/{comp.data.numOfParticipants}</div>
                                <div><strong>Join Status: </strong>
                                    <GetJoinStatus
                                        userList={comp.data.joinList}
                                    />
                                </div>
                                <Button onClick={handleJoin(comp.id, comp.data.joinList, comp.data.joinedUser)}
                                        variant={"success"}
                                    >Join</Button>
                                <Button onClick={handleUnJoin(comp.id, comp.data.joinList, comp.data.joinedUser)}
                                        variant="danger"
                                >Unjoin</Button>
                                <br/>
                            </div>
                        ) : <></>

                        ))}
                    </div>

                </div>
        </div>
    );

}
  
export default JoinCompetition;
  