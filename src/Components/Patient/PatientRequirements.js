import { Accordion, AccordionDetails, AccordionSummary, Badge, Button, Card, CardActions, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, Icon, Input, makeStyles, TextField, Typography } from '@material-ui/core'
import { AccountCircle, ExpandMoreSharp } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { ModalBody, ModalFooter, ModalTitle, Modal} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { NavLink, useLocation } from 'react-router-dom'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import DonorMap from '../Maps/DonorMap';
// 
import {SearchBox} from 'react-google-maps/lib/components/places/SearchBox'
import {Marker,GoogleMap,withScriptjs,withGoogleMap,InfoWindow,Polyline} from 'react-google-maps'
import { compose, lifecycle, withProps } from 'recompose';
const _ = require("lodash");

// 


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin:50,
    borderRadius:30,
    marginTop:'30%',
    paddingTop:30,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  header:{
    marginLeft:'50%',
  }
})

function PatientRequirements() {
    const[requiredAddress,setRequiredAddress] = useState([]);
    const [lng,setLng] = useState([]);
    const [lat,setLat] = useState([]);
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
                lat.push(p.geometry.viewport.La.g)
                lng.push(p.geometry.viewport.Ua.g)
                requiredAddress.push(p.formatted_address)
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
            placeholder="Hit Enter After Entering Details"
            style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `27px`,
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
    const [finalLat,setFinalLat] = useState(0);
    const [finalLng,setFinalLng] = useState(0);
    const [patientAddress,setPatientAddress] = useState('')
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
		setFinalLat(crd.latitude.toString())
		setFinalLng(crd.longitude.toString())
		var coordinates = [lat, lng];
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
            setPatientAddress(response.display_name);
			return;
		}
	}
}
getCoordintes()
    }, [])
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    // 
        const names = [
            {id : '1' , value : 'Oxygen Cylinders' },
            {id : '2' , value : 'ICU Beds' },
            {id : '3' , value : 'Ambulance' },
            {id : '4' , value : 'Private Transport' },
            {id : '5' , value : 'Vaccine' },
            {id : '6' , value : 'Plasma' },
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
        const classes = useStyles();
        const [login,setLogin] = useState(true);
    const [signup,setSignup] = useState(false);
    const [generate,setGenerate] = useState("Generate");
    const [userId,setUserId] = useState('');
    const [pass,setPass] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [code,setCode] = useState('');
    const [g,setG] = useState('')
    return (
        <nav className="glass">
            {/* MODELS */}
            <div>
                <Modal show={show1}>
                    <ModalHeader>
                        Changing Address
                    </ModalHeader>
                    <ModalBody>
                        {<MapWithASearchBox/>}
                    </ModalBody>
                    <ModalFooter>
                            <Button size="small" color="primary" variant="outlined" onClick={()=>{setShow1(false);setPatientAddress(requiredAddress[requiredAddress.length-1]);setFinalLat(lat[lat.length-1]);setFinalLng(lng[lng.length-1])}}>Set Address</Button>
                            <Button size="small" color="primary" variant="outlined" onClick={()=>{setShow1(false)}}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
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
                        <div className="alignList">
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            <div>
                                <Button color="primary" variant="outlined" onClick={()=>{setShow1(true)}}>Change Address</Button>
                            </div>
                        </Typography>
                        <FormControl>
                            <FormLabel>What Do You Need..?</FormLabel>
                            <FormGroup>
                                {names.map((n,key=n.id)=>{
                                    return(
                                        <div>
                                            <FormControlLabel
                                                control={<Checkbox name={n.value} color="primary"  onChange={()=>{handleInput(n.value)}}/>}
                                                label={n.value}
                                            />
                                        </div>
                                    )
                                })}
                            </FormGroup>
                            <br/><br/>
                            {patientAddress != '' ? (<div>
                                <NavLink
                                to={{
                                    pathname:'/patient-availability',
                                        state: {
                                            address:patientAddress,
                                            lat:finalLat,
                                            lng:finalLng,
                                            finallist:finalList,
                                            userId:1213,
                                            phoneNumber:1234567890,
                                        } 
                                    }}
                                    exact
                            >
                            <Button variant="contained" color="primary" >SEARCH</Button>
                            </NavLink>
                            </div>) : (<div>
                                <Button variant="contained" color="primary" type="submit" onClick={()=>{alert('Please allow location');window.location.reload(false)}}>SEARCH</Button>
                            </div>)}
                            {/* <NavLink
                                to={{
                                    pathname:'/patient-availability',
                                        state: {
                                            address:patientAddress,
                                            required:requiredAddress,
                                            location:longLatt,
                                            finallist:finalList,
                                            userId:1213,
                                            phoneNumber:1234567890,
                                        } 
                                    }}
                                    exact
                            >
                            <Button variant="contained" color="primary" >SEARCH</Button>
                            </NavLink> */}
                        </FormControl>
                        </CardContent>
                    </Card>
            </div>
            </div>))}
        </nav>
    )
}

export default PatientRequirements
