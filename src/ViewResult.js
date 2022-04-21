import {useState} from "react";
import {Button, ListGroup, Modal, Badge} from "react-bootstrap";
import "./routes/style.css"
import * as React from 'react';
import {ImageListItem, ImageList, ImageListItemBar} from "@mui/material";
import Winners from "./routes/Winners";

function ViewResult ({id, creator, theme, description, startDate, endDate, voteDate,
                          maxNum, joinNum, userList}) {

    const [open, setOpen] = useState(false)

    let list=[]
    for (const [key,value] of Object.entries(userList)) {
        let array=[]
        array.push(key)
        array.push(value["photoRef"])
        array.push(value["voteNum"])
        // console.log(array)
        list.push(array)
    }
    // console.log(list)

    //find the winner with the most vote number in a competition
    list.sort(function(a, b) {
        return b[2] - a[2];
    });

    //to deal with the result with photo has the same max vot num
    let maxVoteNum = list[0][2]
    let winnerList=[]
    for (let index in list){
        (list[index][2] === maxVoteNum) ? winnerList.push(list[index]): winnerList.push()
    }

    // console.log(winnerList)

    return (
        <div className={'CompList'}>
            <div className={'compInfo'}>
                <ListGroup variant="flush">
                    <ListGroup.Item><strong>Theme: </strong>{theme}</ListGroup.Item>
                    <ListGroup.Item><strong>Start Date to Upload: </strong>{startDate}</ListGroup.Item>
                    <ListGroup.Item><strong>Last Date to Upload: </strong>{endDate}</ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Last Date to Vote: </strong>
                        {voteDate}</ListGroup.Item>
                    <ListGroup.Item><strong>Description: </strong>{description}</ListGroup.Item>
                    <ListGroup.Item><strong>Number of Joined User: </strong>{joinNum}</ListGroup.Item>
                </ListGroup>
            </div>

            <div>
                <Button onClick={() => setOpen(true)}>Click to View All Photos and Votes</Button>

                <Winners winners= {winnerList} />

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

                                    <Button size={"sm"} style={{position: "absolute", top: "0", right: "0"}}>Vote
                                        <Badge bg="secondary">{item[2]}</Badge>
                                    </Button>

                                    <ImageListItemBar
                                        title={item[0]}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Modal.Body>
                </Modal>
            </div>

        </div>
    );
}

export default ViewResult