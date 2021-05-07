import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Icon, makeStyles, TextareaAutosize, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import BatteryStdSharpIcon from '@material-ui/icons/BatteryStdSharp';
import { NavLink, useLocation } from 'react-router-dom';
import '../../main.css'
import '../../styles.css'
import { AccountCircle } from '@material-ui/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CallMadeIcon from '@material-ui/icons/CallMade';

import { ModalBody, ModalFooter, ModalTitle, Modal } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(23),
        flexBasis: '63.33%',
        flexShrink: 0,
        color: theme.palette.text.primary    ,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        color: theme.palette.text.disabled,
    },
}));
export default function DonorAvailability() {
    const location = useLocation();
    const[list,setList] = useState(location.state.list);
    var result = {};
        for(let i=0;i<list.length;i++){
            result[list[i]] = {}
        }
    const classes = useStyles();
    const [add,setAdd] = React.useState(true);
    const [edit,setEdit] = React.useState(true);
    const [expanded, setExpanded] = React.useState(false);
    const [modalTitle,setModalTitle] = useState('');
    var icons = ["🔋", "🛏️", "🚑", "🚖", "💉", "🩸"];
    const [one,setOne] = useState('');
    const [two,setTwo] = useState('');
    const [game,setGame] = useState('');
    var panelNumbers = ["panel1", "panel2",'panel3','panel4','panel5','panel6'];
    var panelIds = ["panel1bh-header","panel2bh-header","panel3bh-header","panel4bh-header","panel5bh-header","panel6bh-header"];
    var panelControls = ["panel1bh-content", "panel2bh-content","panel3bh-content","panel4bh-content","panel5bh-content","panel6bh-content",];
    var icon = [''];
    var panelNumber = [''];
    var control = [''];
    var panelId = [''];
    var requestedList = ['Oxygen Cylinder', 'ICU Bed',"Ambulance","Private Transport",'Vaccine','Plasma'];
    const setResult = (value1,key1) =>{
        let temp = document.getElementById("exampleModalLongTitle").textContent;
        result[document.getElementById("exampleModalLongTitle").textContent][key1] = value1;
    }
    const handleChange = (panel) =>{
        for(var i=0;i<panelNumbers.length;i++){
            if(panelNumbers[i] === panel){
                setModalTitle(requestedList[i])
            }
        }
    };
    // const handle2 = (panel) =>{
    //     for (var i = 0; i < panelNumbers.length; i++) {
    //         if (panelNumbers[i] === panel) {
    //             setModalTitle(requestedList[i]);
    //         }
    //     }
    // }
    const settingList = (type) =>{
        for(var i=0;i<requestedList.length;i++){
            if(type === requestedList[i]){
                icon = icons[i];
                panelNumber = panelNumbers[i];
                panelId = panelIds[i];
                control = panelControls[i];
            }
        }
    }
    const oxygen = () => {
        return(
            <div>
                <div class="contentarea">
                    <div class="camera">
                        <video id="video">Video stream not available.</video>
                    </div>
                        <Button id="startbutton" endIcon={<AddAPhotoIcon></AddAPhotoIcon>}>Capture</Button>
                    <br/>
                    <canvas id="canvas"></canvas>
                    <div class="output">
                        <img id="photo" alt="The screen capture will appear in this box." />
                    </div>
                    <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>}>Submit</Button>
                </div>
            <script src="../js/FileSaver.min.js"></script>
            <script src="../js/script.js"></script>
            </div>
        )
    }
    return (
        <div>
            {/* MODELS */}
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">{modalTitle}</h5>
                                <Button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </Button>
                            </div>
                            <div class="modal-body">
                                <div className="row">
                                    <div className="column">
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item>
                                                <AccountCircle />
                                            </Grid>
                                            <Grid item>
                                                <TextField id="input-with-icon-grid" label="madhu1213" disabled/>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className="column">
                                        <Button onClick={()=>{oxygen()}}  data-toggle="modal" data-target="#picturecapture" endIcon={<CallMadeIcon></CallMadeIcon>}>Send Pictures</Button>
                                    </div>
                                </div>
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <BatteryStdSharpIcon />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="input-with-icon-grid" label="Quantity" type="number"/>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <LocalOfferIcon />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="input-with-icon-grid" label="Price for each" type="number" />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <LocationOnIcon />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="input-with-icon-grid" label="Address" type="text" value={one} onChange={(e)=>{setOne(e.target.value);setResult(e.target.value,"address")}}/>
                                    </Grid>
                                </Grid>
                            </div>
                            <div class="modal-footer">
                                <Button type="button" class="btn btn-secondary">Close</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="picturecapture" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Oxygen Cylinders</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div class="modal-body">
                                {oxygen()}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            <nav className="glass">
                <Button variant="contained" onCLick={()=>{console.log("HI")}}>hi</Button>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <Button variant="contained" color={add ? "primary" : "default"} onClick={()=>{setAdd(false);setEdit(true)}} >ADD</Button>{' '}
                <Button variant="contained" color={edit ? "primary" : "default"}  onClick={()=>{setEdit(false);setAdd(true)}} >EDIT</Button>
                {add ? (<div></div>) : (<div>
                    {list.map((l)=>{
                        settingList(l)
                        return(
                            <div>
                                <Accordion expanded={expanded === panelNumber} onChange={()=>{handleChange(panelNumber);setOne("");}} className="accordian" data-toggle="modal" data-target="#exampleModalCenter">
                                    <AccordionSummary expandIcon={icon} aria-controls={control} id={panelId}>
                                        <Typography className={classes.heading}>{l}</Typography>
                                    </AccordionSummary>
                                </Accordion>
                            </div>
                        )
                    })}
                </div>)}
                {edit ? (<div></div>) : (<div>
                    {list.map((l)=>{
                        settingList(l)
                        return(
                            <div>
                                <Accordion expanded={expanded === panelNumber} onChange={handleChange(panelNumber)} className="accordian" data-toggle="modal" data-target="#exampleModalCenter">
                                    <AccordionSummary expandIcon={icon} aria-controls={control} id={panelId}>
                                        <Typography className={classes.heading}>{l}</Typography>
                                    </AccordionSummary>
                                </Accordion>
                            </div>
                        )
                    })}
                </div>)}
                <NavLink to="/"><Button variant="contained" color="primary">HOME</Button></NavLink>{" "}
            </nav>
        </div>
    )
}
