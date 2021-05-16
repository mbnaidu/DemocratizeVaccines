import { Accordion, AccordionDetails, AccordionSummary, Button, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useLocation } from 'react-router';
import VolunteerMap from '../Maps/VolunteerMap';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { NavLink } from 'react-router-dom';



    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '15.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
        },
    }));
function VolunteerAvailability() {
    const location = useLocation();
    const [type,setType] = useState(location.state.type);
    const [range,setRange] = useState(location.state.range);
    const [volunteerOption,setVolunteerOption] = useState(location.state.finallist);
    // DATA FROM BACKEND
        // VOLUNTEERS
        const [volunteers,setVolunteers] = useState([
            {height: 375,latitude: 14.99299800000002,longitude: 79.7399875,verifications: 34,owner_id:1213,owner_number:'1234567890',owner_name: "Madhu",type:"volunteer",owner_address: "bhimavaram",verifiedOn: "12-04-2021",email: "18pa1a1213@vishnu.edu.in",status: "Active",width: 500},
            {height: 375,latitude: 15.99299800000002,longitude: 79.7399875,verifications: 34,owner_id:1214,owner_number:'1234567890',owner_name: "Madhu",type:"volunteer",owner_address: "bhimavaram",verifiedOn: "12-04-2021",email: "18pa1a1213@vishnu.edu.in",status: "Active",width: 500},
            {height: 375,latitude: 16.99299800000002,longitude: 79.7399875,verifications: 34,owner_id:1215,owner_number:'1234567890',owner_name: "Madhu",type:"volunteer",owner_address: "bhimavaram",verifiedOn: "12-04-2021",email: "18pa1a1213@vishnu.edu.in",status: "Active",width: 500},
            {height: 375,latitude: 17.99299800000002,longitude: 79.7399875,verifications: 34,owner_id:1216,owner_number:'1234567890',owner_name: "Madhu",type:"volunteer",owner_address: "bhimavaram",verifiedOn: "12-04-2021",email: "18pa1a1213@vishnu.edu.in",status: "Active",width: 500},
            {height: 375,latitude: 18.99299800000002,longitude: 79.7399875,verifications: 34,owner_id:1217,owner_number:'1234567890',owner_name: "Madhu",type:"volunteer",owner_address: "bhimavaram",verifiedOn: "12-04-2021",email: "18pa1a1213@vishnu.edu.in",status: "Active",width: 500},
        ])
        // VERIFIED PROFILES
            const [verified,setVerified] = useState([
                {height: 375,latitude: 13.912899800000002,longitude: 79.7399875,owner_id: 4480,owner_number:'1234567890',owner_name: "Madhu",type:"Oxygen Cylinders",owner_address: "bhimavaram",Verifications: ["18pa1a1213@vishnu.edu.in - 12-04-2021 ","madhucharliehash@gmail.com - 02-03-2022"],upload_date: "25 June 2006",contactNumber:'12344',width: 500},
                {height: 375,latitude: 25.912899800000002,longitude: 79.7399875,owner_id: 4580,owner_number:'1234567890',owner_name: "Madhu",type:"ICU Beds",owner_address: "bhimavaram",Verifications: ["18pa1a1213@vishnu.edu.in - 12-04-2021","18pa11222@gmail.com - 02-03-2022"],upload_date: "25 June 2006",contactNumber:'12344',width: 500},
                {height: 375,latitude: 35.912899800000002,longitude: 79.7399875,owner_id: 4680,owner_number:'1234567890',owner_name: "Madhu",type:"Private Transport",owner_address: "bhimavaram",Verifications: ["18pa1a1213@vishnu.edu.in - 12-04-2021","madhucharliehash@gmail.com - 02-03-2022"],contactNumber:'12344',upload_date: "25 June 2006",width: 500},
                {height: 375,latitude: 45.912899800000002,longitude: 79.7399875,owner_id: 4780,owner_number:'1234567890',owner_name: "Madhu",type:"Ambulance",owner_address: "bhimavaram",Verifications: ["18pa1a1213@vishnu.edu.in - 12-04-2021","madhucharliehash@gmail.com - 02-03-2022"],contactNumber:'12344',upload_date: "25 June 2006",width: 500},
                {height: 375,latitude: 55.912899800000002,longitude: 79.7399875,owner_id: 4880,owner_number:'1234567890',owner_name: "Madhu",type:"Plasma",owner_address: "bhimavaram",Verifications: ["18pa1a1213@vishnu.edu.in - 12-04-2021","madhucharliehash@gmail.com - 02-03-2022"],contactNumber:'12344',upload_date: "25 June 2006",width: 500},
                {height: 375,latitude: 65.912899800000002,longitude: 79.7399875,owner_id: 4980,owner_number:'1234567890',owner_name: "Madhu",type:"Vaccine",owner_address: "bhimavaram",Verifications: ["18pa1a121318pa1a1213@vishnu.edu.in - 12-04-2021","madhucharliehashnaidugaru@gmail.com - 02-03-2022"],contactNumber:'12344',upload_date: "25 June 2006",width: 500},
            ])
        // PATIENT AND DONORS
            const [patientDetails,setPatientDetails] = useState([
                {height: 375,latitude: 26.912899800000002,longitude: 80.7399875,owner_id: 4581,owner_number:'1234567890',owner_name: "Abhinav",type:"ICU Beds",owner_address: "rajolu",upload_date: "25 June 2006",donors:[{height: 375,latitude: 13.912899800000002,longitude: 79.7399875,owner_id: 4480,owner_number:'1234567890',owner_name: "Madhu",type:"Oxygen Cylinders",owner_address: "bhimavaram",verifiedOn: "12-04-2021",verifiedBy: "18pa1a1213@vishnu.edu.in",upload_date: "25 June 2006",contactNumber:'12344',width: 500},],width: 500},
                {height: 375,latitude: 13.912899800000002,longitude: 79.7399875,owner_id: 4480,owner_number:'1234567890',owner_name: "Madhu",type:"Oxygen Cylinders",owner_address: "bhimavaram",upload_date: "25 June 2006",donors:[{height: 375,latitude: 25.912899800000002,longitude: 79.7399875,owner_id: 4580,owner_number:'1234567890',owner_name: "Madhu",type:"ICU Beds",owner_address: "bhimavaram",verifiedOn: "12-04-2021",verifiedBy: "18pa1a1213@vishnu.edu.in",upload_date: "25 June 2006",contactNumber:'12344',width: 500},],width: 500},
                {height: 375,latitude: 36.912899800000002,longitude: 80.7399875,owner_id: 4681,owner_number:'1234567890',owner_name: "Abhinav",type:"Private Transport",owner_address: "rajolu",upload_date: "25 June 2006",donors:[{height: 375,latitude: 35.912899800000002,longitude: 79.7399875,owner_id: 4680,owner_number:'1234567890',owner_name: "Madhu",type:"Private Transport",owner_address: "bhimavaram",verifiedOn: "12-04-2021",verifiedBy: "18pa1a1213@vishnu.edu.in",contactNumber:'12344',upload_date: "25 June 2006",width: 500},],width: 500},
                {height: 375,latitude: 47.912899800000002,longitude: 81.7399875,owner_id: 4782,owner_number:'1234567890',owner_name: "Sai",type:"Ambulance",owner_address: "bhimavaram",upload_date: "25 June 2006",donors:[{height: 375,latitude: 45.912899800000002,longitude: 79.7399875,owner_id: 4780,owner_number:'1234567890',owner_name: "Madhu",type:"Ambulance",owner_address: "bhimavaram",verifiedOn: "12-04-2021",verifiedBy: "18pa1a1213@vishnu.edu.in",contactNumber:'12344',upload_date: "25 June 2006",width: 500},{height: 375,latitude: 55.912899800000002,longitude: 79.7399875,owner_id: 4880,owner_number:'1234567890',owner_name: "Madhu",type:"Plasma",owner_address: "bhimavaram",verifiedOn: "12-04-2021",verifiedBy: "18pa1a1213@vishnu.edu.in",contactNumber:'12344',upload_date: "25 June 2006",width: 500},],width: 500},
                {height: 375,latitude: 65.912899800000002,longitude: 79.7399875,owner_id: 4980,owner_number:'1234567890',owner_name: "Madhu",type:"Vaccine",owner_address: "bhimavaram",upload_date: "25 June 2006",donors:[{height: 375,latitude: 65.912899800000002,longitude: 79.7399875,owner_id: 4980,owner_number:'1234567890',owner_name: "Madhu",type:"Vaccine",owner_address: "bhimavaram",verifiedOn: "12-04-2021",verifiedBy: "18pa1a1213@vishnu.edu.in",contactNumber:'12344',upload_date: "25 June 2006",width: 500},],width: 500},
            ]);
    // Accordion
        const classes = useStyles();
        const [expanded, setExpanded] = React.useState(false);
        const handleChange = (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };
        const [showMap,setShowMap] = useState(false); 
        const [showVerifiedMap,setShowVerifiedMap] = useState(false); 
        const [details,setDetails] = useState([]);
        const [lat,setLat] = useState('');
        const [lng,setLng] = useState('');
        const [types,setTypes] = useState('');
    return (
        <div>
            <nav className="glass">
                {
                    type === 'patient' ? (<div>
                        {volunteerOption === 'volunteers' ? (<div>
                            {showMap ? (<div>
                                <VolunteerMap details={details} lat={parseFloat(lat)} lng={parseFloat(lng)} volunteers={volunteers} types={types}/>
                                <Button color="secondary" variant="outlined" onClick={()=>{setShowMap(false)}}>Go Back</Button>
                            </div>) : (<div>
                                <Button color="primary" variant="contained" onClick={()=>{setShowVerifiedMap(true);setDetails(patientDetails);setTypes('showall')}}>SHOW ALL</Button>
                                {patientDetails.map((p)=>{
                                return(
                                    <div>
                                        <Accordion expanded={expanded === p.owner_id} onChange={handleChange(p.owner_id)}  className="patientable accordian" >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                                >
                                                <Typography className={classes.heading}>{p.owner_id}</Typography>
                                                <Typography className={classes.secondaryHeading}>{p.type}</Typography>
                                                <Typography className={classes.secondaryHeading}>{p.upload_date}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails >
                                                <TableContainer >
                                                        <Table aria-labelledby="tableTitle" size='large' aria-label="enhanced table">
                                                            <TableHead>
                                                                <TableCell>OnMap</TableCell>
                                                                <TableCell>OwnerId</TableCell>
                                                                <TableCell>OwnerName</TableCell>
                                                                <TableCell>Type</TableCell>
                                                                <TableCell>UploadDate</TableCell>
                                                                <TableCell>VerifiedOn</TableCell>
                                                                <TableCell>VerifiedBy</TableCell>
                                                                <TableCell>Address</TableCell>
                                                                <TableCell>Contact</TableCell>
                                                            </TableHead>
                                                            <TableBody >
                                                                    {p.donors.map((o,key=o.id)=>{
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell>
                                                                                    <Button size="large" color="secondary" variant="contained" onClick={()=>{setShowMap(true);setDetails(p);setLat(p.latitude);setLng(p.longitude);setTypes('patient')}}>
                                                                                        Map
                                                                                    </Button>
                                                                                </TableCell>
                                                                                <TableCell padding="checkbox">
                                                                                    {o.owner_id}
                                                                                </TableCell>
                                                                                <TableCell align="right">{o.owner_name}</TableCell>
                                                                                <TableCell scope="row" padding="none">{o.type}</TableCell>
                                                                                <TableCell align="right">{o.upload_date}</TableCell>
                                                                                <TableCell align="right">{o.verifiedOn}</TableCell>
                                                                                <TableCell align="right">{o.verifiedBy}</TableCell>
                                                                                <TableCell align="right">{o.owner_address}</TableCell>
                                                                                <TableCell align="right">{o.owner_number}</TableCell>
                                                                            </TableRow>     
                                                                        )
                                                                    })}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                            </AccordionDetails>
                                    </Accordion>
                                    </div>
                                )
                            })}
                            </div>)}
                        </div>) : (<div>
                            {showMap ? (<div>
                                <VolunteerMap details={details} lat={parseFloat(lat)} lng={parseFloat(lng)} types={types}/>
                                <Button color="secondary" variant="outlined" onClick={()=>{setShowMap(false)}}>Go Back</Button>
                            </div>) : (<div>
                                <Button color="primary" variant="contained" onClick={()=>{setShowVerifiedMap(true);setDetails(patientDetails);setTypes('showall')}}>SHOW ALL</Button>
                                {patientDetails.map((p)=>{
                                return(
                                    <div>
                                        <Accordion expanded={expanded === p.owner_id} onChange={handleChange(p.owner_id)}  className="patientable accordian" >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                                >
                                                <Typography className={classes.heading}>{p.owner_id}</Typography>
                                                <Typography className={classes.secondaryHeading}>{p.type}</Typography>
                                                <Typography className={classes.secondaryHeading}>{p.upload_date}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails >
                                                <TableContainer >
                                                        <Table aria-labelledby="tableTitle" size='large' aria-label="enhanced table">
                                                            <TableHead>
                                                                <TableCell>OnMap</TableCell>
                                                                <TableCell>OwnerId</TableCell>
                                                                <TableCell>OwnerName</TableCell>
                                                                <TableCell>Type</TableCell>
                                                                <TableCell>UploadDate</TableCell>
                                                                <TableCell>VerifiedOn</TableCell>
                                                                <TableCell>VerifiedBy</TableCell>
                                                                <TableCell>Address</TableCell>
                                                                <TableCell>Contact</TableCell>
                                                            </TableHead>
                                                            <TableBody >
                                                                    {p.donors.map((o,key=o.id)=>{
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell>
                                                                                    <Button size="large" color="secondary" variant="contained" onClick={()=>{setShowMap(true);setDetails(p);setLat(p.latitude);setLng(p.longitude);setTypes('patient')}}>
                                                                                        Map
                                                                                    </Button>
                                                                                </TableCell>
                                                                                <TableCell padding="checkbox">
                                                                                    {o.owner_id}
                                                                                </TableCell>
                                                                                <TableCell align="right">{o.owner_name}</TableCell>
                                                                                <TableCell scope="row" padding="none">{o.type}</TableCell>
                                                                                <TableCell align="right">{o.upload_date}</TableCell>
                                                                                <TableCell align="right">{o.verifiedOn}</TableCell>
                                                                                <TableCell align="right">{o.verifiedBy}</TableCell>
                                                                                <TableCell align="right">{o.owner_address}</TableCell>
                                                                                <TableCell align="right">{o.owner_number}</TableCell>
                                                                            </TableRow>     
                                                                        )
                                                                    })}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                            </AccordionDetails>
                                    </Accordion>
                                    </div>
                                )
                            })}
                            </div>)}
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
                            {showVerifiedMap ? (<div>
                                <VolunteerMap details={details} lat={parseFloat(lat)} lng={parseFloat(lng)} types={types} volunteers={volunteers}/>
                                <Button color="primary" variant="contained" onClick={()=>{setShowVerifiedMap(false)}}>Go Back</Button>
                            </div>) : (<div>
                                <Button color="primary" variant="contained" onClick={()=>{setShowVerifiedMap(true);setDetails(verified);setTypes('showall')}}>SHOW ALL</Button>
                                {verified.map((p)=>{
                                return(
                                    <div key={p.owner_id}>
                                        <Accordion expanded={expanded === p.owner_id} onChange={handleChange(p.owner_id)}  className="patientable accordian" >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                                >
                                                <Typography className={classes.heading}>{p.owner_id}</Typography>
                                                <Typography className={classes.secondaryHeading}>{p.type}</Typography>
                                                <Typography className={classes.secondaryHeading}>{p.upload_date}</Typography>
                                                </AccordionSummary>
                                            <AccordionDetails >
                                                <TableContainer >
                                                        <Table aria-labelledby="tableTitle" size='large' aria-label="enhanced table">
                                                            <TableHead>
                                                                <TableCell>OnMap</TableCell>
                                                                <TableCell>OwnerId</TableCell>
                                                                <TableCell>OwnerName</TableCell>
                                                                <TableCell>Type</TableCell>
                                                                <TableCell>UploadDate</TableCell>
                                                                <TableCell>Verifications</TableCell>
                                                                <TableCell>Address</TableCell>
                                                                <TableCell>Contact</TableCell>
                                                                <TableCell>Verified</TableCell>
                                                            </TableHead>
                                                            <TableBody >
                                                                <TableRow hover role="checkbox">
                                                                    <TableCell>
                                                                        <Button size="large" color="secondary" variant="contained" onClick={()=>{setShowVerifiedMap(true);setDetails(p);setLat(p.latitude);setLng(p.longitude);setTypes('verified')}}>
                                                                        Show
                                                                    </Button>
                                                                    </TableCell>
                                                                    <TableCell padding="checkbox">{p.owner_id}</TableCell>
                                                                    <TableCell align="right">{p.owner_name}</TableCell>
                                                                    <TableCell scope="row" padding="none">{p.type}</TableCell>
                                                                    <TableCell align="right">{p.upload_date}</TableCell>
                                                                    <TableCell align="right">
                                                                        {p.Verifications.map((v)=>{
                                                                            return(
                                                                                <div>
                                                                                    {v}
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </TableCell>
                                                                    <TableCell align="right">{p.owner_address}</TableCell>
                                                                    <TableCell align="right">{p.owner_number}</TableCell>
                                                                    <TableCell><Button color="primary" variant="outlined" onClick={()=>{p.Verifications.push('abhinav@gmail.com - 16-05-2020');alert('Verified Please Check On MAP')}}>Verify</Button></TableCell>
                                                                </TableRow>     
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                            </AccordionDetails>
                                    </Accordion>
                                    </div>
                                )
                            })}
                            </div>)}
                        </div>) : (<div>
                            {showVerifiedMap ? (<div>
                                <VolunteerMap details={details} lat={parseFloat(lat)} lng={parseFloat(lng)} types={types}/>
                                <Button color="primary" variant="contained" onClick={()=>{setShowVerifiedMap(false)}}>Go Back</Button>
                            </div>) : (<div>
                                <Button color="primary" variant="contained" onClick={()=>{setShowVerifiedMap(true);setDetails(verified);setTypes('showall')}}>SHOW ALL</Button>
                                {verified.map((p)=>{
                                return(
                                    <div key={p.owner_id}>
                                        <Accordion expanded={expanded === p.owner_id} onChange={handleChange(p.owner_id)}  className="patientable accordian" >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                                >
                                                <Typography className={classes.heading}>{p.owner_id}</Typography>
                                                <Typography className={classes.secondaryHeading}>{p.type}</Typography>
                                                <Typography className={classes.secondaryHeading}>{p.upload_date}</Typography>
                                                </AccordionSummary>
                                            <AccordionDetails >
                                                <TableContainer >
                                                        <Table aria-labelledby="tableTitle" size='large' aria-label="enhanced table">
                                                            <TableHead>
                                                                <TableCell>OnMap</TableCell>
                                                                <TableCell>OwnerId</TableCell>
                                                                <TableCell>OwnerName</TableCell>
                                                                <TableCell>Type</TableCell>
                                                                <TableCell>UploadDate</TableCell>
                                                                <TableCell>Verifications</TableCell>
                                                                <TableCell>Address</TableCell>
                                                                <TableCell>Contact</TableCell>
                                                                <TableCell>Verified</TableCell>
                                                            </TableHead>
                                                            <TableBody >
                                                                <TableRow hover role="checkbox">
                                                                    <TableCell>
                                                                        <Button size="large" color="secondary" variant="contained" onClick={()=>{setShowVerifiedMap(true);setDetails(p);setLat(p.latitude);setLng(p.longitude);setTypes('verified')}}>
                                                                        Show
                                                                    </Button>
                                                                    </TableCell>
                                                                    <TableCell padding="checkbox">{p.owner_id}</TableCell>
                                                                    <TableCell align="right">{p.owner_name}</TableCell>
                                                                    <TableCell scope="row" padding="none">{p.type}</TableCell>
                                                                    <TableCell align="right">{p.upload_date}</TableCell>
                                                                    <TableCell align="right">
                                                                        {p.Verifications.map((v)=>{
                                                                            return(
                                                                                <div>
                                                                                    {v}
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </TableCell>
                                                                    <TableCell align="right">{p.owner_address}</TableCell>
                                                                    <TableCell align="right">{p.owner_number}</TableCell>
                                                                    <TableCell><Button color="primary" variant="outlined" onClick={()=>{p.Verifications.push('abhinav@gmail.com - 16-05-2020');alert('Verified Please Check On MAP')}}>Verify</Button></TableCell>
                                                                </TableRow>     
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                            </AccordionDetails>
                                    </Accordion>
                                    </div>
                                )
                            })}
                            </div>)}
                        </div>)}
                    </div>) : 
                    volunteerOption === 'volunteers' ? (<div>
                        <VolunteerMap details={details} lat={parseFloat(lat)} lng={parseFloat(lng)} volunteers={volunteers} types={types}/>
                    </div>) :
                (<div></div>)}
                <NavLink to="/volunteer-requirements"><Button color="primary" variant="contained">Go Back</Button></NavLink>
            </nav>
        </div>
    )
}

export default VolunteerAvailability
