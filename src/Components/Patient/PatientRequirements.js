import { Accordion, AccordionDetails, AccordionSummary, Badge, Button, Card, CardActions, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, Icon, Input, makeStyles, Slider, TextField, Typography } from '@material-ui/core'
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


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        margin:50,
        borderRadius:30,
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
    },
    root1: {
        margin:0,
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        flexBasis: '100%',
        flexShrink: 0,
    },
    root2:{
        marginRight:"auto",
        marginLeft:"auto"
    }
}));

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
    // 
        const names = [
            {id : '1' , value : 'Oxygen Cylinders' },
            {id : '2' , value : 'ICU Beds' },
            {id : '3' , value : 'Ambulance' },
            {id : '4' , value : 'Private Transport' },
            {id : '5' , value : 'Vaccine' },
            {id : '6' , value : 'Plasma' },
        ];
        const home = [
            {id : '11' , value : 'Electrician' },
            {id : '12' , value : 'Grocery' },
            {id : '13' , value : 'Doctors' },
            {id : '14' , value : 'Covid Assistance' },
            {id:'15' , value : 'Medical Stores'}
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
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
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
            <div className={classes.root}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <div>
                        <Button color="primary" variant="outlined" onClick={()=>{setShow1(true)}}>Change Address</Button>
                    </div>
                </Typography>
                <Slider
                    defaultValue={10}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-always"
                    step={1}
                    marks={kms}
                    valueLabelDisplay="on"
                />
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className={classes.root1}>
                    <AccordionSummary expandIcon={<ExpandMoreSharp />} aria-controls="panel2bh-content" id="panel2bh-header" >
                    <Typography className={classes.heading}>Patient Appliances</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="alignList" className={classes.root2}>
                            <FormControl >
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
                                {/* {patientAddress != '' ? (<div>
                                    <NavLink
                                    to={{
                                        pathname:'/patient-availability',
                                            state: {
                                                address:patientAddress,
                                                lat:finalLat,
                                                lng:finalLng,
                                                finallist:finalList,
                                            } 
                                        }}
                                        exact
                                >
                                <Button variant="contained" color="primary" >SEARCH</Button>
                                </NavLink>
                                </div>) : (<div>
                                    <Button variant="contained" color="primary" type="submit" onClick={()=>{alert('Please allow location');window.location.reload(false)}}>SEARCH</Button>
                                </div>)} */}
                                <NavLink
                                    to={{
                                        pathname:'/patient-availability',
                                            state: {
                                                address:patientAddress,
                                                lat:finalLat,
                                                lng:finalLng,
                                                finallist:finalList,
                                            } 
                                        }}
                                        exact
                                >
                                <Button variant="contained" color="primary" >SEARCH</Button>
                                </NavLink>
                            </FormControl>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <br/>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className={classes.root1}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreSharp />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                    <Typography className={classes.heading}>Home Appliances</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            {home.map((n,key=n.id)=>{
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
                    </AccordionDetails>
                </Accordion>
            </div>
        </nav>
    )
}

export default PatientRequirements
