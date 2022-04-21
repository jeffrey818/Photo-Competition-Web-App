import './style.css';
import MyComps from "../MyComps";

import { db,auth } from '../firebase';
import {collection, query, onSnapshot, where} from "firebase/firestore";

import Sidebar from '../Components/Sidebar/Sidebar';
import Navigation from '../Components/Topbar/Navigation'
import {useEffect, useState} from "react";

function pad(num) {
    num = num.toString();
    while (num.length < 2) num = "0" + num;
    return num;
}

function MyCompetition() {

    const [competition, setCompetition] = useState([]);

    // get the current user's name
    const userName = auth.currentUser.displayName;

    // get this login user's competition information
    useEffect(() => {

        //create reference of the competition collection in the db
        const comRef = collection(db, "competition")

        //make the query to get competitions which user joined
        const q = query(
            comRef, where(`joinList.${userName}`, "!=", "")
        )

        onSnapshot(q, (querySnapshot) => {
            setCompetition(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })

    },[])

    let now = new Date();
    let time = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());

    return (
      <div className="myCompetition">
        <header className="myCompetition-header">
          <Navigation />
        </header>
          <div className='rowC'>
              <Sidebar />

              <div className={"compBody"}>
                  <div className={'title'}>My Competitions:</div>
                  {competition.map((comp) => (
                      (comp.data.endDate >= time)
                      ? (
                      <div className={"comps"} key={comp.id}>
                          <MyComps
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
    )
}

export default MyCompetition;