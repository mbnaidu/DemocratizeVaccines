import { Accordion, AccordionDetails, AccordionSummary, Button,Card,Grid,Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TextField } from '@material-ui/core'
import { AccountCircle, PhotoTwoTone } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { NavLink} from 'react-router-dom'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {Menu,Segment,Sidebar} from 'semantic-ui-react';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import {  CardBody, CardFooter, Collapse} from 'reactstrap';
import cylinderImage from '../../Img/cylinder.png';
import bedImage from '../../Img/bed.png';
import ambulanceImage from '../../Img/ambulance.png';
import transportImage from '../../Img/transport.png';
import vaccineImage from '../../Img/vaccine.png';
import bloodImage from '../../Img/blood.png';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';
import {SearchBox} from 'react-google-maps/lib/components/places/SearchBox'
import {Marker,GoogleMap,withScriptjs,withGoogleMap} from 'react-google-maps'
import { compose, lifecycle, withProps } from 'recompose';
const _ = require("lodash");

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
            const [donorAddress,setdonorAddress] = useState('')

            const [lng,setLng] = useState('');
            // setting modal
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
            setLat(lat);setLng(lng);
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
                }, []);
    // VARIABLES
            var tempDate = new Date();
            var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
            const [uploadDate,setUploadDate] = useState(date);
    // Oxygen
            const [oxygenAvailability,setOxygenAvailability] = useState('');
            const [oxygenPrice,setOxygenPrice] = useState('');
        // ICU
            const [bedAvailability,setBedAvailability] = useState('');
            const [bedPrice,setBedPrice] = useState('');
        // Ambulance
            const [ambulanceAvailability,setAmbulanceAvailability] = useState('');
            const [ambulancePrice,setAmbulancePrice] = useState('');
        // Private
            const [privateTransportAvailability,setPrivateTransportAvailability] = useState('');
            const [privateTransportCostPerKm,setPrivateTransportCostPerKm] = useState('');
        // Vaccine
            const [vaccineAvailability,setVaccineAvailability] = useState('');
            const [vaccinePrice,setVaccinePrice] = useState('');            
        // Blood
            const [bloodAvailability,setBloodAvailability] = useState('');
            const [bloodPrice,setBloodPrice] = useState('');    
    const [setUp,setSetUP] = useState(false);
    // getting donor long,lati and address
    const [login,setLogin] = useState(true);
    const [signup,setSignup] = useState(false);
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [userId,setUserId] = useState('');
    const [pass,setPass] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
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
    const [oxygenOpen,setOxygenOpen] = useState(false);
    const [ICUBeds,setICUBeds] = useState(false);
    const [ambulance,setAmbulance] = useState(false);
    const [privateTransport,setPrivateTransport] = useState(false);
    const [plasma,setPlasma] = useState(false);
    const [vaccine,setVaccine] = useState(false);
    const [oxygenMap,setOxygenMap] = useState(false);
    const [ICUMap,setICUMap] = useState(false);
    const [ambulanceMap,setAmbulanceMap] = useState(false);
    const [privateMap,setPrivateMap] = useState(false);
    const [plasmaMap,setPlasmaMap] = useState(false);
    const [vaccineMap,setVaccineMap] = useState(false);
    const [donorId,setDonorId] = useState('');
    const [donorNumber,setDonorNumber] = useState('');
    const sendSignUpDetails = () =>{
        if(userId !== '' && pass !== '' && phoneNumber !== ''){
            const data = {
                "username":userId,
                "password":pass,
                "latitude":lat,
                "longitude":lng,
                "address":donorAddress,
                "contact":phoneNumber,
                "isDonor": true,
            }
            axios.post('http://localhost:3010/donorsignup', {data}).then(
                function(res) {
                    if(res.data) {
                    }
                }
            )
            setSignup(false)
        }
        else{
            alert('Please Fill All the details')
        }
    }
    const sendLoginDetails = () => {
        const data = {
            "username":username,
            "password":pass
        }
        axios.post('http://localhost:3010/donorlogin', {data}).then(
            function(res) {
                if(res.data.msg) {
                    alert(res.data.msg);
                } else {
                    setDonorId(res.data.status[0]._id);
                    setLogin(false);
                }
            }
        )
    }
    const sendDetails = (d,p) =>{
        const data = {
                "latitude":lat,
                "longitude":lng,
                "address":donorAddress,
                "latitude1":lat1,
                "longitude1":lng1,
                "address1": donorAddress1,
                "datas":d,
                "donorId":donorId,
            }
            // axios.post('http://localhost:3010/update/'+donorId, data).then(
            //     function(res) {
            //         if(res.data) {
            //         }
            //     }
            // )
            axios.post('http://localhost:3010/adddonordata', {data}).then(
                function(res) {
                    if(res.data) {
                    }
                }
            )
    }
    const [userData,setUserData] = useState([]);
    const getData = () => {
        axios.get('http://localhost:3010/'+donorId)
            .then(response => {
                setUserData(response.data.datas)
                setdonorAddress(response.data.address);
                setDonorNumber(response.data.contact)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    const deleteData = (id,datas) =>{
        const data = {
            "datas":datas,
            "donorId":donorId
        }
        axios.delete('http://localhost:3010/'+id,{data})
            .then(response => { console.log(response.data)});
    }
    const deleteDonor = ()=>{
        {userData.length === 0 ? axios.delete('http://localhost:3010/deletedonor/'+donorId)
            .then(response => { console.log(response.data)}) : alert('Please delete below data')}
        
    }
    const [lat1,setLat1] = useState('');
    const [donorAddress1,setdonorAddress1] = useState('')
    const [lng1,setLng1] = useState('');
    const google = window.google = window.google ? window.google : {}
    const MapWithASearchBox = compose(
        withProps({
            googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCSozCpAn3_xhiippC2_03Gd524yLtwu4E&v=3.exp&libraries=geometry,drawing,places",
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `400px` }} />,
            mapElement: <div style={{ height: `100%` }} />,
        }),
        lifecycle({
            componentWillMount() {
            const refs = {}
            this.setState({
                bounds: null,
                center: {
                lat: 41.9, lng: -87.624
                },
                markers: [],
                onMapMounted: ref => {
                refs.map = ref;
                },
                onBoundsChanged: () => {
                this.setState({
                    bounds: refs.map.getBounds(),
                    center: refs.map.getCenter(),
                })
                },
                onSearchBoxMounted: ref => {
                refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                const places = refs.searchBox.getPlaces();
                const bounds = new google.maps.LatLngBounds();
                places.forEach(place => {
                    if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport)
                    } else {
                    bounds.extend(place.geometry.location)
                    }
                });
                const nextMarkers = places.map(place => ({
                    position: place.geometry.location,
                }));
                places.map((p)=>{
                    setLat1(p.geometry.viewport.La.g)
                    setLng1(p.geometry.viewport.Ua.g)
                    setdonorAddress1(p.formatted_address)
                })
                const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
                this.setState({
                    center: nextCenter,
                    markers: nextMarkers,
                });
                // refs.map.fitBounds(bounds);
                },
            })
            },
        }),
        withScriptjs,
        withGoogleMap
        )(props =>
        <GoogleMap
            ref={props.onMapMounted}
            defaultZoom={15}
            center={props.center}
            onBoundsChanged={props.onBoundsChanged}
        >
            <SearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            controlPosition={google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={props.onPlacesChanged}
            >
            <input
                type="text"
                placeholder="Hit Enter After Search"
                style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                marginTop: `60px`,
                marginLeft:`-100px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                }}
            />
            </SearchBox>
            {props.markers.map((marker, index) =>
            <Marker key={index} position={marker.position} />
            )}
        </GoogleMap>
        );
        const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <div>
            {signup ? (<div>
                <div className="center"> 
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" label="Username" value={userId} onChange={event => setUserId(event.target.value)}/>
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
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <PhotoTwoTone />
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" label="Contact Number" type="number" value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)}/>
                        </Grid>
                    </Grid>
                    <br/><br/>
                    <Button color="primary" variant="outlined" onClick={()=>{setSignup(false)}}>Back to Login</Button>{' '}
                    <Button color="secondary" variant="contained" onClick={()=>{sendSignUpDetails()}}>Sign Up</Button>
                </div>
            </div>) : ( login ? (<div>
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                <div className="center"> 
                                    <Grid container spacing={1} alignItems="flex-end">
                                        <Grid item>
                                            <AccountCircle />
                                        </Grid>
                                        <Grid item>
                                            <TextField id="input-with-icon-grid" label="Username" value={username} onChange={event => setUsername(event.target.value)}/>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1} alignItems="flex-end">
                                        <Grid item>
                                            <VpnKeyIcon />
                                        </Grid>
                                        <Grid item>
                                            <TextField id="input-with-icon-grid" label="Password" type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                                        </Grid>
                                    </Grid><br/><br/>
                                    <Button color="primary" variant="outlined" onClick={()=>{sendLoginDetails()}}>Login</Button>{' '}
                                    <Button color="secondary" variant="contained" onClick={()=>{setSignup(true);}}>Sign Up</Button>
                                </div>
            </div>) : (<div>
                    <div className="sideBar_pusher">
                <Button color="primary" variant="outlined" size="large"
                    onClick={() =>
                    {dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });getData()}}>
                    <MenuIcon />
                </Button>
                <Sidebar.Pushable  as={Segment} style={{ overflow: 'auto',width:"350px",height:"900px" }} >
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
                                        <Button color="primary" variant="contained" size="large" onClick={()=>{deleteDonor()}}><bold>Delete This Account</bold></Button>
                                    </CardFooter>
                                    <CardBody>
                                        <strong>User ID : </strong>{donorId}<br/>
                                        <strong>UserName : </strong>{username}<br/>
                                        <strong>Permanent Address </strong>{donorAddress}<br/>
                                        <strong>Contact Number : </strong>{donorNumber}<br/>
                                    </CardBody>
                                    <CardFooter>
                                    </CardFooter>
                                </Card>
                                {userData.map((m)=>{
                                    return(
                                        <div>
                                            {m.datas.map((u)=>{
                                    return(
                                        <div>
                                            <Accordion expanded={expanded === u.date} onChange={handleChange(u.date)}>
                                                <AccordionSummary>{u.type}</AccordionSummary>
                                                <AccordionDetails>
                                                    <TableContainer>
                                                        <Table>
                                                            <TableHead>
                                                                <TableCell>Username</TableCell>
                                                                <TableCell>Type</TableCell>
                                                                <TableCell>Uploaded Date</TableCell>
                                                                <TableCell>Quantity</TableCell>
                                                                <TableCell>Price</TableCell>
                                                                <TableCell>Verifications</TableCell>
                                                                <TableCell>Permanent Address</TableCell>
                                                                <TableCell>New Address</TableCell>
                                                            </TableHead>
                                                            <TableBody>
                                                                <TableCell>{u.UserName}</TableCell>
                                                                <TableCell>{u.type}</TableCell>
                                                                <TableCell>{u.date}</TableCell>
                                                                <TableCell>{u.quantity}</TableCell>
                                                                <TableCell>{u.price}</TableCell>
                                                                <TableCell>Verifications</TableCell>
                                                                <TableCell>{u.address}</TableCell>
                                                                <TableCell>{u.address1}</TableCell>
                                                            </TableBody>
                                                            <TableFooter>
                                                                <Button color="primary" variant="contained" onClick={()=>{deleteData(m._id,m)}}>DELETE</Button>
                                                            </TableFooter>
                                                        </Table>
                                                    </TableContainer>
                                                </AccordionDetails>
                                            </Accordion>
                                        </div>
                                    )
                                })}
                                        </div>
                                    )
                                })}
                                
                        </Collapse>
                        <Collapse isOpen={oxygenOpen}>
                            {oxygenMap ? (<div>
                                {MapWithASearchBox()}
                                <Button color="primary" variant="contained" onClick={()=>{setOxygenMap(false)}}>CLOSE</Button>
                            </div>) : (<div>
                                <div>
                                    <div className="row">
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" label="UserID" value={donorId} disabled/>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" label="UserName" value={username} disabled/>
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
                                                    <TextField id="input-with-icon-grid"  value={donorAddress} disabled />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid"  placeholder="New Address" value={donorAddress1} disabled />
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
                                    <Button color="primary" variant="contained" onClick={()=>{sendDetails({UserName:username,date:tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds(),type:"Oxygen Cylinders",price:oxygenPrice,quantity:oxygenAvailability,address:donorAddress,address1:donorAddress1,verifications:[]})}}>Submit</Button>
                                </div>
                                </div>
                            </div>)}
                        </Collapse>
                        <Collapse isOpen={ICUBeds}>
                            {ICUMap ? (<div>
                                {MapWithASearchBox()}
                                <Button color="primary" variant="contained" onClick={()=>{setICUMap(false)}}>CLOSE</Button>
                            </div>) : (<div>
                                <div>
                                    <div className="row">
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" label="UserID" value={donorId} disabled/>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" label="UserName" value={username} disabled/>
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
                                                    <TextField id="input-with-icon-grid"  value={donorAddress} disabled />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid"  placeholder="New Address" value={donorAddress1} disabled />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="row">
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" 
                                                        label={'Available Beds'} 
                                                        type="text" 
                                                        value={bedAvailability} 
                                                        onChange={event => setBedAvailability(event.target.value)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" 
                                                        label='Cost per Single Bed'
                                                        type="text" 
                                                        value={bedPrice} 
                                                        onChange={ event => setBedPrice(event.target.value)}
                                                        />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                    
                                    <Button color="secondary" variant="contained" onClick={()=>setICUMap(true)}>Change Address</Button>
                                    <Button color="primary" variant="contained" onClick={()=>{sendDetails({UserName:username,date:tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds(),type:"ICU BEDS",price:bedPrice,quantity:bedAvailability,address:donorAddress,address1:donorAddress1,verifications:['18pa1a1213@gmail.com - 02/03/2020']})}}>Submit</Button>
                                </div>
                                </div>
                            </div>)}
                        </Collapse>
                        <Collapse isOpen={ambulance}>
                            {ambulanceMap ? (<div>
                                {MapWithASearchBox()}
                                <Button color="primary" variant="contained" onClick={()=>{setAmbulanceMap(false)}}>CLOSE</Button>
                            </div>) : (<div>
                                <div>
                                    <div className="row">
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" label="UserID" value={donorId} disabled/>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" label="UserName" value={username} disabled/>
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
                                                    <TextField id="input-with-icon-grid"  value={donorAddress} disabled />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid"  placeholder="New Address" value={donorAddress1} disabled />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="row">
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" 
                                                        label={'Available Vehicles'} 
                                                        type="text" 
                                                        value={ambulanceAvailability} 
                                                        onChange={event => setAmbulanceAvailability(event.target.value)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" 
                                                        label={'Cost Per Km'} 
                                                        type="text" 
                                                        value={ambulancePrice} 
                                                        onChange={event => setAmbulancePrice(event.target.value)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                    
                                    <Button color="secondary" variant="contained" onClick={()=>setAmbulanceMap(true)}>Change Address</Button>
                                    <Button color="primary" variant="contained" onClick={()=>{sendDetails({UserName:username,date:tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds(),type:"AMBULANCE",price:ambulancePrice,quantity:ambulanceAvailability,address:donorAddress,address1:donorAddress1,verifications:[]})}}>Submit</Button>
                                </div>
                                </div>
                            </div>)}
                        </Collapse>
                        <Collapse isOpen={privateTransport}>
                            {privateMap ? (<div>
                                {MapWithASearchBox()}
                                <Button color="primary" variant="contained" onClick={()=>{setPrivateMap(false)}}>CLOSE</Button>
                            </div>) : (<div>
                                <div>
                                    <div className="row">
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" label="UserID" value={donorId} disabled/>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" label="UserName" value={username} disabled/>
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
                                                    <TextField id="input-with-icon-grid"  value={donorAddress} disabled />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid"  placeholder="New Address" value={donorAddress1} disabled />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="row">
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" 
                                                        label={'Available Vehicles'} 
                                                        type="text" 
                                                        value={privateTransportAvailability} 
                                                        onChange={event => setPrivateTransportAvailability(event.target.value)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" 
                                                        label='Cost per km'
                                                        type="text" 
                                                        value={privateTransportCostPerKm} 
                                                        onChange={ event => setPrivateTransportCostPerKm(event.target.value)}
                                                        />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                    
                                    <Button color="secondary" variant="contained" onClick={()=>setPrivateMap(true)}>Change Address</Button>
                                    <Button color="primary" variant="contained" onClick={()=>{sendDetails({UserName:username,date:tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds(),type:"PRIVATE TRANSPORT",price:privateTransportCostPerKm,quantity:privateTransportAvailability,address:donorAddress,address1:donorAddress1,verifications:[]})}}>Submit</Button>
                                </div>
                                </div>
                            </div>)}
                        </Collapse>
                        <Collapse isOpen={plasma}>
                            {plasmaMap ? (<div>
                                {MapWithASearchBox()}
                                <Button color="primary" variant="contained" onClick={()=>{setPlasmaMap(false)}}>CLOSE</Button>
                            </div>) : (<div>
                                <div>
                                    <div className="row">
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" label="UserID" value={donorId} disabled/>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" label="UserName" value={username} disabled/>
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
                                                    <TextField id="input-with-icon-grid"  value={donorAddress} disabled />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid"  placeholder="New Address" value={donorAddress1} disabled />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="row">
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" 
                                                        label={'Available Bloods Groups'} 
                                                        type="text" 
                                                        value={bloodAvailability} 
                                                        onChange={event => setBloodAvailability(event.target.value)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" 
                                                        label='Cost per ...'
                                                        type="text" 
                                                        value={bloodPrice} 
                                                        onChange={ event => setBloodPrice(event.target.value)}
                                                        />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                    
                                    <Button color="secondary" variant="contained" onClick={()=>setPlasmaMap(true)}>Change Address</Button>
                                    <Button color="primary" variant="contained" onClick={()=>{sendDetails({UserName:username,date:tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds(),type:"BLOOD",price:bloodPrice,quantity:bloodAvailability,address:donorAddress,address1:donorAddress1,verifications:[]})}}>Submit</Button>
                                </div>
                                </div>
                            </div>)}
                        </Collapse>
                        <Collapse isOpen={vaccine}>
                            {vaccineMap ? (<div>
                                {MapWithASearchBox()}
                                <Button color="primary" variant="contained" onClick={()=>{setVaccineMap(false)}}>CLOSE</Button>
                            </div>) : (<div>
                                <div>
                                    <div className="row">
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" label="UserID" value={donorId} disabled/>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" label="UserName" value={username} disabled/>
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
                                                    <TextField id="input-with-icon-grid"  value={donorAddress} disabled />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid"  placeholder="New Address" value={donorAddress1} disabled />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="row">
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" 
                                                        label={'Available Vaccine types'} 
                                                        type="text" 
                                                        value={vaccineAvailability} 
                                                        onChange={event => setVaccineAvailability(event.target.value)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="column">
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <TextField id="input-with-icon-grid" 
                                                        label='Cost per Single Vaccine'
                                                        type="text" 
                                                        value={vaccinePrice} 
                                                        onChange={ event => setVaccinePrice(event.target.value)}
                                                        />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                    
                                    <Button color="secondary" variant="contained" onClick={()=>setVaccineMap(true)}>Change Address</Button>
                                    <Button color="primary" variant="contained" onClick={()=>{sendDetails({UserName:username,date:tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds(),type:"VACCINE",price:vaccinePrice,quantity:vaccineAvailability,address:donorAddress,address1:donorAddress1,verifications:[]})}}>Submit</Button>
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
