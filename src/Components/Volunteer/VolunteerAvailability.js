import React from 'react'
import { useLocation } from 'react-router';

function VolunteerAvailability() {
    const location = useLocation();
    console.log(location)
    return (
        <div>
            <nav className="glass">
                VolunteerAvailability
            </nav>
        </div>
    )
}

export default VolunteerAvailability
