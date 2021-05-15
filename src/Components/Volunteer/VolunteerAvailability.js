import React, { useState } from 'react'
import { useLocation } from 'react-router';
import VolunteerMap from '../Maps/VolunteerMap';

function VolunteerAvailability() {
    const location = useLocation();
    const [type,setType] = useState(location.state.type);
    const [range,setRange] = useState(location.state.range);
    const [volunteers,setVolunteers] = useState([
		{height: 375,latitude: 14.99299800000002,longitude: 79.7399875,verifications: 34,owner_id:1213,owner_number:'1234567890',owner_name: "Madhu",type:"volunteer",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 2793,email: "18pa1a1213@vishnu.edu.in",status: "Active",width: 500},
        {height: 375,latitude: 15.99299800000002,longitude: 79.7399875,verifications: 34,owner_id:1214,owner_number:'1234567890',owner_name: "Madhu",type:"volunteer",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 2790,email: "18pa1a1213@vishnu.edu.in",status: "Active",width: 500},
        {height: 375,latitude: 16.99299800000002,longitude: 79.7399875,verifications: 34,owner_id:1215,owner_number:'1234567890',owner_name: "Madhu",type:"volunteer",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 2730,email: "18pa1a1213@vishnu.edu.in",status: "Active",width: 500},
        {height: 375,latitude: 17.99299800000002,longitude: 79.7399875,verifications: 34,owner_id:1216,owner_number:'1234567890',owner_name: "Madhu",type:"volunteer",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 2930,email: "18pa1a1213@vishnu.edu.in",status: "Active",width: 500},
        {height: 375,latitude: 18.99299800000002,longitude: 79.7399875,verifications: 34,owner_id:1217,owner_number:'1234567890',owner_name: "Madhu",type:"volunteer",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 7930,email: "18pa1a1213@vishnu.edu.in",status: "Active",width: 500},
	])
    const [volunteerOption,setVolunteerOption] = useState(location.state.finallist);
    // PATIENT AND DONORS
        const [patientDetails,setPatientDetails] = useState([
		{height: 375,latitude: 26.912899800000002,longitude: 80.7399875,owner_id: 4581,owner_number:'1234567890',owner_name: "Abhinav",type:"ICU Beds",owner_address: "rajolu",verifiedOn: "12-04-2021",photo_id: 27931,verifiedBy: "18pa1a1214@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",width: 500},
        {height: 375,latitude: 13.912899800000002,longitude: 79.7399875,owner_id: 4480,owner_number:'1234567890',owner_name: "Madhu",type:"Oxygen Cylinders",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27930,verifiedBy: "18pa1a1213@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",width: 500},
        {height: 375,latitude: 36.912899800000002,longitude: 80.7399875,owner_id: 4681,owner_number:'1234567890',owner_name: "Abhinav",type:"Private Transport",owner_address: "rajolu",verifiedOn: "12-04-2021",photo_id: 27931,verifiedBy: "18pa1a1214@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 47.912899800000002,longitude: 81.7399875,owner_id: 4782,owner_number:'1234567890',owner_name: "Sai",type:"Ambulance",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27932,verifiedBy: "18pa1a1215@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 65.912899800000002,longitude: 79.7399875,owner_id: 4980,owner_number:'1234567890',owner_name: "Madhu",type:"Vaccine",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27930,verifiedBy: "18pa1a1213@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",width: 500},
        ])
    return (
        <div>
            <nav className="glass">
                {
                    type === 'patient' ? (<div>
                        {volunteerOption === 'volunteers' ? (<div>
                            <VolunteerMap location={location} volunteers={volunteers} markers={patientDetails}/>
                        </div>) : (<div>
                            patient
                        </div>)}
                    </div>) : 
                    type === 'notverified' ? (<div>
                        {volunteerOption === 'volunteers' ? (<div>
                            not verified
                        </div>) : (<div>
                            not verified
                        </div>)}
                    </div>) : 
                    type === 'verified' ? (<div>
                        {volunteerOption === 'volunteers' ? (<div>
                            verified + volu
                        </div>) : (<div>
                            verified
                        </div>)}
                    </div>) : 
                    volunteerOption === 'volunteers' ? (<div>
                        volunteer
                    </div>) :
                (<div></div>)}
            </nav>
        </div>
    )
}

export default VolunteerAvailability
