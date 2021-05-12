import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Grid, Icon, makeStyles, MenuItem, TextareaAutosize, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import BatteryStdSharpIcon from '@material-ui/icons/BatteryStdSharp';
import { NavLink, useLocation } from 'react-router-dom';
import { AccountCircle, Send } from '@material-ui/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CallMadeIcon from '@material-ui/icons/CallMade';
import axios from 'axios';



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
    // VARIABLES
        // OXygen
            const [oxygenQuantity,setoxygenQuantity] = useState('');
            const [oxygenPrice,setoxygenPrice] = useState('');
            const [oxygenaddress,setoxygenaddress] = useState('');
        // ICU
            const [beds,setBeds] = useState('');
            const [bedPrice,setBedPrice] = useState('');
            const [bedAddress,setBedAddress] = useState('');
        // Ambulance
            const [hospital,setHospital] = useState('')
            const [contactNumber,setContactNumber] = useState('')
            const [AmbulanceAddress,setAmbulanceAddress] = useState('');
        // Private
            const [km,setKm] = useState('');
            const [privateTransportPrice,setprivateTransportPrice] = useState('');
            const [privateTransportAddress,setprivateTransportAddress] = useState('');
        // Vaccine
            const [type,setType] = useState('');
            const [vaccinePrice,setVaccinePrice] = useState('');
            const [VaccineAddress,setVaccineAddress] = useState('');
            const vaccine = [
                {
                    value: 'Covishield',
                    label: 'Covishield',
                },
                {
                    value: 'Covaxin',
                    label: 'Covaxin',
                },
                {
                    value: 'ZyCoV-D',
                    label: 'ZyCoV-D',
                },
                {
                    value: 'Biological E',
                    label: 'Biological E',
                },
                {
                    value: 'Mynvax',
                    label: 'Mynvax',
                },
                {
                    value: 'HGCO19',
                    label: 'HGCO19',
                },
                {
                    value: 'Sputnik V',
                    label: 'Sputnik V',
                },
            ];
        // Plasma
            const [bloodGroup,setbloodGroup] = useState('');
            const [plasmaPrice,setplasmaPrice] = useState('');
            const [plasmaAddress,setplasmaAddress] = useState('');

    const [modal,setModal] = useState('');
    const [enable,setEnable] = useState('true');
    const [disable,setDisable] = useState('true')
    const location = useLocation();
    var state = location.state.State;
    var district = location.state.District;
    var mandal = location.state.Mandal;
    var username = location.state.user;
    const[list,setList] = useState(location.state.list);
    const classes = useStyles();
    var icons = ["🔋", "🛏️", "🚑", "🚖", "💉", "🩸"];
    var panelNumbers = ["panel1", "panel2",'panel3','panel4','panel5','panel6'];
    var panelIds = ["panel1bh-header","panel2bh-header","panel3bh-header","panel4bh-header","panel5bh-header","panel6bh-header"];
    var panelControls = ["panel1bh-content", "panel2bh-content","panel3bh-content","panel4bh-content","panel5bh-content","panel6bh-content",];
    var icon = [''];
    var panelNumber = [''];
    var control = [''];
    var panelId = [''];
    var requestedList = ['Oxygen Cylinder', 'ICU Bed',"Ambulance","Private Transport",'Vaccine','Plasma'];
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
    const capture = () => {
        return(
            <div>
                <div class="contentarea">
                    <div class="camera">
                        <video id="video">Video stream not available.</video>
                    </div>
                        <Button id="startbutton" endIcon={<AddAPhotoIcon></AddAPhotoIcon>} onClick={()=>{setDisable('false')}}>Capture</Button>
                    <br/>
                    <canvas id="canvas"></canvas>
                    <div class="output">
                        <img id="photo" alt="The screen capture will appear in this box." />
                    </div>
                    <Button variant="contained" color="primary" disabled={disable === 'true'? true : false} endIcon={<Icon>send</Icon>} onClick={()=>{setEnable('true')}}>Submit</Button>
                </div>
            <script src="../js/FileSaver.min.js"></script>
            <script src="../js/script.js"></script>
            </div>
        )
    }
    // expansion
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const render = () =>{
        return(
            <div>
                <div className="row">
                    <div className="column">
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <TextField id="input-with-icon-grid" label="madhu1213" disabled/>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="column">
                        <Button  data-toggle="modal" data-target="#picturecapture" color="secondary" variant="outlined"  endIcon={<CallMadeIcon></CallMadeIcon>}>Send Pictures</Button>
                    </div>
                </div>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        {modal === 'Vaccine' ? (<div>
                            <TextField
                                id="standard-select-currency"
                                select
                                label="Select"
                                value={type}
                                onChange={event => {setType(event.target.value)}}
                                helperText="Please select vaccine type"
                                >
                                {vaccine.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>) : (<div>
                            <TextField id="input-with-icon-grid" 
                                label={
                                    modal === 'Oxygen Cylinder' ? 'OxygenCylinder Type' : 
                                    modal === 'ICU Bed' ? 'Available Beds' : 
                                    modal === 'Private Transport' ? 'Vehicle Type' : 
                                    modal === 'Plasma' ? 'bloodGroup' : 
                                    modal === 'Ambulance' ? 'Hospital' : ''
                                } 
                                type="text" 
                                value={
                                    modal === 'Oxygen Cylinder' ? oxygenQuantity : 
                                    modal === 'ICU Bed' ? beds : 
                                    modal === 'Private Transport' ? km : 
                                    modal === 'Plasma' ? bloodGroup : 
                                    modal === 'Ambulance' ? hospital : ''
                                    } 
                                onChange={
                                    modal === 'Oxygen Cylinder' ? event => setoxygenQuantity(event.target.value) : 
                                    modal === 'ICU Bed' ? event => setBeds(event.target.value) : 
                                    modal === 'Private Transport' ? event => setKm(event.target.value) : 
                                    modal === 'Plasma' ? event => setbloodGroup(event.target.value) : 
                                    modal === 'Ambulance' ? event => setHospital(event.target.value) : 
                                    ''
                            }/>
                        </div>)}
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <TextField id="input-with-icon-grid" 
                            label={
                                modal === 'Oxygen Cylinder' ? 'Each Cylinder cost' : 
                                modal === 'ICU Bed' ? 'Each Bed cost' : 
                                modal === 'Private Transport' ? 'price for 1KM' : 
                                modal === 'Plasma' ? 'Normal or Plasma' : 
                                modal === 'Ambulance' ? 'Phone Number' : 
                                modal === 'Vaccine' ? 'Vaccine Price' :
                                ''
                            } 
                            type="text" 
                            value={
                                modal === 'Oxygen Cylinder' ? oxygenPrice : 
                                modal === 'ICU Bed' ? bedPrice : 
                                modal === 'Private Transport' ? privateTransportPrice : 
                                modal === 'Ambulance' ? contactNumber : 
                                modal === 'Plasma' ? plasmaPrice : 
                                modal === 'Vaccine' ? vaccinePrice :
                                ''
                            } 
                            onChange={
                                modal === 'Oxygen Cylinder' ? event => setoxygenPrice(event.target.value) : 
                                modal === 'ICU Bed' ? event => setBedPrice(event.target.value) : 
                                modal === 'Private Transport' ? event => setprivateTransportPrice(event.target.value) : 
                                modal === 'Plasma' ? event => setplasmaPrice(event.target.value) : 
                                modal === 'Ambulance' ? event => setContactNumber(event.target.value) : 
                                modal === 'Vaccine' ? event => setVaccinePrice(event.target.value) :
                                ''
                            }/>
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <TextField id="input-with-icon-grid" 
                            label={
                                modal === 'Oxygen Cylinder' ? 'Address' : 
                                modal === 'ICU Bed' ? 'Address' : 
                                modal === 'Private Transport' ? 'Address' : 
                                modal === 'Plasma' ? 'Address' : 
                                modal === 'Ambulance' ? 'Address' : 
                                modal === 'Vaccine' ? 'Address' :
                                ''
                            } 
                            type="text" 
                            value={
                                modal === 'Oxygen Cylinder' ? oxygenaddress : 
                                modal === 'ICU Bed' ? bedAddress : 
                                modal === 'Private Transport' ? privateTransportAddress : 
                                modal === 'Ambulance' ? AmbulanceAddress : 
                                modal === 'Plasma' ? plasmaAddress : 
                                modal === 'Vaccine' ? VaccineAddress :
                                ''
                            } 
                            onChange={
                                modal === 'Oxygen Cylinder' ? event => setoxygenaddress(event.target.value) : 
                                modal === 'ICU Bed' ? event => setBedAddress(event.target.value) : 
                                modal === 'Private Transport' ? event => setprivateTransportAddress(event.target.value) : 
                                modal === 'Plasma' ? event => setplasmaAddress(event.target.value) : 
                                modal === 'Ambulance' ? event => setAmbulanceAddress(event.target.value) : 
                                modal === 'Vaccine' ? event => setVaccineAddress(event.target.value) :
                                ''
                            }/>
                    </Grid>
                </Grid>
            </div>
        )
    }
    const [sendData,setSendData] = useState('');
    const [dataType,setDataType] = useState('')
    const Send = () =>{
        console.log(state,district,mandal)
        return(
            <div>
            {   
                sendData === 'Oxygen Cylinder' ? (sendOxygenCylinders(dataType,{'Oxygen Quantity':oxygenQuantity},{'Oxygen Price':oxygenPrice},{'Oxygen Address':oxygenaddress})) : 
                sendData === 'ICU Bed' ? (console.log(dataType,{'beds':beds},{'bedPrice':bedPrice},{'bedAddress':bedAddress})) : 
                sendData === 'Private Transport' ? (console.log(dataType,{'km':km},{'privateTransportPrice':privateTransportPrice},{'privateTransportAddress':privateTransportAddress})) : 
                sendData === 'Ambulance' ? (console.log(dataType,{'hospital':hospital},{'contactNumber':contactNumber},{'AmbulanceAddress':AmbulanceAddress})) : 
                sendData === 'Plasma' ? (console.log(dataType,{'bloodGroup':bloodGroup},{'plasmaPrice':plasmaPrice},{'plasmaAddress':plasmaAddress})) : 
                sendData === 'Vaccine' ? (console.log(dataType,{"Vaccine Type":type},{'Vaccine Price':vaccinePrice},{'Vaccine Address':VaccineAddress})) : ''
            }
            </div>
        )
    }
    const sendOxygenCylinders= () => {
            const data = {
            "Username":username,
            "State":state,
            "District":district,
            "Mandal":mandal,
            "OxygenQuantity": oxygenQuantity,
            "OxygenPrice":oxygenPrice,
            "OxygenAddress":oxygenaddress
            }
            axios.post('http://localhost:3010/oxygencylinder', {data}).then(
            function(res) {
                if(res.data.msg) {
                    alert(res.data.msg);
                } else {
                    console.log(res.data.msg)
                }
            }
        )
        }
    return (
        <div>
            <div class="modal fade" id="picturecapture" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Oxygen Cylinders</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body">
                            {capture()}
                        </div>
                        <div class="modal-footer">
                            <Button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={()=>{setEnable(true)}}>Close</Button>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="glass">
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <div>
                    {list.map((l)=>{
                        settingList(l);
                        return(
                            <div>
                                <Accordion expanded={expanded === l} onChange={handleChange(l)} className="accordian" onClick={()=>{setModal(l);setSendData(l);setDataType(l)}}>
                                    <AccordionSummary expandIcon={icon} aria-controls={control} id={panelId}>
                                        <Typography className={classes.heading}>{l}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {render(l)}
                                    </AccordionDetails>
                                    <AccordionActions>
                                        <Button size="small" color="primary"  onClick={()=>{Send();}}>Submit</Button>
                                    </AccordionActions>
                                </Accordion>
                            </div>
                        )
                    })}
                </div>
            </nav>
        </div>
    )
}
