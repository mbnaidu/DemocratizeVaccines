import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Grid, Icon, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import {  Send } from '@material-ui/icons';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CallMadeIcon from '@material-ui/icons/CallMade';



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
            const [userID,setUserID] = useState('USER ID');
            const [userName,setUserName] = useState('USER NAME');
            const [uploadDate,setUploadDate] = useState('UPLOADED DATE');
            const [address,setAddress] = useState('DEFAULT ADDRESS');
        // Oxygen
            const [oxygenAvailability,setOxygenAvailability] = useState('');
            const [oxygenVerifiedOn,setOxygenVerifiedOn] = useState('');
            const [oxygenVerifiedBy,setOxygenVerifiedBy] = useState('');
            const [oxygenPrice,setOxygenPrice] = useState('');
        // ICU
            const [bedAvailability,setBedAvailability] = useState('');
            const [bedVerifiedOn,setBedVerifiedOn] = useState('');
            const [bedVerifiedBy,setBedVerifiedBy] = useState('');
            const [bedPrice,setBedPrice] = useState('');
        // Ambulance
            const [ambulanceAvailability,setAmbulanceAvailability] = useState('');
            const [ambulanceVerifiedOn,setAmbulanceVerifiedOn] = useState('');
            const [ambulanceVerifiedBy,setAmbulanceVerifiedBy] = useState('');
            const [ambulanceCostPerKm,setAmbulanceCostPerKm] = useState('');
        // Private
            const [privateTransportAvailability,setPrivateTransportAvailability] = useState('');
            const [privateTransportVerifiedOn,setPrivateTransportVerifiedOn] = useState('');
            const [privateTransportVerifiedBy,setPrivateTransportVerifiedBy] = useState('');
            const [privateTransportCostPerKm,setPrivateTransportCostPerKm] = useState('');
        // Vaccine
            const [vaccineAvailability,setVaccineAvailability] = useState('');
            const [vaccineVerifiedOn,setVaccineVerifiedOn] = useState('');
            const [vaccineVerifiedBy,setVaccineVerifiedBy] = useState('');
            const [vaccinePrice,setVaccinePrice] = useState('');            
        // Blood
            const [bloodAvailability,setBloodAvailability] = useState('');
            const [bloodVerifiedOn,setBloodVerifiedOn] = useState('');
            const [bloodVerifiedBy,setBloodVerifiedBy] = useState('');
            const [bloodPrice,setBloodPrice] = useState('');    

    const [modal,setModal] = useState('');
    const [enable,setEnable] = useState('true');
    const [disable,setDisable] = useState('true')
    const location = useLocation();
    console.log(location)
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
                                <TextField id="input-with-icon-grid" label="UserID" value={userID} disabled/>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="column">
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <TextField id="input-with-icon-grid" label="UserName" value={userName} disabled/>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <Grid container spacing={0} alignItems="flex-end">
                            <Grid item>
                                <TextField id="input-with-icon-grid" value={uploadDate} disabled />
                            </Grid>
                        </Grid>
                    </div>
                    <div className="column">
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <TextField id="input-with-icon-grid"  value={address} disabled />
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <TextField id="input-with-icon-grid" 
                                    label={
                                        modal === 'Oxygen Cylinder' ? 'Verified ON' : 
                                        modal === 'ICU Bed' ? 'Verified ON' : 
                                        modal === 'Private Transport' ? 'Verified ON' : 
                                        modal === 'Plasma' ? 'Verified ON' : 
                                        modal === 'Ambulance' ? 'Verified ON' : 
                                        modal === 'Vaccine' ? 'Verified ON' :
                                        ''
                                    } 
                                    type="text" 
                                    value={
                                        modal === 'Oxygen Cylinder' ? oxygenVerifiedOn : 
                                        modal === 'ICU Bed' ? bedVerifiedOn : 
                                        modal === 'Private Transport' ? privateTransportVerifiedOn : 
                                        modal === 'Ambulance' ? ambulanceVerifiedOn : 
                                        modal === 'Plasma' ? bloodVerifiedOn : 
                                        modal === 'Vaccine' ? vaccineVerifiedOn :
                                        ''
                                    } 
                                    onChange={
                                        modal === 'Oxygen Cylinder' ? event => setOxygenVerifiedOn(event.target.value) : 
                                        modal === 'ICU Bed' ? event => setBedVerifiedOn(event.target.value) : 
                                        modal === 'Private Transport' ? event => setPrivateTransportVerifiedOn(event.target.value) : 
                                        modal === 'Plasma' ? event => setBloodVerifiedOn(event.target.value) : 
                                        modal === 'Ambulance' ? event => setAmbulanceVerifiedOn(event.target.value) : 
                                        modal === 'Vaccine' ? event => setVaccineVerifiedOn(event.target.value) :
                                        ''
                                    }
                                    disabled
                                    />
                            </Grid>
                        </Grid>
                    </div>
                    <div className="column">
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <TextField id="input-with-icon-grid" 
                                    label={
                                        modal === 'Oxygen Cylinder' ? 'Verified By' : 
                                        modal === 'ICU Bed' ? 'Verified By' : 
                                        modal === 'Private Transport' ? 'Verified By' : 
                                        modal === 'Plasma' ? 'Verified By' : 
                                        modal === 'Ambulance' ? 'Verified By' : 
                                        modal === 'Vaccine' ? 'Verified By' :
                                        ''
                                    } 
                                    type="text" 
                                    value={
                                        modal === 'Oxygen Cylinder' ? oxygenVerifiedBy : 
                                        modal === 'ICU Bed' ? bedVerifiedBy : 
                                        modal === 'Private Transport' ? privateTransportVerifiedBy : 
                                        modal === 'Ambulance' ? ambulanceVerifiedBy : 
                                        modal === 'Plasma' ? bloodVerifiedBy : 
                                        modal === 'Vaccine' ? vaccineVerifiedBy :
                                        ''
                                    } 
                                    onChange={
                                        modal === 'Oxygen Cylinder' ? event => setOxygenVerifiedBy(event.target.value) : 
                                        modal === 'ICU Bed' ? event => setBedVerifiedBy(event.target.value) : 
                                        modal === 'Private Transport' ? event => setPrivateTransportVerifiedBy(event.target.value) : 
                                        modal === 'Plasma' ? event => setBloodVerifiedBy(event.target.value) : 
                                        modal === 'Ambulance' ? event => setAmbulanceVerifiedBy(event.target.value) : 
                                        modal === 'Vaccine' ? event => setVaccineVerifiedBy(event.target.value) :
                                        ''
                                    }
                                    disabled
                                    />
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <TextField id="input-with-icon-grid" 
                                    label={
                                        modal === 'Oxygen Cylinder' ? 'Available Cylinders' : 
                                        modal === 'ICU Bed' ? 'Available Beds' : 
                                        modal === 'Private Transport' ? 'Available Vehicles' : 
                                        modal === 'Plasma' ? 'Availble blood groups' : 
                                        modal === 'Ambulance' ? 'Available Vehicles' : 
                                        modal === 'Vaccine' ? 'Available Vaccine types' : 
                                        ''
                                    } 
                                    type="text" 
                                    value={
                                        modal === 'Oxygen Cylinder' ? oxygenAvailability : 
                                        modal === 'ICU Bed' ? bedAvailability : 
                                        modal === 'Private Transport' ? privateTransportAvailability : 
                                        modal === 'Plasma' ? bloodAvailability : 
                                        modal === 'Ambulance' ? ambulanceAvailability : 
                                        modal === 'Vaccine' ? vaccineAvailability :
                                        ''
                                        } 
                                    onChange={
                                        modal === 'Oxygen Cylinder' ? event => setOxygenAvailability(event.target.value) : 
                                        modal === 'ICU Bed' ? event => setBedAvailability(event.target.value) : 
                                        modal === 'Private Transport' ? event => setPrivateTransportAvailability(event.target.value) : 
                                        modal === 'Plasma' ? event => setBloodAvailability(event.target.value) : 
                                        modal === 'Ambulance' ? event => setAmbulanceAvailability(event.target.value) : 
                                        modal === 'Vaccine' ? event => setVaccineAvailability(event.target.value) : 
                                        ''
                                    }
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className="column">
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <TextField id="input-with-icon-grid" 
                                    label={
                                        modal === 'Oxygen Cylinder' ? 'Cost per Cylinder' : 
                                        modal === 'ICU Bed' ? 'Cost per Bed' : 
                                        modal === 'Private Transport' ? 'Cost per 1km' : 
                                        modal === 'Plasma' ? 'Cost per blood group' : 
                                        modal === 'Ambulance' ? 'Cost per 1km' : 
                                        modal === 'Vaccine' ? 'Cost per vaccine' :
                                        ''
                                    } 
                                    type="text" 
                                    value={
                                        modal === 'Oxygen Cylinder' ? oxygenPrice : 
                                        modal === 'ICU Bed' ? bedPrice : 
                                        modal === 'Private Transport' ? privateTransportCostPerKm : 
                                        modal === 'Ambulance' ? ambulanceCostPerKm : 
                                        modal === 'Plasma' ? bloodPrice : 
                                        modal === 'Vaccine' ? vaccinePrice :
                                        ''
                                    } 
                                    onChange={
                                        modal === 'Oxygen Cylinder' ? event => setOxygenPrice(event.target.value) : 
                                        modal === 'ICU Bed' ? event => setBedPrice(event.target.value) : 
                                        modal === 'Private Transport' ? event => setPrivateTransportCostPerKm(event.target.value) : 
                                        modal === 'Plasma' ? event => setBloodPrice(event.target.value) : 
                                        modal === 'Ambulance' ? event => setAmbulanceCostPerKm(event.target.value) : 
                                        modal === 'Vaccine' ? event => setVaccinePrice(event.target.value) :
                                        ''
                                    }
                                    />
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <Button color="secondary" variant="contained">Change Address</Button>
            </div>
        )
    }
    const [sendData,setSendData] = useState('');
    const [dataType,setDataType] = useState('')
    return (
        <div>
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
                                    <AccordionActions expanded={expanded === l} onClick={handleChange(l)}>
                                        <Button size="small" color="primary" variant="contained"  onClick={()=>{handleChange(l);list.splice(list.indexOf(l),1)}}>Submit</Button>
                                    </AccordionActions>
                                </Accordion>
                            </div>
                        )
                    })}
                </div>
                <NavLink to='/'><Button color="primary" variant="contained">HOME</Button></NavLink>
            </nav>
        </div>
    )
}
