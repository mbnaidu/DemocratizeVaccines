import React  from 'react';
import './App.css';
import {BrowserRouter as Router,Route,} from "react-router-dom";
import Home from './Home';
import { Component } from 'react';
// PATIENT
import PatientLocation from './Components/Patient/PatientLocation';
import PatientRequirements from './Components/Patient/PatientRequirements';
import PatientAvailability from './Components/Patient/PatientAvailability'

// DONOR
import DonorLocation from './Components/Donor/DonorLocation';
import DonorRequirements from './Components/Donor/DonorRequirements';
import DonorAvailability from './Components/Donor/DonorAvailability'
import Trail from './Components/Trail';

export class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/donor-location">
              <DonorLocation />
            </Route>
            <Route exact path="/patient-location">
              <PatientLocation />
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
}

export default App
  