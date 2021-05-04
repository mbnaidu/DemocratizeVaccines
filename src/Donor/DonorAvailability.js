import { Accordion, AccordionDetails, AccordionSummary, Button, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LocalTaxiSharpIcon from '@material-ui/icons/LocalTaxiSharp';
import BatteryStdSharpIcon from '@material-ui/icons/BatteryStdSharp';
import HotelSharpIcon from '@material-ui/icons/HotelSharp';
import VerifiedUserSharpIcon from '@material-ui/icons/VerifiedUserSharp';
import InvertColorsSharpIcon from '@material-ui/icons/InvertColorsSharp';
import { NavLink } from 'react-router-dom';


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
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <div>
            <nav className="glass">
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className="accordian">
                    <AccordionSummary expandIcon={<BatteryStdSharpIcon style={{ color: "blue" ,fontSize: 30 }} />} aria-controls="panel1bh-content"id="panel1bh-header">
                        <Typography className={classes.heading}>Oxygen Cylinders</Typography>
                        <Typography className={classes.secondaryHeading}>Available</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading}>ADDRESS : </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className="accordian">
                    <AccordionSummary expandIcon={<HotelSharpIcon style={{ color: "brown" ,fontSize: 30 }} />} aria-controls="panel2bh-content"id="panel2bh-header" >
                        <Typography className={classes.heading}>ICU BEDS</Typography>
                        <Typography className={classes.secondaryHeading}>Not Available</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading}>ADDRESS : </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className="accordian">
                    <AccordionSummary expandIcon={<LocalHospitalIcon style={{ color: "green" ,fontSize: 30 }} />} aria-controls="panel3bh-content" id="panel3bh-header" >
                        <Typography className={classes.heading}>AMBULANCE</Typography>
                        <Typography className={classes.secondaryHeading}>Available</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading}>ADDRESS : </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} className="accordian">
                    <AccordionSummary expandIcon={<LocalTaxiSharpIcon style={{ color: "gold" ,fontSize: 30}} />} aria-controls="panel4bh-content" id="panel4bh-header" >
                        <Typography className={classes.heading}>PRIVATE TRANSPORT</Typography>
                        <Typography className={classes.secondaryHeading}>Not Available</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading}>ADDRESS : </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} className="accordian">
                    <AccordionSummary expandIcon={<VerifiedUserSharpIcon   style={{ color: "green" ,fontSize: 30}} />} aria-controls="panel5bh-content" id="panel5bh-header" >
                        <Typography className={classes.heading}>VACCINE</Typography>
                        <Typography className={classes.secondaryHeading}>Available</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading}>ADDRESS : </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')} className="accordian">
                    <AccordionSummary expandIcon={<InvertColorsSharpIcon  style={{ color: "red" ,fontSize: 30}} />} aria-controls="panel4bh-content" id="panel4bh-header" >
                        <Typography className={classes.heading}>PLASMA</Typography>
                        <Typography className={classes.secondaryHeading}>Not Available</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading}>ADDRESS : </Typography>
                    </AccordionDetails>
                </Accordion>
                <NavLink to="/"><Button variant="contained" color="primary">HOME</Button></NavLink>{" "}
            </nav>
        </div>
    )
}
