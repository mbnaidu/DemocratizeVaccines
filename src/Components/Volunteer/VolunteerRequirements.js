import { Button, Card, CardActions, CardContent, Checkbox, FormControl, FormControlLabel, Grid, makeStyles, Radio, RadioGroup, Slider, TextField, Typography, withStyles } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MailIcon from '@material-ui/icons/Mail';
import CallIcon from '@material-ui/icons/Call';
import profilepic from '../../Img/volunteerlogin.webp'
import signuppic from '../../Img/volunteersignup.jpg'
import { NavLink } from 'react-router-dom';
import { green } from '@material-ui/core/colors';


const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
        color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);
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
        margin:20,
        borderRadius:30,
        marginTop:'30%',
        paddingTop:30,
        paddingBottom:30,
    },
    formControl: {
        margin: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1, 1, 0, 0),
    },
}));

function VolunteerRequirements() {
    const classes = useStyles();
    const [userId,setUserId] = useState('');
    const [pass,setPass] = useState('');
    const [email,setEmail] = useState('');
    const [contactNumber,setContactNumber] = useState('');
    const [flip,setFlip] = useState(true);
    const [select,setSelect] = useState(false);
    const [kms,setkms] = useState([
        {value:10,label:'10 Kms'},
        {value: 50,label: '50 Kms'},
        {value: 100,label: '100 Kms'}
    ])
    const[range,setRange] = useState('');
    function valuetext(value) {
        setRange(`${value}`)
        return `${value}`;
    }
    const [finalList,setFinalList] = useState('')
        const handleInput = (option) =>{
            let index = finalList.indexOf(option)
            if(index > -1){
                setFinalList('')
            }
            else{
                setFinalList(option)
            }
        }
    const [longLatt,setLongLatt] = useState('');
    const [volunteerAddress,setVolunteerAddress] = useState('')
        useEffect(() => {
            const getCoordintes = ()=> {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        function success(pos) {
            var crd = pos.coords;
            var lat = crd.latitude.toString();
            var lng = crd.longitude.toString();
            var coordinates = [lat, lng];
            setLongLatt(`Latitude: ${lat}, Longitude: ${lng}`)
            getCity(coordinates);
            return;
        }
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
    }
    // Step 2: Get city name
    const getCity = (coordinates) =>{
        var xhr = new XMLHttpRequest();
        var lat = coordinates[0];
        var lng = coordinates[1];

        // Paste your LocationIQ token below.
        xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.a38452a5c36ea022c35226791e032ecd&lat=" +
        lat + "&lon=" + lng + "&format=json", true);
        xhr.send();
        xhr.onreadystatechange = processRequest;
        xhr.addEventListener("readystatechange", processRequest, false);

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                setVolunteerAddress(response.display_name)
                return;
            }
        }
    }
    getCoordintes()
        }, []);
    const [type,setType] = useState('');
    return (
        <div>
            <nav className="glass">
                {select ? (<div>
                    <Card className={classes.login}>
                        <CardContent >
                            <FormControl component="fieldset" >
                                <div className={classes.root}>
                                    <Typography id="discrete-slider-always" gutterBottom>
                                        Set Range
                                    </Typography>
                                    <Slider
                                        defaultValue={10}
                                        getAriaValueText={valuetext}
                                        aria-labelledby="discrete-slider-always"
                                        step={1}
                                        marks={kms}
                                        valueLabelDisplay="on"
                                        />
                                    </div>
                                    <RadioGroup aria-label="quiz" name="quiz">
                                        <FormControlLabel value="verified" control={<GreenRadio />} label="Show Verified Profiles" onChange={()=>setType('verified')}/>
                                        <FormControlLabel value="notverified" control={<GreenRadio />} label="Show UnVerified Profiles"  onChange={()=>setType('notverified')}/>
                                        <FormControlLabel value="patient" control={<GreenRadio />} label="Show My Requests" onChange={()=>setType('patient')}/>
                                    </RadioGroup>
                                    <FormControlLabel value="volunteers" control={<Checkbox />} label="Check Other Volunteers" onChange={()=>handleInput('volunteers')}/>
                                    {/* {volunteerAddress != '' ? (<div>
                                    <NavLink
                                    to={{
                                        pathname:'/volunteer-availability',
                                            state: {
                                                address:volunteerAddress,
                                                location:longLatt,
                                                finallist:finalList,
                                                type:type,
                                                range:range
                                            } 
                                        }}
                                        exact
                                >
                                <Button variant="contained" color="primary" className={classes.button} >Get Details</Button>
                                </NavLink>
                                </div>) : (<div>
                                    <Button variant="contained" color="primary" className={classes.button} onClick={()=>{alert('Please allow location');window.location.reload(false)}}>Get Details</Button>
                                </div>)} */}
                                <NavLink
                                    to={{
                                        pathname:'/volunteer-availability',
                                            state: {
                                                address:volunteerAddress,
                                                location:longLatt,
                                                finallist:finalList,
                                                type:type,
                                                range:range
                                            } 
                                        }}
                                        exact
                                >
                                <Button variant="contained" color="primary" className={classes.button} >Get Details</Button>
                                </NavLink>
                            </FormControl>
                        </CardContent>
                    </Card>
                </div>) : (flip ? (<div>
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
                                    <CardActions>
                                        <Button color="primary" variant="outlined"  className={classes.button} onClick={()=>{setSelect(true)}}>Login</Button>{' '}
                                        <Button color="secondary" variant="contained"  className={classes.button} onClick={()=>{setFlip(false);}}>Sign Up</Button>
                                    </CardActions>
                                </div>
                            </Card>
                </div>) : (<div>
                            <Card className={classes.signup}>
                                <img src={signuppic} className="profilepic" />
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
                                    <CardActions>
                                        <Button color="secondary" variant="contained"  className={classes.button} onClick={()=>{setFlip(true);}} size="large">Sign Up</Button>
                                    </CardActions>
                                    <CardActions>
                                        <Button color="primary" variant="outlined"  className={classes.button} onClick={()=>{setFlip(true);}}>Back to login</Button>{' '}
                                    </CardActions>
                                </div>
                            </Card>
                </div>))}
			</nav>
        </div>
    )
}

export default VolunteerRequirements
