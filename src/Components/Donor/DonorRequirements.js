import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Card, CardActions, CardContent, FormLabel, Grid, Icon, Input, TextField } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { NavLink} from 'react-router-dom'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {Menu,Segment,Sidebar, Reveal, Image, Header, Placeholder, TableBody, TableHeaderCell, TableRow, TableHeader, Table, MenuItem, Label, CardHeader} from 'semantic-ui-react';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import {  CardBody, CardFooter, Collapse} from 'reactstrap';
import cylinderImage from '../../Img/cylinder.png';
import userImage from '../../Img/user.png';
import bedImage from '../../Img/bed.png';
import ambulanceImage from '../../Img/ambulance.png';
import transportImage from '../../Img/transport.png';
import vaccineImage from '../../Img/vaccine.png';
import bloodImage from '../../Img/blood.png';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import DonorMap from '../Maps/DonorMap';

function exampleReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_ANIMATION':
            return { ...state, animation: action.animation, visible: !state.visible }
        case 'CHANGE_DIRECTION':
            return { ...state, direction: action.direction, visible: false }
        default:
        throw new Error()
    }
}


function DonorRequirements() {
    const [lat,setLat] = useState('');
            const [lng,setLng] = useState('');
            // setting modal
            useEffect(() => {
                    var options = {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    };
                    function success(pos) {
                        var crd = pos.coords;
                        setLat(crd.latitude)
                        setLng(crd.longitude)
                        return;
                    }
                    function error(err) {
                        console.warn(`ERROR(${err.code}): ${err.message}`);
                    }
                    navigator.geolocation.getCurrentPosition(success, error, options);
                    var k = 0;
                    const url = [
                    // Length issue
                    `https://gist.githubusercontent.com`,
                    `/farrrr/dfda7dd7fccfec5474d3`,
                    `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
                    ].join('')

                    fetch(url)
                    .then(res => res.json())
                    .then(data => {
                    })
                }, [])
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
    const [oxygenOpen,setOxygenOpen] = useState(false);
    const [ICUBeds,setICUBeds] = useState(false);
    const [ambulance,setAmbulance] = useState(false);
    const [privateTransport,setPrivateTransport] = useState(false);
    const [plasma,setPlasma] = useState(false);
    const [vaccine,setVaccine] = useState(false);
    const [setUp,setSetUP] = useState(false);
    // getting donor long,lati and address
    const [longLatt,setLongLatt] = useState('');
    const [donorAddress,setdonorAddress] = useState('')
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
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                setdonorAddress(response.display_name)
                return;
            }
        }
    }
    getCoordintes()
        }, [])
    const [login,setLogin] = useState(true);
    const [signup,setSignup] = useState(false);
    const [generate,setGenerate] = useState("Generate");
    const [userId,setUserId] = useState('');
    const [pass,setPass] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [code,setCode] = useState('');
    const names = [
            {id : 1 , value : 'Oxygen Cylinder' },
            {id : 2 , value : 'ICU Bed' },
            {id : 3 , value : 'Ambulance' },
            {id : 4 , value : 'Private Transport' },
            {id : 5 , value : 'Vaccine' },
            {id : 6 , value : 'Plasma' },
        ];
        var finalList = [];
        const handleInput = (option) =>{
            let index = finalList.indexOf(option)
            if(index > -1){
                finalList.splice(index, 1);
            }
            else{
                finalList.push(option)
            }
        }
    // 
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const [state, dispatch] = React.useReducer(exampleReducer, {
        animation: 'overlay',
        visible: false,
    })
    const { animation,direction, visible } = state
    const vertical = direction === 'bottom' || direction === 'top'
    const VerticalSidebar = ({ animation, direction, visible }) => (
        <Sidebar
            color = "blue"
            as={Menu}
            animation={animation}
            direction= "left"
            icon='labeled'
            inverted
            vertical
            visible={visible}
            width='thin'
        >
        <Menu.Item active  onClick={() => dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' })}>
            <HomeIcon  fontSize="large" />
            <h6>HOME</h6>
        </Menu.Item>
        <Menu.Item  onClick={() => {dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });setSetUP(true);setOxygenOpen(false);setICUBeds(false);setAmbulance(false);setPrivateTransport(false);setPlasma(false);setVaccine(false)}}>
            <PersonIcon  fontSize="large" />
            <h6>PROFILE</h6>
        </Menu.Item>
        <Menu.Item onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });setSetUP(false);setOxygenOpen(true);setICUBeds(false);setAmbulance(false);setPrivateTransport(false);setPlasma(false);setVaccine(false)}}>
            <img src={cylinderImage} alt="cylinders"/>
            <h6>Oxygen Cylinders</h6>
        </Menu.Item>
        <Menu.Item onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });setSetUP(false);setOxygenOpen(false);setICUBeds(true);setAmbulance(false);setPrivateTransport(false);setPlasma(false);setVaccine(false)}}>
            <img src={bedImage} alt="bed"/>
            <h6>ICU Beds</h6>    
        </Menu.Item>
        <Menu.Item onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });setSetUP(false);setOxygenOpen(false);setICUBeds(false);setAmbulance(true);setPrivateTransport(false);setPlasma(false);setVaccine(false)}}>
            <img src={ambulanceImage} alt="ambula"/>
            <h6>Ambulance</h6>
        </Menu.Item>
        <Menu.Item onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });setSetUP(false);setOxygenOpen(false);setICUBeds(false);setAmbulance(false);setPrivateTransport(true);setPlasma(false);setVaccine(false)}}>
            <img src={transportImage} alt="transport"/>
            <h6>Private Transport</h6>
        </Menu.Item>
        <Menu.Item onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });setSetUP(false);setOxygenOpen(false);setICUBeds(false);setAmbulance(false);setPrivateTransport(false);setPlasma(true);setVaccine(false)}}>
            <img src={bloodImage} alt="blood"/>
            <h6>Plasma</h6>    
        </Menu.Item>
        <Menu.Item onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });setSetUP(false);setOxygenOpen(false);setICUBeds(false);setAmbulance(false);setPrivateTransport(false);setPlasma(false);setVaccine(true)}}>
            <img src={vaccineImage} alt="vaccine"/>
            <h6>Vaccine</h6>
        </Menu.Item>
        <Menu.Item >
            <NavLink to="/">
            <ExitToAppIcon  fontSize="large" />
            <h6>SIGN OUT</h6>
            </NavLink>
        </Menu.Item>
    </Sidebar>
    
)
        const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const [oxygenMap,setOxygenMap] = useState(false);
    const [ICUMap,setICUMap] = useState(false);
    const [ambulanceMap,setAmbulanceMap] = useState(false);
    const [privateMap,setPrivateMap] = useState(false);
    const [plasmaMap,setPlasmaMap] = useState(false);
    const [vaccineMap,setVaccineMap] = useState(false);
    return (
        <div>
            {signup ? (<div>
                {generate === "Generate" ? (
							<div>
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
								<Input placeholder="10-digit-phone-number" type="number" value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)}/>{' '}
								<Button variant="contained" color="primary" endIcon={<Icon>send</Icon>} onClick={()=>{phoneNumber.length === 10 ? setGenerate('Submit') : alert("Enter valid Number");}}>
									{generate}
								</Button>
							</div>
						) : (
							<div>
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
								<Input placeholder="6-digit-code" value={code} onChange={event => setCode(event.target.value)}/>{' '}
                                <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>} onClick={()=>{setSignup(false);setLogin(true)}}>
									{generate}
								</Button>
							</div>
						)}
            </div>) : ( login ? (<div>
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                <div className="center"> 
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
                                    </Grid><br/><br/>
                                    <Button color="primary" variant="outlined" onClick={()=>{setLogin(false);}}>Login</Button>{' '}
                                    <Button color="secondary" variant="contained" onClick={()=>{setSignup(true);}}>Sign Up</Button>
                                </div>
            </div>) : (<div>
                    <div className="sideBar_pusher">
                <Button color="primary" variant="outlined" size="large"
                    onClick={() =>
                    dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' })}>
                    <MenuIcon />
                </Button>
                <Sidebar.Pushable  as={Segment} style={{ overflow: 'hidden',width:"350px",height:"900px" }} >
                    {!vertical && (
                        <VerticalSidebar
                            animation={animation}
                            direction={direction}
                            visible={visible}
                        />
                    )}
                <Sidebar.Pusher >
                    <Segment basic>
                    <div>
                        <Collapse isOpen={setUp}>
                                <Card>
                                    <CardFooter>
                                        <Button color="primary" variant="contained" size="large"><bold>User Details</bold></Button>
                                    </CardFooter>
                                    <CardBody>
                                        <strong>User ID : </strong><br/>
                                        <strong>UserName : </strong><br/>
                                        <strong>Permanent Address</strong><br/>
                                        <strong>Residental Address : </strong><br/>
                                        <strong>Contact Number : </strong><br/>
                                        <strong>Recent Interactions : </strong><br/>
                                    </CardBody>
                                    <CardFooter>
                                        <Button color="primary" variant="contained">Change Address</Button>
                                    </CardFooter>
                                </Card>
                        </Collapse>
                        <Collapse isOpen={oxygenOpen}>
                            {oxygenMap ? (<div>
                                <DonorMap lat={lat} lng={lng}/>
                            </div>) : (<div>
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
                                                    label='Verified ON'
                                                    type="text" 
                                                    value={oxygenVerifiedOn} 
                                                    onChange={event => setOxygenVerifiedOn(event.target.value)}
                                                    disabled
                                                    />
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className="column">
                                        <Grid container spacing={1} alignItems="flex-end">
                                            <Grid item>
                                                <TextField id="input-with-icon-grid" 
                                                    label='Verified By'
                                                    type="text" 
                                                    value={oxygenVerifiedBy} 
                                                    onChange={event => setOxygenVerifiedBy(event.target.value)}
                                                    disabled
                                                    />
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className="row">
                    <div className="column">
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <TextField id="input-with-icon-grid" 
                                    label={'Available Cylinders'} 
                                    type="text" 
                                    value={oxygenAvailability} 
                                    onChange={event => setOxygenAvailability(event.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className="column">
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <TextField id="input-with-icon-grid" 
                                    label='Cost per Cylinder'
                                    type="text" 
                                    value={oxygenPrice} 
                                    onChange={ event => setOxygenPrice(event.target.value)}
                                    />
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <Button color="secondary" variant="contained" onClick={()=>setOxygenMap(true)}>Change Address</Button>
                                </div>
                                </div>
                            </div>)}
                        </Collapse>
                    </div>
                    </Segment>
                </Sidebar.Pusher>
                </Sidebar.Pushable>
                </div>
            </div>))}
        </div>
    )
}

export default DonorRequirements
