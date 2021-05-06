import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core'
import React from 'react'
import { NavLink } from 'react-router-dom';

function Trail() {
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const accordian = [
        {
            id:'panel1',panelName:'',panelControl:'panel1bh-content',panelColor:'blue',panelText1:'Oxygen Cylinders',
            panelText2:'Available',panelId:'panel1bh-header',panelIcon:'🔋',panelData : [
                {
                    Id:'madhu1213',Quantity:'Oxygen Cylinder',Liters:1212,Price:1213,Address:'Ravuri vari street,Gunipudi'
                },
                {
                    Id:'madhu1213',Quantity:'Oxygen Cylinder',Liters:1212,Price:1213,Address:'Ravuri vari street,Gunipudi'
                },
                {
                    Id:'madhu1213',Quantity:'Oxygen Cylinder',Liters:1212,Price:1213,Address:'Ravuri vari street,Gunipudi'
                },
                {
                    Id:'madhu1213',Quantity:'Oxygen Cylinder',Liters:1212,Price:1213,Address:'Ravuri vari street,Gunipudi'
                },
                {
                    Id:'madhu1213',Quantity:'Oxygen Cylinder',Liters:1212,Price:1213,Address:'Ravuri vari street,Gunipudi'
                },
                
            ]
        },
        {
            id:'panel2',panelName:'',panelControl:'panel2bh-content',panelColor:'brown',panelText1:'ICU Beds',
            panelText2:'Available',panelId:'panel2bh-header',panelIcon:'🛏️',panelData : [
                {
                    Id:'madhu1213',Quantity:'Oxygen Cylinder',Liters:1212,Price:1213,Address:'Ravuri vari street,Gunipudi'
                },
            ]
        },
        {
            id:'panel3',panelName:'',panelControl:'panel3bh-content',panelColor:'green',panelText1:'Ambulance',
            panelText2:'Available',panelId:'panel3bh-header',panelIcon:'🚑',panelData : [
                {
                    Id:'madhu1213',Quantity:'Oxygen Cylinder',Liters:1212,Price:1213,Address:'Ravuri vari street,Gunipudi'
                },
            ]
        },
        {
            id:'panel4',panelName:'',panelControl:'panel4bh-content',panelColor:'gold',panelText1:'Private Transport',
            panelText2:'Available',panelId:'panel4bh-header',panelIcon:'🚖',panelData : [
                {
                    Id:'madhu1213',Quantity:'Oxygen Cylinder',Liters:1212,Price:1213,Address:'Ravuri vari street,Gunipudi'
                },
            ]
        },
        {
            id:'panel5',panelName:'',panelControl:'panel5bh-content',panelColor:'green',panelText1:'Vaccine',
            panelText2:'Available',panelId:'panel5bh-header',panelIcon:'💉',panelData : [
                {
                    Id:'madhu1213',Quantity:'Oxygen Cylinder',Liters:1212,Price:1213,Address:'Ravuri vari street,Gunipudi'
                },
            ]
        },
        {
            id:'panel6',panelName:'',panelControl:'panel6bh-content',panelColor:'red',panelText1:'Plasma',
            panelText2:'Available',panelId:'panel6bh-header',panelIcon:'🩸',panelData : [
                {
                    Id:'madhu1213',Quantity:'Oxygen Cylinder',Liters:1212,Price:1213,Address:'Ravuri vari street,Gunipudi'
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
    const classes = useStyles();
    return (
        <div>
            <nav className="glass">
                <br/><br/><br/><br/><br/><br/><br/><br/>
                {accordian.map((m)=>{
                    return(
                        <div>
                            <Accordion expanded={expanded === m.id} onChange={handleChange(m.id)}>
                                <AccordionSummary expandIcon={m.panelIcon} aria-controls={m.panelControl} id={m.panelId}>
                                    <Typography className={classes.heading}>{m.panelText1}</Typography>
                                    <Typography>{m.panelText2} </Typography>
                                </AccordionSummary>
                                    <AccordionDetails>
                                            <TableContainer>
                                                <Table aria-labelledby="tableTitle" size='small' aria-label="enhanced table">
                                                    <TableHead>
                                                        <TableCell>Select</TableCell>
                                                        <TableCell>UserName</TableCell>
                                                        <TableCell>Quantity</TableCell>
                                                        <TableCell>Liters</TableCell>
                                                        <TableCell>Price</TableCell>
                                                        <TableCell>Address</TableCell>
                                                    </TableHead>
                                                    <TableBody>
                                                        {m.panelData.map((p)=>{
                                                            return(
                                                                <div>
                                                                    <TableRow hover role="checkbox">
                                                                        <TableCell padding="checkbox">
                                                                            <Checkbox aria-label="ji" />
                                                                        </TableCell>
                                                                        <TableCell component="th" scope="row" padding="none">{p.Id}</TableCell>
                                                                        <TableCell align="right">{p.Quantity}</TableCell>
                                                                        <TableCell align="right">{p.Liters}</TableCell>
                                                                        <TableCell align="right">{p.Price}</TableCell>
                                                                        <TableCell align="right">{p.Address}</TableCell>
                                                                    </TableRow>
                                                                </div>
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
                    <Button  variant="contained" color="primary" >Show From Twitter</Button>
            </nav>
        </div>
    )
}

export default Trail
