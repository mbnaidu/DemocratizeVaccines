import React, { useState } from 'react'
import { useLocation } from 'react-router';

function VolunteerAvailability() {
    const location = useLocation();
    const [type,setType] = useState(location.state.type);
    const [range,setRange] = useState(location.state.range);
    const [volunteers,setVolunteers] = useState(location.state.finallist);
    // PATIENT AND DONORS
        const [patientAndDonors,setpatientAndDonors] = useState([
        {height: 375,latitude: 13.912899800000002,longitude: 79.7399875,owner_id: 4480,owner_number:'1234567890',owner_name: "Madhu",userType:"Patient",need:'Oxygen Cylinders',owner_address: "bhimavaram",SearchedDate: "12-04-2021",photo_id: 27930,verifiedBy: "18pa1a1213@vishnu.edu.in",contactNumber:'12344',width: 500},
		{height: 375,latitude: 13.992899800000002,longitude: 79.7399875,owner_id: 4481,owner_number:'1234567890',owner_name: "Abhinav",userType:"Donor",has:"Oxygen Cylinders",owner_address: "rajolu",verifiedOn: "12-04-2021",photo_id: 27931,verifiedBy: "18pa1a1214@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
        {height: 375,latitude: 13.912899800000002,longitude: 79.7399875,owner_id: 4480,owner_number:'1234567890',owner_name: "Madhu",userType:"Patient",need:'Plasma',owner_address: "bhimavaram",SearchedDate: "12-04-2021",photo_id: 27930,verifiedBy: "18pa1a1213@vishnu.edu.in",contactNumber:'12344',width: 500},
		{height: 375,latitude: 14.912899800000002,longitude: 78.7399875,owner_id: 4486,owner_number:'1234567890',owner_name: "Hari",userType:"Donor",has:"Plasma",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27933,verifiedBy: "18pa1a1216@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
        {height: 375,latitude: 13.912899800000002,longitude: 79.7399875,owner_id: 4480,owner_numbenpr:'1234567890',owner_name: "Madhu",userType:"Donor",need:'Ambulance',owner_address: "bhimavaram",SearchedDate: "12-04-2021",photo_id: 27930,verifiedBy: "18pa1a1213@vishnu.edu.in",contactNumber:'12344',width: 500},
		{height: 375,latitude: 13.912899800000002,longitude: 76.7399875,owner_id: 4485,owner_number:'1234567890',owner_name: "babu",userType:"Donor",need:"Ambulance",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27935,verifiedBy: "18pa1a1219@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
    ])
    return (
        <div>
            <nav className="glass">
                {
                    type === 'patient' ? (<div>
                        {volunteers === 'volunteers' ? (<div>
                            patient + volu
                        </div>) : (<div>
                            patient
                        </div>)}
                    </div>) : 
                    type === 'update' ? (<div>
                        {volunteers === 'volunteers' ? (<div>
                            update  + volu
                        </div>) : (<div>
                            update
                        </div>)}
                    </div>) : 
                    type === 'verify' ? (<div>
                        {volunteers === 'volunteers' ? (<div>
                            verify + volu
                        </div>) : (<div>
                            verify
                        </div>)}
                    </div>) : 
                    volunteers === 'volunteers' ? (<div>
                        volunteer
                    </div>) :
                (<div></div>)}
            </nav>
        </div>
    )
}

export default VolunteerAvailability
