import { Button, Card, CardActions, CardContent, CardHeader, Grid, makeStyles, TextField } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons';
import React, { useState } from 'react'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MailIcon from '@material-ui/icons/Mail';
import CallIcon from '@material-ui/icons/Call';
import profilepic from '../../Img/volunteerlogin.webp'
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    login: {
        minWidth:'auto',
        margin:30,
        borderRadius:30,
        marginTop:'40%',
        paddingTop:30,
        paddingBottom:30,
    },
    signup: {
        minWidth:'auto',
        margin:30,
        borderRadius:30,
        marginTop:'10%',
        paddingTop:30,
        paddingBottom:30,
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

function VolunteerRequirements() {
    const classes = useStyles();
    const [userId,setUserId] = useState('');
    const [pass,setPass] = useState('');
    const [email,setEmail] = useState('');
    const [contactNumber,setContactNumber] = useState('');
    const [flip,setFlip] = useState(true)
    return (
        <div>
            <nav className="glass">
				{flip ? (<div>
                    <Card className={classes.login}>
                    <div className="center"> 
                    <img src={profilepic} className="profilepic" />
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <AccountCircle />
                                </Grid>
                                <Grid item>
                                    <TextField id="input-with-icon-grid" label="UserID" value={userId} onChange={event => setUserId(event.target.value)}/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <VpnKeyIcon />
                            </Grid>
                            <Grid item>
                                <TextField id="input-with-icon-grid" label="Password" type="password" value={pass} onChange={event => setPass(event.target.value)}/>
                            </Grid>
                        </Grid>
                        <br/><br/>
                        <NavLink to='/volunteer-availability'><Button color="primary" variant="outlined">Login</Button>{' '}</NavLink>
                        <Button color="secondary" variant="contained" onClick={()=>{setFlip(false);}}>Sign Up</Button>
                    </div>
                    </Card>
                </div>) : (<div>
                    <Card className={classes.signup}>
                        <img src={profilepic} className="profilepic" />
                    <div className="center"> 
                        <Grid container spacing={1} alignItems="flex-end" >
                            <Grid item>
                                <AccountCircle />
                            </Grid>
                            <Grid item>
                                <TextField id="input-with-icon-grid" label="UserID" value={userId} onChange={event => setUserId(event.target.value)}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <MailIcon />
                            </Grid>
                            <Grid item>
                                <TextField id="input-with-icon-grid" label="E-Mail" value={email} onChange={event => setEmail(event.target.value)}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <CallIcon />
                            </Grid>
                            <Grid item>
                                <TextField id="input-with-icon-grid" label="Conact Number" value={contactNumber} onChange={event => setContactNumber(event.target.value)}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <VpnKeyIcon />
                            </Grid>
                            <Grid item>
                                <TextField id="input-with-icon-grid" label="Password" type="password" value={pass} onChange={event => setPass(event.target.value)}/>
                            </Grid>
                        </Grid><br/><br/>
                        <Button color="primary" variant="outlined" onClick={()=>{setFlip(true);}}>Back to login</Button>{' '}
                        <Button color="secondary" variant="contained" onClick={()=>{setFlip(true);}}>Sign Up</Button>
                    </div>
                </Card>
                </div>)}
			</nav>
        </div>
    )
}

export default VolunteerRequirements
