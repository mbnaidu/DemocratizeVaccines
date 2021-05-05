import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <nav className="glass">
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <NavLink to="/patient-location"><Button variant="contained" color="primary">PATIENT</Button></NavLink>{' '}
                <NavLink to="/donor-location"><Button variant="contained" color="primary">DONOR</Button></NavLink>
            </nav>
            )
        }
    }
    export default Home
    