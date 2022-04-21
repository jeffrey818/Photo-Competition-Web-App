import '../App.css';
import { db } from '../firebase';
import Sidebar from '../Components/Sidebar/Sidebar';
import Navigation from '../Components/Topbar/Navigation'
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import {useState} from "react";
import {auth} from "../firebase"

const CreateCompetitionForm = () => {

  const [numOfParticipants, setNumOfParticipants] = useState(2)
  const [theme, setTheme] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [voteDate, setVoteDate] = useState('')
  const [publication, setPublication] = useState('')

  //initialize the dictionary of the joined users
  const joinList = {}

  //get the username of the current user
  const user = auth.currentUser.displayName

  function clickAlert () {
    alert("The Application Is Created Successfully!")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (
          theme.length === 0 || description.length === 0 || startDate.length === 0 ||
          endDate.length === 0 || voteDate.length === 0 || publication.length === 0
      ){
        alert("Please check if all fields are complete!")
      } else if (startDate > endDate) alert("Error! Start Date should before the End Date.");
      else if (endDate > voteDate) alert("Error! End Date should Before the voteDate.");
      else if (startDate > voteDate) alert("Error! Start Date should Before the voteDate.");
      else{
        await addDoc(collection(db, 'competition'), {
          numOfParticipants: numOfParticipants,
          theme: theme,
          description: description,
          startDate: startDate,
          endDate: endDate,
          voteDate: voteDate,
          publication: publication,
          createBy: user,
          joinedUser: 0,
          joinList: joinList
        })
        clickAlert();
      }
    } catch (err) {
      alert(err)
    }
  }


  return (
    <div style={{ display: 'block', 
    width: 700, 
    padding: 10 }}>
      <Form onSubmit={handleSubmit} className="createComp" name = "createComp">
        <h4>Create Competition</h4>
        <Form.Group className="mb-3" controlId="formNumParticipants">
          <Form.Label>Number of Participants Min 2:</Form.Label>
          <Form.Control type="number" placeholder="Ex: 2"
                        min="2"
                        onChange={(e) => setNumOfParticipants(parseInt(e.target.value))}
                        value = {numOfParticipants}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTheme">
          <Form.Label>* Theme:</Form.Label>
          <Form.Control type="text" placeholder="Ex: Landscape"
                        onChange={(e) => setTheme(e.target.value)}
                        value = {theme}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>* Description:</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="A description of the competition"
                        onChange={(e) => setDescription(e.target.value)}
                        value = {description}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStartDate">
          <Form.Label>* Start Date: </Form.Label>
          <Form.Control type="date"
                        onChange={(e) => setStartDate(e.target.value)}
                        value = {startDate}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEndDate">
          <Form.Label>* End Date: </Form.Label>
          <Form.Control type="date"
                        onChange={(e) => setEndDate(e.target.value)}
                        value={endDate}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formVoteDate">
          <Form.Label>* Voting End Date: </Form.Label>
          <Form.Control type="date"
                        onChange={(e) => setVoteDate(e.target.value)}
                        value={voteDate}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRadio">
          <span>* </span>
          <Form.Check inline type="radio" label="Public" name='radio'
                      onChange={() => setPublication("public")}
                      value = {publication}
          />
          <Form.Check inline type="radio" label="Private" name='radio'
                      onChange={() => setPublication("private")}
                      value = {publication}
          />
        </Form.Group>

        <Link to="/">
          <Button variant="primary" type="" >
            Cancel
          </Button> 
        </Link>
        &nbsp;&nbsp;&nbsp; {/* spaces between Buttons */}
        <Button variant="primary" type="submit">
          Create Competition
        </Button>
      </Form>
      <br/><div> (*: field required)</div>
    </div>
  )
}

function CreateCompetition() {
  return (
    <div className="createCompetition">
      <header className="createCompetition-header">
        <Navigation />
        <div className='rowC'>
          <Sidebar />
          <CreateCompetitionForm />
        </div>
      </header>
    </div>
  );
}

export default CreateCompetition;
