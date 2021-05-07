import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Icon, makeStyles, TextareaAutosize, TextField, Typography } from '@material-ui/core'
import React from 'react'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LocalTaxiSharpIcon from '@material-ui/icons/LocalTaxiSharp';
import BatteryStdSharpIcon from '@material-ui/icons/BatteryStdSharp';
import HotelSharpIcon from '@material-ui/icons/HotelSharp';
import VerifiedUserSharpIcon from '@material-ui/icons/VerifiedUserSharp';
import InvertColorsSharpIcon from '@material-ui/icons/InvertColorsSharp';
import { NavLink, useLocation } from 'react-router-dom';
import '../../main.css'
import '../../styles.css'
import { AccountCircle } from '@material-ui/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
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
    const location = useLocation();
    console.log(location)
    const classes = useStyles();
    const [add,setAdd] = React.useState(true);
    const [edit,setEdit] = React.useState(true);
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
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
                                <h5 class="modal-title" id="exampleModalLongTitle">Oxygen Cylinders</h5>
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
                                        <TextField id="input-with-icon-grid" label="Price for each" type="number"/>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <LocationOnIcon />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="input-with-icon-grid" label="Address" type="text"/>
                                    </Grid>
                                </Grid>
                            </div>
                            <div class="modal-footer">
                                <Button type="button" class="btn btn-secondary" data-dismiss="modal">Close</Button>
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
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <Button variant="contained" color={add ? "primary" : "default"} onClick={()=>{setAdd(false);setEdit(true)}} >ADD</Button>{' '}
                <Button variant="contained" color={edit ? "primary" : "default"}  onClick={()=>{setEdit(false);setAdd(true)}} >EDIT</Button>
                {add ? (<div></div>) : (<div>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className="accordian" data-toggle="modal" data-target="#exampleModalCenter">
                    <AccordionSummary expandIcon={<BatteryStdSharpIcon style={{ color: "blue" ,fontSize: 30 }} />} aria-controls="panel1bh-content"id="panel1bh-header">
                        <Typography className={classes.heading}>Oxygen Cylinders</Typography>
                    </AccordionSummary>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className="accordian">
                    <AccordionSummary expandIcon={<HotelSharpIcon style={{ color: "brown" ,fontSize: 30 }} />} aria-controls="panel2bh-content"id="panel2bh-header" >
                        <Typography className={classes.heading}>ICU BEDS</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading}>ADDRESS : </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className="accordian">
                    <AccordionSummary expandIcon={<LocalHospitalIcon style={{ color: "green" ,fontSize: 30 }} />} aria-controls="panel3bh-content" id="panel3bh-header" >
                        <Typography className={classes.heading}>AMBULANCE</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading}>ADDRESS : </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} className="accordian">
                    <AccordionSummary expandIcon={<LocalTaxiSharpIcon style={{ color: "gold" ,fontSize: 30}} />} aria-controls="panel4bh-content" id="panel4bh-header" >
                        <Typography className={classes.heading}>PRIVATE TRANSPORT</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading}>ADDRESS : </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} className="accordian">
                    <AccordionSummary expandIcon={<VerifiedUserSharpIcon   style={{ color: "green" ,fontSize: 30}} />} aria-controls="panel5bh-content" id="panel5bh-header" >
                        <Typography className={classes.heading}>VACCINE</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading}>ADDRESS : </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')} className="accordian">
                    <AccordionSummary expandIcon={<InvertColorsSharpIcon  style={{ color: "red" ,fontSize: 30}} />} aria-controls="panel4bh-content" id="panel4bh-header" >
                        <Typography className={classes.heading}>PLASMA</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading}>ADDRESS : </Typography>
                    </AccordionDetails>
                </Accordion>
                </div>)}
                {edit ? (<div></div>) : (<div>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className="accordian" data-toggle="modal" data-target="#exampleModalCenter">
                    <AccordionSummary expandIcon={<BatteryStdSharpIcon style={{ color: "blue" ,fontSize: 30 }} />} aria-controls="panel1bh-content"id="panel1bh-header">
                        <Typography className={classes.heading}>Oxygen Cylinders</Typography>
                        <Typography className={classes.secondaryHeading}>Qt : 1</Typography>
                    </AccordionSummary>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className="accordian">
                    <AccordionSummary expandIcon={<HotelSharpIcon style={{ color: "brown" ,fontSize: 30 }} />} aria-controls="panel2bh-content"id="panel2bh-header" >
                        <Typography className={classes.heading}>ICU BEDS</Typography>
                        <Typography className={classes.secondaryHeading}>Qt : 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading}>ADDRESS : </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className="accordian">
                    <AccordionSummary expandIcon={<LocalHospitalIcon style={{ color: "green" ,fontSize: 30 }} />} aria-controls="panel3bh-content" id="panel3bh-header" >
                        <Typography className={classes.heading}>AMBULANCE</Typography>
                        <Typography className={classes.secondaryHeading}>Qt : 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading}>ADDRESS : </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} className="accordian">
                    <AccordionSummary expandIcon={<LocalTaxiSharpIcon style={{ color: "gold" ,fontSize: 30}} />} aria-controls="panel4bh-content" id="panel4bh-header" >
                        <Typography className={classes.heading}>PRIVATE TRANSPORT</Typography>
                        <Typography className={classes.secondaryHeading}>Qt : 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading}>ADDRESS : </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} className="accordian">
                    <AccordionSummary expandIcon={<VerifiedUserSharpIcon   style={{ color: "green" ,fontSize: 30}} />} aria-controls="panel5bh-content" id="panel5bh-header" >
                        <Typography className={classes.heading}>VACCINE</Typography>
                        <Typography className={classes.secondaryHeading}>Qt : 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading}>ADDRESS : </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')} className="accordian">
                    <AccordionSummary expandIcon={<InvertColorsSharpIcon  style={{ color: "red" ,fontSize: 30}} />} aria-controls="panel4bh-content" id="panel4bh-header" >
                        <Typography className={classes.heading}>PLASMA</Typography>
                        <Typography className={classes.secondaryHeading}>Qt : 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading}>ADDRESS : </Typography>
                    </AccordionDetails>
                </Accordion>
                </div>)}
                <NavLink to="/"><Button variant="contained" color="primary">HOME</Button></NavLink>{" "}
            </nav>
        </div>
    )
}
