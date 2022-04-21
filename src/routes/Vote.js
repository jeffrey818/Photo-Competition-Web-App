import Sidebar from '../Components/Sidebar/Sidebar';
import Navigation from '../Components/Topbar/Navigation'
import {useEffect, useState} from "react";
import {db} from "../firebase";
import {collection, onSnapshot, orderBy, query, where} from "firebase/firestore";
import "./style.css"
import VoteProcess from "../VoteProcess";

function pad(num) {
    num = num.toString();
    while (num.length < 2) num = "0" + num;
    return num;
}

function Vote() {

    const [competition, setCompetition] = useState([]);

    let now = new Date();
    let time = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());

    // get this login user's competition information
    useEffect(() => {

        //create reference of the competition collection in the db
        const comRef = collection(db, "competition")

        //make the query to get competitions which user joined
        const q = query(
            comRef, where("voteDate", ">=", time),orderBy("voteDate")
        )

        onSnapshot(q, (querySnapshot) => {
            setCompetition(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })

    },[])

    return (
    <div className="Vote-Page">
      <header className="Vote-header">
        <Navigation />
      </header>

        <div className='rowC'>
            <Sidebar />
            <div className={"compBody"}>
                <div className={'title'}>Vote Competitions:</div>
                {competition.map((comp) => (
                    /** remember to remove this*/
                    (comp.data.endDate < time) && (comp.data.voteDate >= time)
                        ? (
                            <div key={comp.id} className={"comps"} >
                                <VoteProcess
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

export default Vote;