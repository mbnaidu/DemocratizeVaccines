import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, Collapse, Icon, Input, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ModalBody, ModalFooter, ModalTitle, Modal} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { ExpandLess, ExpandMore, Twitter } from '@material-ui/icons';
import axios from 'axios';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Map from '../Maps/PatientMap'

function PatientAvailability() {
    const [expanded, setExpanded] = React.useState(false);
    const [oxygens,setOxygens] = useState([
        {height: 375,latitude: 13.912899800000002,longitude: 79.7399875,owner_id: 4480,owner_number:'1234567890',owner_name: "Madhu",type:"Oxygen Cylinders",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27930,verifiedBy: "18pa1a1213@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 13.992899800000002,longitude: 79.7399875,owner_id: 4481,owner_number:'1234567890',owner_name: "Abhinav",type:"Oxygen Cylinders",owner_address: "rajolu",verifiedOn: "12-04-2021",photo_id: 27931,verifiedBy: "18pa1a1214@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 17.912899800000002,longitude: 81.7399875,owner_id: 4482,owner_number:'1234567890',owner_name: "Sai",type:"Oxygen Cylinders",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27932,verifiedBy: "18pa1a1215@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 14.912899800000002,longitude: 78.7399875,owner_id: 4486,owner_number:'1234567890',owner_name: "Hari",type:"Oxygen Cylinders",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27933,verifiedBy: "18pa1a1216@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 13.912899800000002,longitude: 77.7399875,owner_id: 4484,owner_number:'1234567890',owner_name: "Richad",type:"Oxygen Cylinders",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27934,verifiedBy: "18pa1a1217@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 13.912899800000002,longitude: 76.7399875,owner_id: 4485,owner_number:'1234567890',owner_name: "babu",type:"Oxygen Cylinders",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27935,verifiedBy: "18pa1a1219@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
    ])
    const [ICUBeds,setICUBeds] = useState([
        {height: 375,latitude: 25.912899800000002,longitude: 79.7399875,owner_id: 4580,owner_number:'1234567890',owner_name: "Madhu",type:"ICU Beds",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27930,verifiedBy: "18pa1a1213@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 26.912899800000002,longitude: 80.7399875,owner_id: 4581,owner_number:'1234567890',owner_name: "Abhinav",type:"ICU Beds",owner_address: "rajolu",verifiedOn: "12-04-2021",photo_id: 27931,verifiedBy: "18pa1a1214@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 27.912899800000002,longitude: 81.7399875,owner_id: 4582,owner_number:'1234567890',owner_name: "Sai",type:"ICU Beds",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27932,verifiedBy: "18pa1a1215@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 24.912899800000002,longitude: 78.7399875,owner_id: 4586,owner_number:'1234567890',owner_name: "Hari",type:"ICU Beds",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27933,verifiedBy: "18pa1a1216@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 23.912899800000002,longitude: 77.7399875,owner_id: 4584,owner_number:'1234567890',owner_name: "Richad",type:"ICU Beds",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27934,verifiedBy: "18pa1a1217@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 23.912899800000002,longitude: 76.7399875,owner_id: 4585,owner_number:'1234567890',owner_name: "babu",type:"ICU Beds",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27935,verifiedBy: "18pa1a1219@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		
    ]);
    const [privateTransport,setPrivateTransport] = useState([
        {height: 375,latitude: 35.912899800000002,longitude: 79.7399875,owner_id: 4680,owner_number:'1234567890',owner_name: "Madhu",type:"Private Transport",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27930,verifiedBy: "18pa1a1213@vishnu.edu.in",availability: "Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 36.912899800000002,longitude: 80.7399875,owner_id: 4681,owner_number:'1234567890',owner_name: "Abhinav",type:"Private Transport",owner_address: "rajolu",verifiedOn: "12-04-2021",photo_id: 27931,verifiedBy: "18pa1a1214@vishnu.edu.in",availability: "Not Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 37.912899800000002,longitude: 81.7399875,owner_id: 4682,owner_number:'1234567890',owner_name: "Sai",type:"Private Transport",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27932,verifiedBy: "18pa1a1215@vishnu.edu.in",availability: "Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 34.912899800000002,longitude: 78.7399875,owner_id: 4686,owner_number:'1234567890',owner_name: "Hari",type:"Private Transport",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27933,verifiedBy: "18pa1a1216@vishnu.edu.in",availability: "Not Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 33.912899800000002,longitude: 77.7399875,owner_id: 4684,owner_number:'1234567890',owner_name: "Richad",type:"Private Transport",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27934,verifiedBy: "18pa1a1217@vishnu.edu.in",availability: "Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 33.912899800000002,longitude: 76.7399875,owner_id: 4685,owner_number:'1234567890',owner_name: "babu",type:"Private Transport",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27935,verifiedBy: "18pa1a1219@vishnu.edu.in",availability: "Not Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		
    ])
    const [ambulance,setAmbulance] = useState([
        {height: 375,latitude: 45.912899800000002,longitude: 79.7399875,owner_id: 4780,owner_number:'1234567890',owner_name: "Madhu",type:"Ambulance",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27930,verifiedBy: "18pa1a1213@vishnu.edu.in",availability: "Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 46.912899800000002,longitude: 80.7399875,owner_id: 4781,owner_number:'1234567890',owner_name: "Abhinav",type:"Ambulance",owner_address: "rajolu",verifiedOn: "12-04-2021",photo_id: 27931,verifiedBy: "18pa1a1214@vishnu.edu.in",availability: "Not Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 47.912899800000002,longitude: 81.7399875,owner_id: 4782,owner_number:'1234567890',owner_name: "Sai",type:"Ambulance",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27932,verifiedBy: "18pa1a1215@vishnu.edu.in",availability: "Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 47.912899800000002,longitude: 78.7399875,owner_id: 4786,owner_number:'1234567890',owner_name: "Hari",type:"Ambulance",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27933,verifiedBy: "18pa1a1216@vishnu.edu.in",availability: "Not Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 43.912899800000002,longitude: 77.7399875,owner_id: 4784,owner_number:'1234567890',owner_name: "Richad",type:"Ambulance",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27934,verifiedBy: "18pa1a1217@vishnu.edu.in",availability: "Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 43.912899800000002,longitude: 76.7399875,owner_id: 4785,owner_number:'1234567890',owner_name: "babu",type:"Ambulance",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27935,verifiedBy: "18pa1a1219@vishnu.edu.in",availability: "Not Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
    ])
    const [plasma,setplasma] = useState([
        {height: 375,latitude: 55.912899800000002,longitude: 79.7399875,owner_id: 4880,owner_number:'1234567890',owner_name: "Madhu",type:"Plasma",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27930,verifiedBy: "18pa1a1213@vishnu.edu.in",availability: "Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 56.912899800000002,longitude: 80.7399875,owner_id: 4881,owner_number:'1234567890',owner_name: "Abhinav",type:"Plasma",owner_address: "rajolu",verifiedOn: "12-04-2021",photo_id: 27931,verifiedBy: "18pa1a1214@vishnu.edu.in",availability: "Not Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 57.912899800000002,longitude: 81.7399875,owner_id: 4882,owner_number:'1234567890',owner_name: "Sai",type:"Plasma",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27932,verifiedBy: "18pa1a1215@vishnu.edu.in",availability: "Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 54.912899800000002,longitude: 78.7399875,owner_id: 4886,owner_number:'1234567890',owner_name: "Hari",type:"Plasma",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27933,verifiedBy: "18pa1a1216@vishnu.edu.in",availability: "Not Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 53.912899800000002,longitude: 77.7399875,owner_id: 4884,owner_number:'1234567890',owner_name: "Richad",type:"Plasma",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27934,verifiedBy: "18pa1a1217@vishnu.edu.in",availability: "Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 53.912899800000002,longitude: 76.7399875,owner_id: 4885,owner_number:'1234567890',owner_name: "babu",type:"Plasma",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27935,verifiedBy: "18pa1a1219@vishnu.edu.in",availability: "Not Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
    ])
    const [vaccine,setVaccine] = useState([
        {height: 375,latitude: 65.912899800000002,longitude: 79.7399875,owner_id: 4980,owner_number:'1234567890',owner_name: "Madhu",type:"Vaccine",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27930,verifiedBy: "18pa1a1213@vishnu.edu.in",availability: "Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 66.912899800000002,longitude: 80.7399875,owner_id: 4981,owner_number:'1234567890',owner_name: "Abhinav",type:"Vaccine",owner_address: "rajolu",verifiedOn: "12-04-2021",photo_id: 27931,verifiedBy: "18pa1a1214@vishnu.edu.in",availability: "Not Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 67.912899800000002,longitude: 81.7399875,owner_id: 4982,owner_number:'1234567890',owner_name: "Sai",type:"Vaccine",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27932,verifiedBy: "18pa1a1215@vishnu.edu.in",availability: "Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 64.912899800000002,longitude: 78.7399875,owner_id: 4986,owner_number:'1234567890',owner_name: "Hari",type:"Vaccine",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27933,verifiedBy: "18pa1a1216@vishnu.edu.in",availability: "Not Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 63.912899800000002,longitude: 77.7399875,owner_id: 4984,owner_number:'1234567890',owner_name: "Richad",type:"Vaccine",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27934,verifiedBy: "18pa1a1217@vishnu.edu.in",availability: "Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 63.912899800000002,longitude: 76.7399875,owner_id: 4985,owner_number:'1234567890',owner_name: "babu",type:"Vaccine",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27935,verifiedBy: "18pa1a1219@vishnu.edu.in",availability: "Not Available",contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
    ])
	const location = useLocation();
    const [list,setList] = useState(location.state.finallist)
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const accordian = [
        {
            id:'panel1',panelName:'',panelControl:'panel1bh-content',panelColor:'blue',panelText1:'Oxygen Cylinders',
            panelText2:'Available',panelId:'panel1bh-header',panelIcon:'🔋'
        },
        {
            id:'panel2',panelName:'',panelControl:'panel2bh-content',panelColor:'brown',panelText1:'ICU Beds',
            panelText2:'Available',panelId:'panel2bh-header',panelIcon:'🛏️'
        },
        {
            id:'panel3',panelName:'',panelControl:'panel3bh-content',panelColor:'green',panelText1:'Ambulance',
            panelText2:'Available',panelId:'panel3bh-header',panelIcon:'🚑'
        },
        {
            id:'panel4',panelName:'',panelControl:'panel4bh-content',panelColor:'gold',panelText1:'Private Transport',
            panelText2:'Available',panelId:'panel4bh-header',panelIcon:'🚖'
        },
        {
            id:'panel5',panelName:'',panelControl:'panel5bh-content',panelColor:'green',panelText1:'Vaccine',
            panelText2:'Available',panelId:'panel5bh-header',panelIcon:'💉',
        },
        {
            id:'panel6',panelName:'',panelControl:'panel6bh-content',panelColor:'red',panelText1:'Plasma',
            panelText2:'Available',panelId:'panel6bh-header',panelIcon:'🩸'
        },
    ]
    const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(23),
        flexBasis: '73%',
        flexShrink: 0,
        color: theme.palette.text.primary,
    }
}));
    const classes = useStyles();
    const [show,setShow] = useState(false);
    const [generate,setGenerate] = useState('Generate');
    const [code,setCode] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [twitter,setTwitter] = useState(false);
    const [openCylinder,setCylinder] = useState(false);
    const [openBeds,setBeds] = useState(false);
    const [show1,setShow1] = useState(false);
    const [volunteers,setVolunteers] = useState([
		{height: 375,latitude: 14.99299800000002,longitude: 79.7399875,verifications: 34,owner_id:1213,owner_number:'1234567890',owner_name: "Madhu",type:"volunteer",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27930,email: "18pa1a1213@vishnu.edu.in",status: "Active",width: 500},
	])
    const [all,setAll] = useState([]);
    const handleBody = (l) =>{
        return(
            <div>
                {l === 'Oxygen Cylinders' ? setAll(oxygens) : 
                l === 'ICU Beds' ? setAll(ICUBeds) : 
                l === 'Ambulance' ? setAll(ambulance) :
                l === 'Private Transport' ? setAll(privateTransport) :
                l === 'Vaccine' ? setAll(vaccine) :
                l === 'Plasma' ? setAll(plasma) :
                ''}
            </div>
        )
    }
    return (
        <div>
            <nav className="glass">
                <div> 
                    <Modal show={show1}>
                        <ModalBody>
                            <Map  location={location} volunteers={volunteers}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={()=>{setShow1(false)}}>Close</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal size="sm" show={show} >
                        <ModalHeader closeButton onClick={()=>{setShow(false);setGenerate('Generate');setPhoneNumber("");setCode("")}}>
                            <ModalTitle>Verification</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            {generate === "Generate" ? (
                                    <div>
                                        <Input placeholder="10-digit-phone-number" type="number" value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)}/>{' '}
                                        <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>} onClick={()=>{phoneNumber.length === 10 ? setGenerate('Submit') : alert('10-digit-phone-number')}}>
                                            {generate}
                                        </Button>
                                    </div>
                                ) : (
                                    <div>
                                        <Input placeholder="6-digit-code" id="6digitcode" value={code} onChange={event => setCode(event.target.value)}/>{' '}
                                        <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>} onClick={()=>{code.length === 6 ? setShow(false) : alert("Invalid Verification Code");}}>
                                            {generate}
                                        </Button>
                                    </div>
                                )}	
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={()=>{setShow(false);setGenerate('Generate');setPhoneNumber("");setCode("")}}>Close</Button>{' '}
                        </ModalFooter>
                    </Modal>
                </div>
                <div>
                    <Modal size="sm" show={twitter} >
                        <ModalHeader closeButton onClick={()=>{setTwitter(false)}}>
                            <ModalTitle>Tweets</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <List>
                                <ListItem button onClick={()=>{setCylinder(!openCylinder)}}>
                                    <ListItemIcon>
                                        {!openCylinder ? <ExpandMore color="action" /> : <Twitter color="primary"/>}
                                    </ListItemIcon>
                                    <ListItemText primary="O2 Cylinder" />
                                    {openCylinder ? (<div>01-05-2021</div>) : (<div>01-05-2021</div>)}
                                </ListItem>
                                <Collapse in={openCylinder} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                    <ListItem >
                                        <ListItemText primary="Details" />
                                    </ListItem>
                                    </List>
                                </Collapse>
                                <ListItem button onClick={()=>{setBeds(!openBeds)}}>
                                    <ListItemIcon>
                                        {!openBeds ? <ExpandMore color="action"/> : <Twitter color="primary"/>}
                                    </ListItemIcon>
                                    <ListItemText primary="ICU Beds" />
                                    {openBeds ? (<div>21-02-2021</div>) : (<div>21-02-2021</div>)}
                                </ListItem>
                                <Collapse in={openBeds} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                    <ListItem  >
                                        <ListItemText primary="Details" />
                                    </ListItem>
                                    </List>
                                </Collapse>
                            </List>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={()=>{setTwitter(false)}}>Close</Button>{' '}
                        </ModalFooter>
                    </Modal>
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/>
                    <div className="trail"> 
                    <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>} onClick={()=>{setShow(true)}}>Send Request</Button>{' '}
                    <Button variant="contained" color="primary" endIcon={<LocationOnIcon />} onClick={()=>{setShow1(true)}}>Show On Maps</Button>
                        {accordian.map((m,key)=>{
                                return(
                                    <div>
                                        {list.map((l,key)=>{
                                            return(
                                                <div>
                                                    {l === m.panelText1 ? (<div>
                                                        <Accordion expanded={expanded === m.id} onChange={handleChange(m.id)}  className="patientable accordian" onClick={()=>{handleBody(l)}}>
                                                            <AccordionSummary expandIcon={m.panelIcon} aria-controls={m.panelControl} id={m.panelId}>
                                                                <Typography className={classes.heading}>{m.panelText1}</Typography>
                                                                <Typography>{m.panelText2} </Typography>
                                                            </AccordionSummary>
                                                                <AccordionDetails >
                                                                    <TableContainer >
                                                                            <Table aria-labelledby="tableTitle" size='small' aria-label="enhanced table">
                                                                                <TableHead>
                                                                                    <TableCell>Select</TableCell>
                                                                                    <TableCell>Availability</TableCell>
                                                                                    <TableCell>ID</TableCell>
                                                                                    <TableCell>UserName</TableCell>
                                                                                    <TableCell>UploadDate</TableCell>
                                                                                    <TableCell>VerifiedOn</TableCell>
                                                                                    <TableCell>VerifiedBy</TableCell>
                                                                                    <TableCell>Price</TableCell>
                                                                                    <TableCell>Address</TableCell>
                                                                                    <TableCell>ContactNumber</TableCell>
                                                                                </TableHead>
                                                                                <TableBody >
                                                                                        {all.map((o,key=o.id)=>{
                                                                                            return(
                                                                                                <TableRow hover role="checkbox">
                                                                                                    <TableCell padding="checkbox">
                                                                                                        <Checkbox />
                                                                                                    </TableCell>
                                                                                                    <TableCell align="right">{o.availability}</TableCell>
                                                                                                    <TableCell scope="row" padding="none">{o.owner_id}</TableCell>
                                                                                                    <TableCell align="right">{o.owner_name}</TableCell>
                                                                                                    <TableCell align="right">{o.upload_date}</TableCell>
                                                                                                    <TableCell align="right">{o.verifiedOn}</TableCell>
                                                                                                    <TableCell align="right">{o.verifiedBy}</TableCell>
                                                                                                    <TableCell align="right">{o.price}</TableCell>
                                                                                                    <TableCell align="right">{o.owner_address}</TableCell>
                                                                                                    <TableCell align="right">{o.contactNumber}</TableCell>
                                                                                                </TableRow>
                                                                                            )
                                                                                        })}
                                                                                </TableBody>
                                                                            </Table>
                                                                        </TableContainer>
                                                                </AccordionDetails>
                                                        </Accordion>
                                                    </div>) : ''}
                                                </div>
                                            )
                                        })}
                                    </div>
                    )
                        })}
                    <NavLink to="/"><Button variant="contained" color="primary">HOME</Button></NavLink><br/><br/>
                    <Button  variant="contained" color="primary" onClick={()=>{setTwitter(true)}}>Show From Twitter</Button>
                    </div>
            </nav>
        </div>
    )
}

export default PatientAvailability
