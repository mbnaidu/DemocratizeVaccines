import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../src/styles.css'
import '../src/Styles/Patient.css'
class Home extends Component {
    render() {
        return (
            <nav className="glass">
                <div className="wrapper patientbutton">
                    <NavLink to="/patient-requirements"><Button variant="contained"  color="primary">PATIENT</Button></NavLink>{' '}
                    <NavLink to="/donor-location"><Button variant="contained" color="primary">DONOR</Button></NavLink>
                </div>
            </nav>
            )
        }
    }
    export default Home
    