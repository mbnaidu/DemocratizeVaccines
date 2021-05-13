import { Accordion, AccordionDetails, AccordionSummary, Badge, Button, Card, CardActions, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, makeStyles, Typography } from '@material-ui/core'
import { ExpandMoreSharp } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { ModalBody, ModalFooter, ModalTitle, Modal} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { NavLink, useLocation } from 'react-router-dom'


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin:50,
    borderRadius:30,
    marginTop:'30%',
    paddingTop:30,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  header:{
    marginLeft:'50%',
  }
})

function PatientRequirements() {
    const [longLatt,setLongLatt] = useState('');
    const [patientAddress,setPatientAddress] = useState('')
    useEffect(() => {
        const getCoordintes = ()=> {
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};
	function success(pos) {
		var crd = pos.coords;
		var lat = crd.latitude.toString();
		var lng = crd.longitude.toString();
		var coordinates = [lat, lng];
		setLongLatt(`Latitude: ${lat}, Longitude: ${lng}`)
        console.log(longLatt)
		getCity(coordinates);
		return;
	}
	function error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}
	navigator.geolocation.getCurrentPosition(success, error, options);
}
// Step 2: Get city name
const getCity = (coordinates) =>{
	var xhr = new XMLHttpRequest();
	var lat = coordinates[0];
	var lng = coordinates[1];

	// Paste your LocationIQ token below.
	xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.a38452a5c36ea022c35226791e032ecd&lat=" +
	lat + "&lon=" + lng + "&format=json", true);
	xhr.send();
	xhr.onreadystatechange = processRequest;
	xhr.addEventListener("readystatechange", processRequest, false);

	function processRequest(e) {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var response = JSON.parse(xhr.responseText);
            setPatientAddress(response.display_name)
			return;
		}
	}
}
getCoordintes()
    }, [])
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
        const classes = useStyles();
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
            <div className="alignList">
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            <div>
                                <Badge color="primary" badgeContent={13}>
                                    <Button variant="outlined" color="primary" onClick={()=>{setShow(true)}}>HOSPITALS</Button>
                                </Badge>
                            </div>
                        </Typography>
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
                            {patientAddress != '' ? (<div>
                                <NavLink
                                to={{
                                    pathname:'/patient-availability',
                                        state: {
                                            address:patientAddress,
                                            location:longLatt,
                                            finallist:finalList,
                                        } 
                                    }}
                                    exact
                            >
                            <Button variant="contained" color="primary" >SEARCH</Button>
                            </NavLink>
                            </div>) : (<div>
                                <Button variant="contained" color="primary" type="submit" onClick={()=>{alert('Please allow location');window.location.reload(false)}}>SEARCH</Button>
                            </div>)}
                        </FormControl>
                        </CardContent>
                    </Card>
            </div>
        </nav>
    )
}

export default PatientRequirements
