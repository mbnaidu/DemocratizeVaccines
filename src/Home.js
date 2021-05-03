import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <nav className="glass">
                <NavLink to="/patient-location"><Button variant="contained" color="primary">NEED - HELP</Button></NavLink>
                <NavLink to="/donor-location"><Button variant="contained" color="primary">HELP - NEED</Button></NavLink>
            </nav>
            )
        }
    }
    
    export default Home
    