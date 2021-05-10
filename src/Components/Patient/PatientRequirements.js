import { Accordion, AccordionDetails, AccordionSummary, Badge, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Typography } from '@material-ui/core'
import { ExpandMoreSharp } from '@material-ui/icons';
import React, { useState } from 'react'
import { ModalBody, ModalFooter, ModalTitle, Modal} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { NavLink, useLocation } from 'react-router-dom'
import '../../Styles/Patient.css'




function PatientRequirements() {
    const location = useLocation();
    const [show, setShow] = useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    // 
        const names = [
            {id : '1' , value : 'Oxygen Cylinders' },
            {id : '2' , value : 'ICU Beds' },
            {id : '3' , value : 'Ambulance' },
            {id : '4' , value : 'Private Transport' },
            {id : '5' , value : 'Vaccine' },
            {id : '6' , value : 'Plasma' },
        ];
        var finalList = [];
        const handleInput = (option) =>{
            let index = finalList.indexOf(option)
            if(index > -1){
                finalList.splice(index, 1);
            }
            else{
                finalList.push(option)
            }
        }
    return (
        <nav className="glass">
            {/* MODELS */}
                <Modal size="sm" show={show}>
                    <ModalHeader closeButton onClick={()=>{setShow(false)}}>
                        <ModalTitle>BHIMAVARM</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                <AccordionSummary expandIcon={<ExpandMoreSharp />} >
                                <Typography color="primary">Varma Hospital</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography>
                                    Achanta Main Road, Achanta, Andhra Pradesh 534269
                                </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                <AccordionSummary expandIcon={<ExpandMoreSharp />} >
                                <Typography  color="primary">Bhimavaram Hospitals</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion  expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                <AccordionSummary expandIcon={<ExpandMoreSharp />}>
                                <Typography color="primary">Imperial Hospitals</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography>
                                    Achanta Main Road, Achanta, Andhra Pradesh 534269
                                </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreSharp />}>
                                <Typography color="primary">Sai Pragnya Hospital</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography>
                                    Achanta Main Road, Achanta, Andhra Pradesh 534269
                                </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreSharp />}>
                                <Typography color="primary">New London Hospital</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography>
                                    Achanta Main Road, Achanta, Andhra Pradesh 534269
                                </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" onClick={()=>{setShow(false)}}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            <div>
                <Badge color="primary" badgeContent={13}>
                    <Button variant="outlined" color="primary" onClick={()=>{setShow(true)}}>HOSPITALS</Button>
                </Badge>
            </div>
            <div className="alignList">
                <FormControl>
                    <FormLabel>What Do You Need..?</FormLabel>
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
                    <NavLink
                        to={{
                            pathname:'/patient-availability',
                                state: {
                                    State:location.state.State,
                                    District:location.state.District,
                                    Mandal:location.state.Mandal,
                                    finallist:finalList,
                                } 
                            }}
                            exact
                    >
                    <Button variant="contained" color="primary" >SEARCH</Button></NavLink>
                </FormControl>
            </div>
        </nav>
    )
}

export default PatientRequirements
