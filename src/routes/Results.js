import Sidebar from '../Components/Sidebar/Sidebar';
import Navigation from '../Components/Topbar/Navigation'
import {useEffect, useState} from "react";
import {db} from "../firebase";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import ViewResult from "../ViewResult";
import "./style.css"

function pad(num) {
    num = num.toString();
    while (num.length < 2) num = "0" + num;
    return num;
}

function Results() {
    const [competition, setCompetition] = useState([]);

    let now = new Date();
    let time = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());

    // get this login user's competition information
    useEffect(() => {

        //create reference of the competition collection in the db
        const comRef = collection(db, "competition")

        //make the query to get competitions which user joined
        const q = query(
            comRef
            // ,where("voteDate", "<", time)
            ,orderBy("voteDate")
        )

        onSnapshot(q, (querySnapshot) => {
            setCompetition(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })

    },[])

  return (
    <div className="Result-Page">
      <header className="Result-header">
        <Navigation />
      </header>

        <div className='rowC'>
            <Sidebar />
            <div className={"compBody"}>
                <div className={'title'}>Competitions Results:</div>
                {competition.map((comp) => (
                    (comp.data.voteDate < time)
                        ? (
                            <div key={comp.id} className={"comps"} >
                                <ViewResult
                                    id = {comp.id}
                                    creator = {comp.data.createBy}
                                    theme = {comp.data.theme}
                                    description = {comp.data.description}
                                    startDate = {comp.data.startDate}
                                    endDate = {comp.data.endDate}
                                    voteDate = {comp.data.voteDate}
                                    publication = {comp.data.publication}
                                    maxNum = {comp.data.numOfParticipants}
                                    joinNum = {comp.data.joinedUser}
                                    userList = {comp.data.joinList}
                                />
                            </div>
                        ) : <></>
                ))}

            </div>
        </div>
    </div>
  );
}

export default Results;