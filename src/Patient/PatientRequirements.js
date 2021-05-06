import { Accordion, AccordionDetails, AccordionSummary, Badge, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Typography } from '@material-ui/core'
import { ExpandMoreSharp } from '@material-ui/icons';
import React, { useState } from 'react'
import { ModalBody, ModalFooter, ModalTitle, Modal} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { NavLink } from 'react-router-dom'

function PatientRequirements() {
    const [show, setShow] = useState(false);
    const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
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
            <br/><br/><br/><br/>
            <Badge color="primary" badgeContent={13}>
                <Button variant="outlined" color="primary" onClick={()=>{setShow(true)}}>HOSPITALS</Button>
            </Badge>
            <br/><br/><br/><br/><br/><br/><br/>
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
                <br/><br/>
                <NavLink to="/patient-availability"><Button variant="contained" color="primary">SEARCH</Button></NavLink>
            </FormControl>
        </nav>
    )
}

export default PatientRequirements
