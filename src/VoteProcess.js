import {useState} from "react";
import {Button, ListGroup, Modal, Badge} from "react-bootstrap";
import "./routes/style.css"
import * as React from 'react';
import {ImageListItem, ImageList} from "@mui/material";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "./firebase";

function VoteProcess ({id, creator, theme, description, startDate, endDate, voteDate,
                          maxNum, joinNum, userList}) {

    const [open, setOpen] = useState(false)
    let list=[]

    for (const [key,value] of Object.entries(userList)) {
        // for (let i in userList[key]) {
        //     list.push(i)
        // }
        let array=[]
        array.push(key)
        array.push(value["photoRef"])
        array.push(value["voteNum"])
        // console.log(array)
        list.push(array)
    }
    // console.log(list)

    const handleVote = (userName, voteNum) => async (e) => {

        e.preventDefault();

        const compDocRef = doc(db, 'competition', id);

        userList[userName].voteNum = voteNum + 1

        try {
            // update the doc of the competition
            await updateDoc(compDocRef, {
                joinList: userList
            })
        } catch (err) {
            alert(err)
        }
    }

    return (
        <div className={'CompList'}>
            <div className={'compInfo'}>
                <ListGroup variant="flush">
                    <ListGroup.Item><strong>Theme: </strong>{theme}</ListGroup.Item>
                    <ListGroup.Item><strong>Start Date to Upload: </strong>{startDate}</ListGroup.Item>
                    <ListGroup.Item><strong>Last Date to Upload: </strong>{endDate}</ListGroup.Item>
                    <ListGroup.Item>
                        <strong style={{fontWeight:"bold", color:"red"}}>Last Date to Vote: </strong>
                        {voteDate}</ListGroup.Item>
                    <ListGroup.Item><strong>Description: </strong>{description}</ListGroup.Item>
                    <ListGroup.Item><strong>Number of Joined User: </strong>{joinNum}</ListGroup.Item>
                </ListGroup>
            </div>

            <div>
                <Button onClick={() => setOpen(true)}>Click to View Photos and Vote</Button>

                <Modal
                    size="lg"
                    show={open}
                    onHide={() => setOpen(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Description:{description}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ImageList variant="masonry" cols={3} gap={8}>
                            {list.map((item) => (
                                <ImageListItem key={item[0]} style={{position:"relative"}}>
                                    <img
                                        src={item[1]}
                                        alt={'vote'}
                                        loading="lazy"
                                    />

                                    <Button size={"sm"} style={{position: "absolute", top: "0", right: "0"}}
                                    onClick={handleVote(item[0],item[2])}
                                    >Vote
                                        <Badge bg="secondary">{item[2]}</Badge>
                                    </Button>
                                </ImageListItem>
                            ))}
                        </ImageList>



                    </Modal.Body>
                </Modal>
            </div>

        </div>
    );
}

export default VoteProcess