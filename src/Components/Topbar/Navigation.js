import { Navbar, Nav, Container, Button, Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navigation.css";
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {googleSignin, googleSignout, auth} from "../../firebase"
import {onAuthStateChanged } from "firebase/auth";

// for icons
import { FcGoogle } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const AboutPopUp = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            About
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This project aims to develop a website where people in the field of
            photography can connect to other people in the same field.
            To be specific, users can post their work and compete with each other.
            Besides, the application will allow users to vote to determine the winner in a competition.
            For example, photographers may have a competition challenge of taking a photo of a landscape/animal/people.
            Also, to help photographers create effective networking, 
            users could exchange their information for potential collaboration
            in the future after the completion of their competition. 
            In particular, users will take advantage of the website where they 
            see what people are doing in their field and know where they stand 
            in terms of their skills and knowledge.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

const Navigation = () => {

    const [aboutShow, setAboutShow] = React.useState(false);
    const [isUserSignedIn, setIsUserSignedIn] = useState(false);

    onAuthStateChanged(auth, (user)=>{
        if (user){
            // const  username = auth.currentUser.displayName;
            return setIsUserSignedIn(true);
        } setIsUserSignedIn(false);
    })

    if (isUserSignedIn === true) {

        return (
            <div>
                <Navbar className="Navbar" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand className="Brand" href="/">Photo Lover</Navbar.Brand>
                        <Nav className="Nav">
                            <Link to={"../MyCompetition"}><Button bsstyle="dark" variant='dark'>My Competitions</Button></Link>
                            <Navbar.Text>Signed As:{auth.currentUser.displayName}</Navbar.Text>
                            <Button bsstyle="dark" variant='dark' onClick={() => googleSignout()}> <FiLogOut/> Logout</Button>
                            <Button bsstyle="primary" variant='primary' onClick={() => setAboutShow(true)}>
                              About <AiOutlineQuestionCircle/>
                            </Button>
                        </Nav>
                    </Container>
                </Navbar>

                <AboutPopUp
                    show={aboutShow}
                    onHide={() => setAboutShow(false)}
                />

            </div>
        );
    }else{
        return (
            <div>
                <Navbar className="Navbar" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand className="Brand" href="/">Photo Lover</Navbar.Brand>
                        <Nav className="Nav">
                            <Button bsstyle="dark" variant='dark' onClick={() => googleSignin()}>Log in <FcGoogle/></Button>
                            <Button bsstyle="primary" variant='primary' onClick={() => setAboutShow(true)}>
                              About <AiOutlineQuestionCircle/>
                            </Button>
                        </Nav>
                    </Container>
                </Navbar>

                <AboutPopUp
                    show={aboutShow}
                    onHide={() => setAboutShow(false)}
                />

            </div>
        );
    }

};

export default Navigation;