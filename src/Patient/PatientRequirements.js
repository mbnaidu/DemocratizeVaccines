import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@material-ui/core'
import React from 'react'
import { NavLink } from 'react-router-dom'

function PatientRequirements() {
    return (
        <nav className="glass">
            <FormControl component="fieldset">
                <FormLabel component="legend">What Do You Need..?</FormLabel>
                <FormGroup>
                <FormControlLabel
                    control={<Checkbox name="Oxygen Cylinders" color="primary"/>}
                    label="Oxygen Cylinders"
                />
                <FormControlLabel
                    control={<Checkbox name="ICU Bed" color="primary"/>}
                    label="ICU Bed"
                />
                <FormControlLabel
                    control={<Checkbox name="Ambulance" color="primary"/>}
                    label="Ambulance"
                />
                <FormControlLabel
                    control={<Checkbox name="Private Transport" color="primary"/>}
                    label="Private Transport"
                />
                <FormControlLabel
                    control={<Checkbox name="Vaccine" color="primary"/>}
                    label="Vaccine"
                />
                <FormControlLabel
                    control={<Checkbox name="Plasma" color="primary"/>}
                    label="Plasma"
                />
                </FormGroup>
                <NavLink to="/patient-availability"><Button variant="contained" color="primary">NEXT</Button></NavLink>
            </FormControl>
        </nav>
    )
}

export default PatientRequirements
