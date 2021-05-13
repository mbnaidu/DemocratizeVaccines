import React from 'react'
import ReactDOM from 'react-dom'

import './styles.css'

import {BrowserRouter as Router,Route,} from "react-router-dom";
import Home from './Home'
import DonorRequirements from './Components/Donor/DonorRequirements'
import PatientRequirements from './Components/Patient/PatientRequirements'
import DonorAvailability from './Components/Donor/DonorAvailability'
import PatientAvailability from './Components/Patient/PatientAvailability'

function App() {
  return (
    <div>
      <Router>
          <div className="App">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/donor-requirements">
              <DonorRequirements />
            </Route>
            <Route exact path="/patient-requirements">
              <PatientRequirements />
            </Route>
            <Route exact path="/donor-availability">
              <DonorAvailability />
            </Route>
            <Route exact path="/patient-availability">
              <PatientAvailability />
            </Route>
          </div>
        </Router>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
