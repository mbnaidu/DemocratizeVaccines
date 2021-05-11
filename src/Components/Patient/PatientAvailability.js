import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, Collapse, Icon, Input, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../../Styles/Patient.css';
import { ModalBody, ModalFooter, ModalTitle, Modal} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { ExpandLess, ExpandMore, Twitter } from '@material-ui/icons';
import axios from 'axios';


function PatientAvailability() {
    const [expanded, setExpanded] = React.useState(false);
    const [oxygens,setOxygens] = useState([])
	const location = useLocation();
    var State = location.state.State;
    var District = location.state.District;
    var Mandal = location.state.Mandal;
    
    const [list,setList] = useState(location.state.finallist)
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    useEffect(() => {
        axios.post('http://localhost:3010/getalloxygencylinders').then(
            function(res) {
                if(res.data.msg) {
                    alert(res.data.msg);
                } else {
                    {res.data.map((m)=>{
                        if(m.Mandal === Mandal){
                            oxygens.push(m);
                        }
                    })}
                }
            }
        )
    },[])
    // console.log(oxygens)
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
    const [twitter,setTwitter] = useState(false);
    const [openCylinder,setCylinder] = useState(false);
    const [openBeds,setBeds] = useState(false);
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
                    <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>} onClick={()=>{setShow(true)}}>Send Request</Button>
                        {accordian.map((m,key)=>{
                                return(
                                    <div>
                                        {list.map((l)=>{
                                            return(
                                                <div>
                                                    {l === m.panelText1 ? (<div>
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
                                                                                    <TableCell>Price</TableCell>
                                                                                    <TableCell>Address</TableCell>
                                                                                </TableHead>
                                                                                <TableBody >
                                                                                        {oxygens.map((o,index)=>{
                                                                                            return(
                                                                                                <TableRow hover role="checkbox">
                                                                                                    <TableCell padding="checkbox">
                                                                                                        {/* <Checkbox aria-label="ji"  onChange={()=>{handleInput(p.Id,m.panelText1,index)}}/> */}
                                                                                                        <Checkbox />
                                                                                                    </TableCell>
                                                                                                    <TableCell component="th" scope="row" padding="none">{o.Username}</TableCell>
                                                                                                    <TableCell align="right">{o.OxygenQuantity}</TableCell>
                                                                                                    <TableCell align="right">{o.OxygenPrice}</TableCell>
                                                                                                    <TableCell align="right">{o.OxygenAddress}</TableCell>
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
                    <Button  variant="contained" color="primary" onClick={()=>{console.log(phoneNumber,code,finalList,location.state.State,location.state.District,location.state.Mandal,finalList);setTwitter(true)}}>Show From Twitter</Button>
                    </div>
            </nav>
        </div>
    )
}

export default PatientAvailability
