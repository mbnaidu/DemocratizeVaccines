import { Accordion, AccordionDetails, AccordionSummary, Button, makeStyles, Slide, Snackbar, Typography } from '@material-ui/core'
import React from 'react'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LocalTaxiSharpIcon from '@material-ui/icons/LocalTaxiSharp';
import BatteryStdSharpIcon from '@material-ui/icons/BatteryStdSharp';
import HotelSharpIcon from '@material-ui/icons/HotelSharp';
import VerifiedUserSharpIcon from '@material-ui/icons/VerifiedUserSharp';
import InvertColorsSharpIcon from '@material-ui/icons/InvertColorsSharp';


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
    secondaryHeading1: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        color: theme.palette.text.primary,
    },
}));
export default function PatientAvailability() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    // SEND REQUEST
        function TransitionDown(props) {
            return <Slide {...props} direction="down" />;
            }
        const [open, setOpen] = React.useState(false);
        const [transition, setTransition] = React.useState(undefined);
        const handleClick = (Transition) => () => {
            setTransition(() => Transition);
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };
    return (
        <div>
            <nav className="glass">
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary expandIcon={<BatteryStdSharpIcon style={{ color: "blue" ,fontSize: 30 }} />} aria-controls="panel1bh-content"id="panel1bh-header">
                        <Typography className={classes.heading}>Oxygen Cylinders</Typography>
                        <Typography className={classes.secondaryHeading}>Available</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading1}>Location : Bhimavaram<br></br>West Godavari<br></br>Andhra Pradesh</Typography>
                        <Typography className={classes.secondaryHeading1}>Address : <br></br>14-10-1/1<br></br>Ravuri vari street<br></br>Nachu vari Center<br></br>Bhimavarm 1</Typography>
                        <Typography className={classes.secondaryHeading1}>
                            UserId : Madhu1213
                            <div>
                                <React.Fragment>
                                    <Button onClick={handleClick(TransitionDown)} color="primary">CHECK</Button>
                                </React.Fragment>
                                <Snackbar
                                    maxSnack={3}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={transition}
                                    message="Request Has Been Sent"
                                    key={transition ? transition.name : ''}
                                    backgroundColor='green' 
                                />
                            </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary expandIcon={<HotelSharpIcon style={{ color: "brown" ,fontSize: 30 }} />} aria-controls="panel2bh-content"id="panel2bh-header" >
                        <Typography className={classes.heading}>ICU BEDS</Typography>
                        <Typography className={classes.secondaryHeading}>Not Available</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading}>Address : </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary expandIcon={<LocalHospitalIcon style={{ color: "green" ,fontSize: 30 }} />} aria-controls="panel3bh-content" id="panel3bh-header" >
                        <Typography className={classes.heading}>AMBULANCE</Typography>
                        <Typography className={classes.secondaryHeading}>Available</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading}>Address : </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary expandIcon={<LocalTaxiSharpIcon style={{ color: "gold" ,fontSize: 30}} />} aria-controls="panel4bh-content" id="panel4bh-header" >
                        <Typography className={classes.heading}>PRIVATE TRANSPORT</Typography>
                        <Typography className={classes.secondaryHeading}>Not Available</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading}>Address : </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                    <AccordionSummary expandIcon={<VerifiedUserSharpIcon   style={{ color: "green" ,fontSize: 30}} />} aria-controls="panel5bh-content" id="panel5bh-header" >
                        <Typography className={classes.heading}>VACCINE</Typography>
                        <Typography className={classes.secondaryHeading}>Available</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading}>Address : </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                    <AccordionSummary expandIcon={<InvertColorsSharpIcon  style={{ color: "red" ,fontSize: 30}} />} aria-controls="panel4bh-content" id="panel4bh-header" >
                        <Typography className={classes.heading}>PLASMA</Typography>
                        <Typography className={classes.secondaryHeading}>Not Available</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.secondaryHeading}>Address : </Typography>
                    </AccordionDetails>
                </Accordion>
            </nav>
        </div>
    )
}
