import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, Icon, Input, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core'
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../Styles/Patient.css';
import { ModalBody, ModalFooter, ModalTitle, Modal} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';


function PatientAvailability() {
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const accordian = [
        {
            id:'panel1',panelName:'',panelControl:'panel1bh-content',panelColor:'blue',panelText1:'Oxygen Cylinders',
            panelText2:'Available',panelId:'panel1bh-header',panelIcon:'🔋',panelData : [
                {
                    Id:'madhu1213',Quantity:1,Liters:12,Price:13,Address:'1st street,Gunipudi'
                },
                {
                    Id:'abhinav1211',Quantity:2,Liters:122,Price:121,Address:'2nd street,Gunipudi'
                },
                {
                    Id:'sai1222',Quantity:3,Liters:112,Price:213,Address:'3rd street,Gunipudi'
                },
                {
                    Id:'dinesh34',Quantity:4,Liters:212,Price:113,Address:'4th street,Gunipudi'
                },
                {
                    Id:'shivam11',Quantity:5,Liters:2,Price:123,Address:'5th street,Gunipudi'
                },
            ]
        },
        {
            id:'panel2',panelName:'',panelControl:'panel2bh-content',panelColor:'brown',panelText1:'ICU Beds',
            panelText2:'Available',panelId:'panel2bh-header',panelIcon:'🛏️',panelData : [
                {
                    Id:'abhinav1211',Quantity:2,Liters:122,Price:121,Address:'2nd street,Gunipudi'
                },
                {
                    Id:'sai1222',Quantity:3,Liters:112,Price:213,Address:'3rd street,Gunipudi'
                },
            ]
        },
        {
            id:'panel3',panelName:'',panelControl:'panel3bh-content',panelColor:'green',panelText1:'Ambulance',
            panelText2:'Available',panelId:'panel3bh-header',panelIcon:'🚑',panelData : [
                {
                    Id:'madhu1213',Quantity:1,Liters:1212,Price:1213,Address:'Ravuri vari street,Gunipudi'
                },
            ]
        },
        {
            id:'panel4',panelName:'',panelControl:'panel4bh-content',panelColor:'gold',panelText1:'Private Transport',
            panelText2:'Available',panelId:'panel4bh-header',panelIcon:'🚖',panelData : [
                {
                    Id:'madhu1213',Quantity:1,Liters:1212,Price:1213,Address:'Ravuri vari street,Gunipudi'
                },
                {
                    Id:'abhinav1211',Quantity:2,Liters:122,Price:121,Address:'2nd street,Gunipudi'
                },
            ]
        },
        {
            id:'panel5',panelName:'',panelControl:'panel5bh-content',panelColor:'green',panelText1:'Vaccine',
            panelText2:'Available',panelId:'panel5bh-header',panelIcon:'💉',panelData : [
                {
                    Id:'madhu1213',Quantity:1,Liters:1212,Price:1213,Address:'Ravuri vari street,Gunipudi'
                },
                {
                    Id:'abhinav1211',Quantity:2,Liters:122,Price:121,Address:'2nd street,Gunipudi'
                },
                {
                    Id:'sai1222',Quantity:3,Liters:112,Price:213,Address:'3rd street,Gunipudi'
                },
            ]
        },
        {
            id:'panel6',panelName:'',panelControl:'panel6bh-content',panelColor:'red',panelText1:'Plasma',
            panelText2:'Available',panelId:'panel6bh-header',panelIcon:'🩸',panelData : [
                {
                    Id:'madhu1213',Quantity:1,Liters:1212,Price:1213,Address:'Ravuri vari street,Gunipudi'
                },
                {
                    Id:'abhinav1211',Quantity:2,Liters:122,Price:121,Address:'2nd street,Gunipudi'
                },
                {
                    Id:'dinesh34',Quantity:4,Liters:212,Price:113,Address:'4th street,Gunipudi'
                },
                {
                    Id:'shivam11',Quantity:5,Liters:2,Price:123,Address:'5th street,Gunipudi'
                },
            ]
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
        const [finalList,setFinalList] = useState([])
        const handleInput = (key,value, index) => {
        var key1 = {};
        
        switch(key) {
            case 'Oxygen Cylinders':
                key1.OxygenCylinders = value;
                break;
            case 'ICU Beds':
                key1.aadharNumber = value;
                break;
            case 'Ambulance':
                key1.gender = value;
                break;
            case 'Private Transport':
                key1.age = value;
                break;
            case 'Vaccine':
                key1.age1 = value;
                break;
            case 'Address':
                key1.age2 = value;
                break;
            default:
                break;
        }
            let s = "";
                s += key;
                s += " : "
                s += value;
                let e = finalList.indexOf(s)
                if(e > -1){
                    finalList.splice(e, 1);
                }
                else{
                    finalList.push(s)
                }
    }
    const classes = useStyles();
    const [show,setShow] = useState(false);
    const [generate,setGenerate] = useState('Generate');
    const [code,setCode] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    return (
        <div>
            <nav className="glass">
                <div>
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
                <br/><br/><br/><br/><br/><br/><br/><br/>
                    <div className="trail"> 
                    <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>} onClick={()=>{setShow(true)}}>Send Request</Button>
                        {accordian.map((m)=>{
                    return(
                        <div>
                            <Accordion expanded={expanded === m.id} onChange={handleChange(m.id)}  className="patientable accordian">
                                <AccordionSummary expandIcon={m.panelIcon} aria-controls={m.panelControl} id={m.panelId}>
                                    <Typography className={classes.heading}>{m.panelText1}</Typography>
                                    <Typography>{m.panelText2} </Typography>
                                </AccordionSummary>
                                    <AccordionDetails >
                                        <TableContainer >
                                                <Table aria-labelledby="tableTitle" size='small' aria-label="enhanced table">
                                                    <TableHead>
                                                        <TableCell>Select</TableCell>
                                                        <TableCell>UserName</TableCell>
                                                        <TableCell>Quantity</TableCell>
                                                        <TableCell>Liters</TableCell>
                                                        <TableCell>Price</TableCell>
                                                        <TableCell>Address</TableCell>
                                                    </TableHead>
                                                    <TableBody >
                                                        {m.panelData.map((p, index)=>{
                                                            return(
                                                                    <TableRow hover role="checkbox">
                                                                        <TableCell padding="checkbox">
                                                                            <Checkbox aria-label="ji"  onChange={()=>{handleInput(p.Id,m.panelText1,index)}}/>
                                                                        </TableCell>
                                                                        <TableCell component="th" scope="row" padding="none">{p.Id}</TableCell>
                                                                        <TableCell align="right">{p.Quantity}</TableCell>
                                                                        <TableCell align="right">{p.Liters}</TableCell>
                                                                        <TableCell align="right">{p.Price}</TableCell>
                                                                        <TableCell align="right">{p.Address}</TableCell>
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
                    <NavLink to="/"><Button variant="contained" color="primary">HOME</Button></NavLink><br/><br/>
                    <Button  variant="contained" color="primary" onClick={()=>{console.log(phoneNumber,code,finalList)}}>Show From Twitter</Button>
                    </div>
            </nav>
        </div>
    )
}

export default PatientAvailability
