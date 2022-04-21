//import local files
import './index.css';
import App from './App.js';
import CreateCompetition from './routes/CreateCompetition.js';
import JoinCompetition from './routes/JoinCompetition';
import MyCompetition from './routes/MyCompetition';
import Vote from './routes/Vote';
import Results from './routes/Results';

//import React
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

//import for measuring performance
import reportWebVitals from './reportWebVitals';

/*************************************************************************/

//reactDom render
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route exact path="CreateCompetition" element={<CreateCompetition />} />
      <Route exact path="JoinCompetition" element={<JoinCompetition />} />
      <Route exact path="MyCompetition" element={<MyCompetition />} />
      <Route exact path="Vote" element={<Vote />} />
      <Route exact path="Results" element={<Results />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

/*************************************************************************/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
