import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@material-ui/core'
import React, { useState } from 'react'


function Trail() {
    const names = [
        {id : '1' , value : 'Oxygen Cylinder' },
        {id : '2' , value : 'ICU Bed' },
        {id : '3' , value : 'Ambulance' },
        {id : '4' , value : 'Private Transport' },
        {id : '5' , value : 'Vaccine' },
        {id : '6' , value : 'Plasma' },
        
    ];
    var [finalList, setFinalList] = useState([]);
    const handleInput = (option) =>{
        let index = finalList.indexOf(option)
        if(index > -1){
            finalList.splice(index, 1);
        }
        else{
            finalList.push(option)
        }
    }
    const madhu = () => {
    return(
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">What Do You Need..?</FormLabel>
                <FormGroup>
                    {names.map((n,key=n.id)=>{
                        return(
                            <div>
                                <FormControlLabel
                                    control={<Checkbox name={n.value} color="primary"  onChange={()=>{handleInput(n.value)}}/>}
                                    label={n.value}
                                />
                            </div>
                        )
                    })}
                </FormGroup>
                <br/><br/>
            </FormControl>
        </div>
    )
}

    return (
        <div>
            {madhu()}
        </div>
    )
}

export default Trail
