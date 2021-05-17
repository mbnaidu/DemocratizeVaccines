import React, { Component } from 'react';
import '../src/styles.css'
import Example from './Components/example';
class Home extends Component {
    render() {
        return (
                <Example/>
            )
        }
    }
    export default Home

//  <nav className="glass">
//                 <div className="wrapper patientbutton">
//                         <NavLink to="/patient-requirements"><Button variant="contained"  color="primary" >PATIENT</Button></NavLink>{' '}
//                         <NavLink to="/donor-requirements"><Button variant="contained" color="primary" >DONOR</Button></NavLink>
//                         <br/><br/><br/>
//                         <NavLink to="/volunteer-requirements"><Button variant="contained" color="primary" >VOLUNTEER</Button></NavLink>
//                 </div>
//             </nav>