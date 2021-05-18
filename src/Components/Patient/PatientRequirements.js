import { Accordion, AccordionDetails, AccordionSummary, Badge, Button, Card, CardActions, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, Icon, Input, makeStyles, Slider, TableCell, TableContainer, TableHead, TextField, Typography } from '@material-ui/core'
import { AccountCircle, Call, ExpandMoreSharp, Group } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import {  CardBody, CardFooter, Collapse} from 'reactstrap';
import { ModalBody, ModalFooter, ModalTitle, Modal} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { NavLink, useLocation } from 'react-router-dom'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import DonorMap from '../Maps/DonorMap';
import {Menu,Segment,Sidebar, Reveal, Image, Header, Placeholder, TableBody, TableHeaderCell, TableRow, TableHeader, Table, MenuItem, Label, CardHeader} from 'semantic-ui-react';
import MenuIcon from '@material-ui/icons/Menu';import PersonIcon from '@material-ui/icons/Person';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {SearchBox} from 'react-google-maps/lib/components/places/SearchBox'
import {Marker,GoogleMap,withScriptjs,withGoogleMap,InfoWindow,Polyline} from 'react-google-maps'
import { compose, lifecycle, withProps } from 'recompose';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Map from '../Maps/PatientMap';

import cylinderImage from '../../Img/cylinder.png';
import userImage from '../../Img/user.png';
import bedImage from '../../Img/bed.png';
import ambulanceImage from '../../Img/ambulance.png';
import transportImage from '../../Img/transport.png';
import vaccineImage from '../../Img/vaccine.png';
import bloodImage from '../../Img/blood.png';
import { Dropdown } from 'bootstrap';







const _ = require("lodash");

// 



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
    const [oxygenOpen,setOxygenOpen] = useState(false);
    const [ICUBeds,setICUBeds] = useState(false);
    const [ambulance,setAmbulance] = useState(false);
    const [privateTransport,setPrivateTransport] = useState(false);
    const [plasma,setPlasma] = useState(false);
    const [vaccine,setVaccine] = useState(false);
    const [setUp,setSetUP] = useState(false);

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
        <Menu.Item onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });setDetails(oxygen);setSetUP(false);setOxygenOpen(true);setICUBeds(false);setAmbulance(false);setPrivateTransport(false);setPlasma(false);setVaccine(false)}}>
            <img src={cylinderImage} alt="cylinders"/>
            <h6>Oxygen Cylinders</h6>
        </Menu.Item>
        <Menu.Item onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });setDetails(ICUbeds);setSetUP(false);setOxygenOpen(false);setICUBeds(true);setAmbulance(false);setPrivateTransport(false);setPlasma(false);setVaccine(false)}}>
            <img src={bedImage} alt="bed"/>
            <h6>ICU Beds</h6>    
        </Menu.Item>
        <Menu.Item onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });setDetails(ambulances);setSetUP(false);setOxygenOpen(false);setICUBeds(false);setAmbulance(true);setPrivateTransport(false);setPlasma(false);setVaccine(false)}}>
            <img src={ambulanceImage} alt="ambula"/>
            <h6>Ambulance</h6>
        </Menu.Item>
        <Menu.Item onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });setDetails(privates);setSetUP(false);setOxygenOpen(false);setICUBeds(false);setAmbulance(false);setPrivateTransport(true);setPlasma(false);setVaccine(false)}}>
            <img src={transportImage} alt="transport"/>
            <h6>Private Transport</h6>
        </Menu.Item>
        <Menu.Item onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });setDetails(plasmas);setSetUP(false);setOxygenOpen(false);setICUBeds(false);setAmbulance(false);setPrivateTransport(false);setPlasma(true);setVaccine(false)}}>
            <img src={bloodImage} alt="blood"/>
            <h6>Plasma</h6>    
        </Menu.Item>
        <Menu.Item onClick={() =>{dispatch({ type: 'CHANGE_ANIMATION', animation: 'scale down' });setDetails(vaccines);setSetUP(false);setOxygenOpen(false);setICUBeds(false);setAmbulance(false);setPrivateTransport(false);setPlasma(false);setVaccine(true)}}>
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
    const [details,setDetails] = useState([]);
    const [type,setType] = useState('Showing All');
    const calling = (d) => {
        return(
            <div>
                {   
                    type === 'Showing All' ? (
                        <div>
                            {setType('Showing Verified')}
                            {
                                d === 'oxygencylinders' ? setDetails(oxygenVerified) : 
                                d === 'beds' ? setDetails(ICUbedsVerified) : 
                                d === 'ambulance' ? setDetails(ambulancesNotVerified) : 
                                d === 'transport' ? setDetails(privatesVerified) : 
                                d === 'plasmas' ? setDetails(plasmasVerified) : 
                                d === 'vaccines' ? setDetails(vaccinesVerified) : 
                            
                            ''}
                        </div>) : 
                    type === 'Showing Verified' ? (<div>
                        {setType('Showing Not Verified')}
                        {   
                            d === 'oxygencylinders' ? setDetails(oxygenNotVerified) : 
                            d === 'beds' ? setDetails(ICUbedsNotVerified) : 
                            d === 'ambulance' ? setDetails(ambulancesNotVerified) : 
                            d === 'transport' ? setDetails(privatesNotVerified) : 
                            d === 'plasmas' ? setDetails(plasmaNotsVerified) : 
                            d === 'vaccines' ? setDetails(vaccinesNotVerified) : 
                            
                        ''}
                    </div>) : 
                    type === 'Showing Not Verified' ? (<div>
                        {setType('Showing All')}
                        {
                            d === 'oxygencylinders' ? setDetails(oxygen) : 
                            d === 'beds' ? setDetails(ICUbeds) : 
                            d === 'ambulance' ? setDetails(ambulances) : 
                            d === 'transport' ? setDetails(privates) : 
                            d === 'plasmas' ? setDetails(plasmas) : 
                            d === 'vaccines' ? setDetails(vaccines) : 
                            
                        ''}
                    </div>) : 
                    ''
                }
            </div>
        )
    };
    const [DATA,setDATA] = useState([
        {height: 375,latitude: 13.912899800000002,longitude: 79.7399875,owner_id: 1201,owner_number:'1234567890',owner_name: "Madhu",type:"Oxygen Cylinders",owner_address: "bhimavaram",Verifications:["18pa1a1213@vishnu.edu.in - 12-02-1202","18pa1a1217@vishnu.edu.in - 12-02-1202","18pa1a1217@vishnu.edu.in - 12-02-1202"],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 13.992899800000002,longitude: 79.7399875,owner_id: 1202,owner_number:'1234567890',owner_name: "Abhinav",type:"Oxygen Cylinders",owner_address: "rajolu",Verifications:["18pa1a1214@vishnu.edu.in - 12-02-1202"],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 17.912899800000002,longitude: 81.7399875,owner_id: 1203,owner_number:'1234567890',owner_name: "Sai",type:"Oxygen Cylinders",owner_address: "bhimavaram",Verifications:[],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 14.912899800000002,longitude: 78.7399875,owner_id: 1204,owner_number:'1234567890',owner_name: "Hari",type:"Oxygen Cylinders",owner_address: "bhimavaram",Verifications:["18pa1a1216@vishnu.edu.in - 12-02-1202"],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 13.912899800000002,longitude: 77.7399875,owner_id: 1205,owner_number:'1234567890',owner_name: "Richad",type:"Oxygen Cylinders",owner_address: "bhimavaram",Verifications:["18pa1a1217@vishnu.edu.in - 12-02-1202"],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 13.912899800000002,longitude: 76.7399875,owner_id: 1206,owner_number:'1234567890',owner_name: "babu",type:"Oxygen Cylinders",owner_address: "bhimavaram",Verifications:[],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
        {height: 375,latitude: 25.912899800000002,longitude: 79.7399875,owner_id: 1207,owner_number:'1234567890',owner_name: "Madhu",type:"ICU Beds",owner_address: "bhimavaram",Verifications:["18pa1a1213@vishnu.edu.in - 12-02-1202","18pa1a1217@vishnu.edu.in - 12-02-1202"],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 26.912899800000002,longitude: 80.7399875,owner_id: 1208,owner_number:'1234567890',owner_name: "Abhinav",type:"ICU Beds",owner_address: "rajolu",Verifications:[],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 27.912899800000002,longitude: 81.7399875,owner_id: 1209,owner_number:'1234567890',owner_name: "Sai",type:"ICU Beds",owner_address: "bhimavaram",Verifications:[],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 24.912899800000002,longitude: 78.7399875,owner_id: 1210,owner_number:'1234567890',owner_name: "Hari",type:"ICU Beds",owner_address: "bhimavaram",Verifications:["18pa1a1216@vishnu.edu.in - 12-02-1202"],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 23.912899800000002,longitude: 77.7399875,owner_id: 1211,owner_number:'1234567890',owner_name: "Richad",type:"ICU Beds",owner_address: "bhimavaram",Verifications:["18pa1a1217@vishnu.edu.in - 12-02-1202","18pa1a1217@vishnu.edu.in - 12-02-1202","18pa1a1217@vishnu.edu.in - 12-02-1202"],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 23.912899800000002,longitude: 76.7399875,owner_id: 1212,owner_number:'1234567890',owner_name: "babu",type:"ICU Beds",owner_address: "bhimavaram",Verifications:[],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
        {height: 375,latitude: 35.912899800000002,longitude: 79.7399875,owner_id: 1213,owner_number:'1234567890',owner_name: "Madhu",type:"Private Transport",owner_address: "bhimavaram",Verifications:["18pa1a1213@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 36.912899800000002,longitude: 80.7399875,owner_id: 1214,owner_number:'1234567890',owner_name: "Abhinav",type:"Private Transport",owner_address: "rajolu",Verifications:["18pa1a1214@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 37.912899800000002,longitude: 81.7399875,owner_id: 1215,owner_number:'1234567890',owner_name: "Sai",type:"Private Transport",owner_address: "bhimavaram",Verifications:["18pa1a1215@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 34.912899800000002,longitude: 78.7399875,owner_id: 1216,owner_number:'1234567890',owner_name: "Hari",type:"Private Transport",owner_address: "bhimavaram",Verifications:["18pa1a1216@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 33.912899800000002,longitude: 77.7399875,owner_id: 1217,owner_number:'1234567890',owner_name: "Richad",type:"Private Transport",owner_address: "bhimavaram",Verifications:[],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 33.912899800000002,longitude: 76.7399875,owner_id: 1218,owner_number:'1234567890',owner_name: "babu",type:"Private Transport",owner_address: "bhimavaram",Verifications:[],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
        {height: 375,latitude: 45.912899800000002,longitude: 79.7399875,owner_id: 1219,owner_number:'1234567890',owner_name: "Madhu",type:"Ambulance",owner_address: "bhimavaram",Verifications:["18pa1a1213@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 46.912899800000002,longitude: 80.7399875,owner_id: 1220,owner_number:'1234567890',owner_name: "Abhinav",type:"Ambulance",owner_address: "rajolu",Verifications:[],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 47.912899800000002,longitude: 81.7399875,owner_id: 1221,owner_number:'1234567890',owner_name: "Sai",type:"Ambulance",owner_address: "bhimavaram",Verifications:["18pa1a1215@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 47.912899800000002,longitude: 78.7399875,owner_id: 1222,owner_number:'1234567890',owner_name: "Hari",type:"Ambulance",owner_address: "bhimavaram",Verifications:["18pa1a1216@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 43.912899800000002,longitude: 77.7399875,owner_id: 1223,owner_number:'1234567890',owner_name: "Richad",type:"Ambulance",owner_address: "bhimavaram",Verifications:["18pa1a1217@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 43.912899800000002,longitude: 76.7399875,owner_id: 1224,owner_number:'1234567890',owner_name: "babu",type:"Ambulance",owner_address: "bhimavaram",Verifications:[],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
        {height: 375,latitude: 55.912899800000002,longitude: 79.7399875,owner_id: 1225,owner_number:'1234567890',owner_name: "Madhu",type:"Plasma",owner_address: "bhimavaram",Verifications:["18pa1a1213@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 56.912899800000002,longitude: 80.7399875,owner_id: 1226,owner_number:'1234567890',owner_name: "Abhinav",type:"Plasma",owner_address: "rajolu",Verifications:["18pa1a1214@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 57.912899800000002,longitude: 81.7399875,owner_id: 1227,owner_number:'1234567890',owner_name: "Sai",type:"Plasma",owner_address: "bhimavaram",Verifications:[],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 54.912899800000002,longitude: 78.7399875,owner_id: 1228,owner_number:'1234567890',owner_name: "Hari",type:"Plasma",owner_address: "bhimavaram",Verifications:["18pa1a1216@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 53.912899800000002,longitude: 77.7399875,owner_id: 1229,owner_number:'1234567890',owner_name: "Richad",type:"Plasma",owner_address: "bhimavaram",Verifications:["18pa1a1217@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 53.912899800000002,longitude: 76.7399875,owner_id: 1230,owner_number:'1234567890',owner_name: "babu",type:"Plasma",owner_address: "bhimavaram",Verifications:[],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
        {height: 375,latitude: 65.912899800000002,longitude: 79.7399875,owner_id: 1231,owner_number:'1234567890',owner_name: "Madhu",type:"Vaccine",owner_address: "bhimavaram",Verifications:["18pa1a1213@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 66.912899800000002,longitude: 80.7399875,owner_id: 1232,owner_number:'1234567890',owner_name: "Abhinav",type:"Vaccine",owner_address: "rajolu",Verifications:[],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 67.912899800000002,longitude: 81.7399875,owner_id: 1233,owner_number:'1234567890',owner_name: "Sai",type:"Vaccine",owner_address: "bhimavaram",Verifications:["18pa1a1215@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 64.912899800000002,longitude: 78.7399875,owner_id: 1234,owner_number:'1234567890',owner_name: "Hari",type:"Vaccine",owner_address: "bhimavaram",Verifications:["18pa1a1216@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 63.912899800000002,longitude: 77.7399875,owner_id: 1235,owner_number:'1234567890',owner_name: "Richad",type:"Vaccine",owner_address: "bhimavaram",Verifications:["18pa1a1217@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
    ]);
    const [volunteers,setVolunteers] = useState([
		{height: 375,latitude: 14.99299800000002,longitude: 79.7399875,TotalVerifications: 34,owner_id:1213,owner_number:'1234567890',owner_name: "Madhu",type:"volunteer",owner_address: "bhimavaram",Verifications: ["18pa1a1213@vishnu.edu.in - 12-04-2021"],email: "18pa1a1213@vishnu.edu.in",status: "Active",width: 500},
		{height: 375,latitude: 15.99299800000002,longitude: 79.7399875,TotalVerifications: 0,owner_id:121,owner_number:'1234567890',owner_name: "Madhu",type:"volunteer",owner_address: "bhimavaram",Verifications: [],email: "18pa1a1213@vishnu.edu.in",status: "Active",width: 500},
    ])
    // 
    const [oxygenVerified,setOxygenVerified] = useState([]);
    const [ICUbedsVerified,setICUbedsVerified] = useState([]);
    const [ambulancesVerified,setAmbulancesVerified] = useState([]);
    const [privatesVerified,setPrivatesVerified] = useState([]);
    const [plasmasVerified,setPlasmasVerified] = useState([]);
    const [vaccinesVerified,setVaccinesVerified] = useState([]);
    // 
    const [oxygenNotVerified,setOxygenNotVerified] = useState([]);
    const [ICUbedsNotVerified,setICUbedsNotVerified] = useState([]);
    const [ambulancesNotVerified,setAmbulancesNotVerified] = useState([]);
    const [privatesNotVerified,setPrivatesNotVerified] = useState([]);
    const [plasmaNotsVerified,setPlasmasNotVerified] = useState([]);
    const [vaccinesNotVerified,setVaccinesNotVerified] = useState([]);
    // 
    const [oxygen,setOxygen] = useState([]);
    const [ICUbeds,setICUbeds] = useState([]);
    const [ambulances,setAmbulances] = useState([]);
    const [privates,setPrivates] = useState([]);
    const [plasmas,setPlasmas] = useState([]);
    const [vaccines,setVaccines] = useState([]);
    const [verified,setVerified] = useState([]);
    const [notVerified,setNotVerified] = useState([]);
    // 
    const [login,setLogin] = useState(false);
    const [signup,setSignup] = useState(false);
    const [generate,setGenerate] = useState("Generate");
    const [userId,setUserId] = useState(0);
    const [pass,setPass] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [code,setCode] = useState('');

    useEffect(() => {
        {DATA.map((m)=>{
            return(
                <div>
                    {
                        m.type === 'Oxygen Cylinders' && m.Verifications.length > 0 ? oxygenVerified.push(m) : m.type === 'Oxygen Cylinders' && m.Verifications.length === 0 ? oxygenNotVerified.push(m) : 
                        m.type === 'ICU Beds' && m.Verifications.length > 0 ? ICUbedsVerified.push(m) : m.type === 'ICU Beds' && m.Verifications.length === 0 ? ICUbedsNotVerified.push(m) :    
                        m.type === 'Private Transport' && m.Verifications.length > 0 ? privatesVerified.push(m) : m.type === 'Private Transport' && m.Verifications.length === 0 ? privatesNotVerified.push(m) : 
                        m.type === 'Ambulance' && m.Verifications.length > 0 ? ambulancesVerified.push(m) : m.type === 'Ambulance' && m.Verifications.length === 0 ? ambulancesNotVerified.push(m) :
                        m.type === 'Plasma' && m.Verifications.length > 0 ? plasmasVerified.push(m) : m.type === 'Plasma' && m.Verifications.length === 0 ? plasmaNotsVerified.push(m) : 
                        m.type === 'Vaccine' && m.Verifications.length > 0 ? vaccinesVerified.push(m) : m.type === 'Vaccine' && m.Verifications.length === 0 ? vaccinesNotVerified.push(m) :

                    ''}
                    {m.type === 'Oxygen Cylinders' ? (oxygen.push(m)) : m.type === 'ICU Beds' ? (ICUbeds.push(m)) : m.type === 'Private Transport' ? (privates.push(m)) : m.type === 'Ambulance' ? (ambulances.push(m)) : m.type === 'Plasma' ? (plasmas.push(m)) : m.type === '' ? (vaccines.push(m)) :  ''}
                </div>
            )
        })}
    }, []);
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
    const [showMap,setShowMap] = useState(false);
    const [oxygenMap,setOxygenMap] = useState(false);
    const [ICUMap,setICUMap] = useState(false);
    const [ambulanceMap,setAmbulanceMap] = useState(false);
    const [privateMap,setPrivateMap] = useState(false);
    const [plasmaMap,setPlasmaMap] = useState(false);
    const [vaccineMap,setVaccineMap] = useState(false);
    
    return (
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
                            {showMap ? (<div>
                                <DonorMap lat={lat} lng={lng} />
                                <Button color="primary" variant="contained" onClick={()=>{setShowMap(false)}}>Close</Button>
                            </div>) : (<div>
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
                                        <Slider
                                        defaultValue={10}
                                        getAriaValueText={valuetext}
                                        aria-labelledby="discrete-slider-always"
                                        step={1}
                                        marks={kms}
                                        valueLabelDisplay="on"
                                        />
                                        <Button color="primary" variant="contained" onClick={()=>{setShowMap(true)}}>Change Address</Button>
                                    </CardFooter>
                                </Card>
                            </div>)}
                        </Collapse>
                        <Collapse isOpen={oxygenOpen}>
                            {oxygenMap ? (<div>
                                <Map volunteers={volunteers} details={details}/>
                                <br/>
                                <Button color="primary" variant="contained" onClick={()=>{setOxygenMap(false)}}>Close</Button>
                            </div>) : (<div>
                                <div className="wrappers">
                                    <Button variant="contained" color="primary" endIcon={<Group />} onClick={()=>{calling('oxygencylinders')}}>{type}</Button>{' '}
                                    <Button variant="contained" color="primary" endIcon={<LocationOnIcon />} onClick={()=>{setOxygenMap(true)}}>Show On</Button>
                                    <br/>
                                </div>
                                <Accordion expanded={expanded === 'oxygencylinders'} onChange={handleAccordionChange('oxygencylinders')}  className="patientable accordian">
                                <AccordionSummary expandIcon={'🔋'} id={'oxygencylinders'}>
                                    <Typography>Oxygen Cylinders</Typography>
                                </AccordionSummary>
                                    <AccordionDetails >
                                        <TableContainer >
                                            <Table aria-labelledby="tableTitle" size='medium' aria-label="enhanced table">
                                                <TableHead></TableHead>
                                                <TableBody >
                                                    {oxygen.map((o)=>{
                                                        if(o.Verifications.length > 0 && type === 'Showing Verified'){
                                                            return(
                                                                <TableRow hover role="checkbox">
                                                                    <TableCell padding="checkbox">
                                                                        {userId !== 0 ? (<div>
                                                                            <Button color="primary" variant="outlined" >Contact Number : {o.contactNumber}</Button>
                                                                        </div>) : (<div>
                                                                            <Button color="primary" variant="outlined" size="small">Get</Button>
                                                                        </div>)}
                                                                    </TableCell>
                                                                    <TableCell scope="row" padding="none"><strong>User Id : </strong>{o.owner_id}</TableCell>
                                                                    <TableCell align="right"><strong>UserName : </strong>{o.owner_name}</TableCell>
                                                                    <TableCell align="right"><strong>Type : </strong>{o.type}</TableCell>
                                                                    <TableCell align="right"><strong>Upload Date : </strong>{o.upload_date}</TableCell>
                                                                    <TableCell align="right"><strong>Verifications : </strong>
                                                                        {o.Verifications.map((v)=>{
                                                                            return(
                                                                                <div>{v}</div>
                                                                            )
                                                                        })}
                                                                    </TableCell>
                                                                    <TableCell align="right"><strong>Price : </strong>{o.price}</TableCell>
                                                                    <TableCell align="right"><strong>Address : </strong>{o.owner_address}</TableCell>
                                                                </TableRow>
                                                            )
                                                        }
                                                        else if(o.Verifications.length === 0 && type === 'Showing Not Verified'){
                                                            return(
                                                                <TableRow hover role="checkbox">
                                                                    <TableCell padding="checkbox">
                                                                        {userId !== 0 ? (<div>
                                                                            <Button color="primary" variant="outlined" >Contact Number : {o.contactNumber}</Button>
                                                                        </div>) : (<div>
                                                                            <Button color="primary" variant="outlined" size="small">Get</Button>
                                                                        </div>)}
                                                                    </TableCell>
                                                                    <TableCell scope="row" padding="none"><strong>User Id : </strong>{o.owner_id}</TableCell>
                                                                    <TableCell align="right"><strong>UserName : </strong>{o.owner_name}</TableCell>
                                                                    <TableCell align="right"><strong>Type : </strong>{o.type}</TableCell>
                                                                    <TableCell align="right"><strong>Upload Date : </strong>{o.upload_date}</TableCell>
                                                                    <TableCell align="right"><strong>Verifications : </strong>
                                                                        {o.Verifications.map((v)=>{
                                                                            return(
                                                                                <div>{v}</div>
                                                                            )
                                                                        })}
                                                                    </TableCell>
                                                                    <TableCell align="right"><strong>Price : </strong>{o.price}</TableCell>
                                                                    <TableCell align="right"><strong>Address : </strong>{o.owner_address}</TableCell>
                                                                </TableRow>
                                                            )
                                                        }
                                                        else if(o.Verifications.length >= 0 && type === 'Showing All'){
                                                            return(
                                                                <TableRow hover role="checkbox">
                                                                    <TableCell padding="checkbox">
                                                                        {userId !== 0 ? (<div>
                                                                            <Button color="primary" variant="outlined" >Contact Number : {o.contactNumber}</Button>
                                                                        </div>) : (<div>
                                                                            <Button color="primary" variant="outlined" size="small">Get</Button>
                                                                        </div>)}
                                                                    </TableCell>
                                                                    <TableCell scope="row" padding="none"><strong>User Id : </strong>{o.owner_id}</TableCell>
                                                                    <TableCell align="right"><strong>UserName : </strong>{o.owner_name}</TableCell>
                                                                    <TableCell align="right"><strong>Type : </strong>{o.type}</TableCell>
                                                                    <TableCell align="right"><strong>Upload Date : </strong>{o.upload_date}</TableCell>
                                                                    <TableCell align="right"><strong>Verifications : </strong>
                                                                        {o.Verifications.map((v)=>{
                                                                            return(
                                                                                <div>{v}</div>
                                                                            )
                                                                        })}
                                                                    </TableCell>
                                                                    <TableCell align="right"><strong>Price : </strong>{o.price}</TableCell>
                                                                    <TableCell align="right"><strong>Address : </strong>{o.owner_address}</TableCell>
                                                                </TableRow>
                                                            )
                                                        }
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </AccordionDetails>
                            </Accordion>
                            </div>)}
                        </Collapse>
                        <Collapse isOpen={ICUBeds}>
                            {ICUMap ? (<div>
                                <Map volunteers={volunteers} details={details}/>
                                <br/>
                                <Button color="primary" variant="contained" onClick={()=>{setICUMap(false)}}>Close</Button>
                            </div>) : (<div>
                                <div className="wrappers">
                                    <Button variant="contained" color="primary" endIcon={<Group />} onClick={()=>{calling('beds')}}>{type}</Button>{' '}
                                    <Button variant="contained" color="primary" endIcon={<LocationOnIcon />} onClick={()=>{setICUMap(true);}}>Show On</Button>
                                    <br/>
                                </div>
                                <Accordion expanded={expanded === 'beds'} onChange={handleChange('beds')}  className="patientable accordian">
                                            <AccordionSummary expandIcon={'🛏️'} id={'beds'}>
                                                <Typography className={classes.heading}>ICU BEDS</Typography>
                                            </AccordionSummary>
                                                <AccordionDetails >
                                                    <TableContainer >
                                                        <Table aria-labelledby="tableTitle" size='medium' aria-label="enhanced table">
                                                            <TableHead>
                                                                <TableCell>Contact Number</TableCell>
                                                                <TableCell>ID</TableCell>
                                                                <TableCell>UserName</TableCell>
                                                                <TableCell>UploadDate</TableCell>
                                                                <TableCell>Verifications</TableCell>
                                                                <TableCell>Price</TableCell>
                                                                <TableCell>Address</TableCell>
                                                            </TableHead>
                                                            <TableBody >
                                                                {ICUbeds.map((o)=>{
                                                                    if(o.Verifications.length > 0 && type === 'Showing Verified'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" >Contact Number : {o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small">Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none"><strong>User Id : </strong>{o.owner_id}</TableCell>
                                                                                <TableCell align="right"><strong>UserName : </strong>{o.owner_name}</TableCell>
                                                                                <TableCell align="right"><strong>Type : </strong>{o.type}</TableCell>
                                                                                <TableCell align="right"><strong>Upload Date : </strong>{o.upload_date}</TableCell>
                                                                                <TableCell align="right"><strong>Verifications : </strong>
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right"><strong>Price : </strong>{o.price}</TableCell>
                                                                                <TableCell align="right"><strong>Address : </strong>{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length === 0 && type === 'Showing Not Verified'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" >Contact Number : {o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small">Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none"><strong>User Id : </strong>{o.owner_id}</TableCell>
                                                                                <TableCell align="right"><strong>UserName : </strong>{o.owner_name}</TableCell>
                                                                                <TableCell align="right"><strong>Type : </strong>{o.type}</TableCell>
                                                                                <TableCell align="right"><strong>Upload Date : </strong>{o.upload_date}</TableCell>
                                                                                <TableCell align="right"><strong>Verifications : </strong>
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right"><strong>Price : </strong>{o.price}</TableCell>
                                                                                <TableCell align="right"><strong>Address : </strong>{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length >= 0 && type === 'Showing All'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" >Contact Number : {o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small">Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none"><strong>User Id : </strong>{o.owner_id}</TableCell>
                                                                                <TableCell align="right"><strong>UserName : </strong>{o.owner_name}</TableCell>
                                                                                <TableCell align="right"><strong>Type : </strong>{o.type}</TableCell>
                                                                                <TableCell align="right"><strong>Upload Date : </strong>{o.upload_date}</TableCell>
                                                                                <TableCell align="right"><strong>Verifications : </strong>
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right"><strong>Price : </strong>{o.price}</TableCell>
                                                                                <TableCell align="right"><strong>Address : </strong>{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                })}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </AccordionDetails>
                                            </Accordion>
                            </div>)}
                        </Collapse>
                        <Collapse isOpen={ambulance}>
                            {ambulanceMap ? (<div>
                                <Map volunteers={volunteers} details={details}/>
                                <br/>
                                <Button color="primary" variant="contained" onClick={()=>{setAmbulanceMap(false)}}>Close</Button>
                            </div>) : (<div>
                                <div className="wrappers">
                                    <Button variant="contained" color="primary" endIcon={<Group />} onClick={()=>{calling('ambulance')}}>{type}</Button>{' '}
                                    <Button variant="contained" color="primary" endIcon={<LocationOnIcon />} onClick={()=>{setAmbulanceMap(true);}}>Show On</Button>
                                    <br/>
                                </div>
                                <Accordion expanded={expanded === 'ambulance'} onChange={handleChange('ambulance')}  className="patientable accordian">
                                            <AccordionSummary expandIcon={'🚑'} id={'ambulance'}>
                                                <Typography className={classes.heading}>Ambulance</Typography>
                                            </AccordionSummary>
                                                <AccordionDetails >
                                                    <TableContainer >
                                                        <Table aria-labelledby="tableTitle" size='medium' aria-label="enhanced table">
                                                            <TableHead>
                                                                <TableCell>Contact Number</TableCell>
                                                                <TableCell>ID</TableCell>
                                                                <TableCell>UserName</TableCell>
                                                                <TableCell>UploadDate</TableCell>
                                                                <TableCell>Verifications</TableCell>
                                                                <TableCell>Price</TableCell>
                                                                <TableCell>Address</TableCell>
                                                            </TableHead>
                                                            <TableBody >
                                                                {ambulances.map((o)=>{
                                                                    if(o.Verifications.length > 0 && type === 'Showing Verified'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" >Contact Number : {o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small">Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none"><strong>User Id : </strong>{o.owner_id}</TableCell>
                                                                                <TableCell align="right"><strong>UserName : </strong>{o.owner_name}</TableCell>
                                                                                <TableCell align="right"><strong>Type : </strong>{o.type}</TableCell>
                                                                                <TableCell align="right"><strong>Upload Date : </strong>{o.upload_date}</TableCell>
                                                                                <TableCell align="right"><strong>Verifications : </strong>
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right"><strong>Price : </strong>{o.price}</TableCell>
                                                                                <TableCell align="right"><strong>Address : </strong>{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length === 0 && type === 'Showing Not Verified'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" >Contact Number : {o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small">Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none"><strong>User Id : </strong>{o.owner_id}</TableCell>
                                                                                <TableCell align="right"><strong>UserName : </strong>{o.owner_name}</TableCell>
                                                                                <TableCell align="right"><strong>Type : </strong>{o.type}</TableCell>
                                                                                <TableCell align="right"><strong>Upload Date : </strong>{o.upload_date}</TableCell>
                                                                                <TableCell align="right"><strong>Verifications : </strong>
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right"><strong>Price : </strong>{o.price}</TableCell>
                                                                                <TableCell align="right"><strong>Address : </strong>{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length >= 0 && type === 'Showing All'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" >Contact Number : {o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small">Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none"><strong>User Id : </strong>{o.owner_id}</TableCell>
                                                                                <TableCell align="right"><strong>UserName : </strong>{o.owner_name}</TableCell>
                                                                                <TableCell align="right"><strong>Type : </strong>{o.type}</TableCell>
                                                                                <TableCell align="right"><strong>Upload Date : </strong>{o.upload_date}</TableCell>
                                                                                <TableCell align="right"><strong>Verifications : </strong>
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right"><strong>Price : </strong>{o.price}</TableCell>
                                                                                <TableCell align="right"><strong>Address : </strong>{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                })}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </AccordionDetails>
                                            </Accordion>
                            </div>)}
                        </Collapse>
                        <Collapse isOpen={privateTransport}>
                            {privateMap ? (<div>
                                <Map volunteers={volunteers} details={details}/>
                                <br/>
                                <Button color="primary" variant="contained" onClick={()=>{setPrivateMap(false)}}>Close</Button>
                            </div>) : (<div>
                                <div className="wrappers">
                                    <Button variant="contained" color="primary" endIcon={<Group />} onClick={()=>{calling('transport')}}>{type}</Button>{' '}
                                    <Button variant="contained" color="primary" endIcon={<LocationOnIcon />} onClick={()=>{setPrivateMap(true);}}>Show On</Button>
                                    <br/>
                                </div>
                                <Accordion expanded={expanded === 'transport'} onChange={handleChange('transport')}  className="patientable accordian">
                                            <AccordionSummary expandIcon={'🚖'} id={'transport'}>
                                                <Typography className={classes.heading}>Private Transport</Typography>
                                            </AccordionSummary>
                                                <AccordionDetails >
                                                    <TableContainer >
                                                        <Table aria-labelledby="tableTitle" size='medium' aria-label="enhanced table">
                                                            <TableHead>
                                                                <TableCell>Contact Number</TableCell>
                                                                <TableCell>ID</TableCell>
                                                                <TableCell>UserName</TableCell>
                                                                <TableCell>UploadDate</TableCell>
                                                                <TableCell>Verifications</TableCell>
                                                                <TableCell>Price</TableCell>
                                                                <TableCell>Address</TableCell>
                                                            </TableHead>
                                                            <TableBody >
                                                                {privates.map((o)=>{
                                                                    if(o.Verifications.length > 0 && type === 'Showing Verified'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" >Contact Number : {o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small">Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none"><strong>User Id : </strong>{o.owner_id}</TableCell>
                                                                                <TableCell align="right"><strong>UserName : </strong>{o.owner_name}</TableCell>
                                                                                <TableCell align="right"><strong>Type : </strong>{o.type}</TableCell>
                                                                                <TableCell align="right"><strong>Upload Date : </strong>{o.upload_date}</TableCell>
                                                                                <TableCell align="right"><strong>Verifications : </strong>
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right"><strong>Price : </strong>{o.price}</TableCell>
                                                                                <TableCell align="right"><strong>Address : </strong>{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length === 0 && type === 'Showing Not Verified'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" >Contact Number : {o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small">Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none"><strong>User Id : </strong>{o.owner_id}</TableCell>
                                                                                <TableCell align="right"><strong>UserName : </strong>{o.owner_name}</TableCell>
                                                                                <TableCell align="right"><strong>Type : </strong>{o.type}</TableCell>
                                                                                <TableCell align="right"><strong>Upload Date : </strong>{o.upload_date}</TableCell>
                                                                                <TableCell align="right"><strong>Verifications : </strong>
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right"><strong>Price : </strong>{o.price}</TableCell>
                                                                                <TableCell align="right"><strong>Address : </strong>{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length >= 0 && type === 'Showing All'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" >Contact Number : {o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small">Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none"><strong>User Id : </strong>{o.owner_id}</TableCell>
                                                                                <TableCell align="right"><strong>UserName : </strong>{o.owner_name}</TableCell>
                                                                                <TableCell align="right"><strong>Type : </strong>{o.type}</TableCell>
                                                                                <TableCell align="right"><strong>Upload Date : </strong>{o.upload_date}</TableCell>
                                                                                <TableCell align="right"><strong>Verifications : </strong>
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right"><strong>Price : </strong>{o.price}</TableCell>
                                                                                <TableCell align="right"><strong>Address : </strong>{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                })}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </AccordionDetails>
                                            </Accordion>
                            </div>)}
                        </Collapse>
                        <Collapse isOpen={plasma}>
                            {plasmaMap ? (<div>
                                <Map volunteers={volunteers} details={details}/>
                                <br/>
                                <Button color="primary" variant="contained" onClick={()=>{setPlasmaMap(false)}}>Close</Button>
                            </div>) : (<div>
                                <div className="wrappers">
                                    <Button variant="contained" color="primary" endIcon={<Group />} onClick={()=>{calling()}}>{type}</Button>{' '}
                                    <Button variant="contained" color="primary" endIcon={<LocationOnIcon />} onClick={()=>{setPlasmaMap(true);}}>Show On</Button>
                                    <br/>
                                </div>
                                <Accordion expanded={expanded === 'plasmas'} onChange={handleChange('plasmas')}  className="patientable accordian">
                                            <AccordionSummary expandIcon={'🩸'} id={'plasmas'}>
                                                <Typography className={classes.heading}>Plasmas</Typography>
                                            </AccordionSummary>
                                                <AccordionDetails >
                                                    <TableContainer >
                                                        <Table aria-labelledby="tableTitle" size='medium' aria-label="enhanced table">
                                                            <TableHead>
                                                                <TableCell>Contact Number</TableCell>
                                                                <TableCell>ID</TableCell>
                                                                <TableCell>UserName</TableCell>
                                                                <TableCell>UploadDate</TableCell>
                                                                <TableCell>Verifications</TableCell>
                                                                <TableCell>Price</TableCell>
                                                                <TableCell>Address</TableCell>
                                                            </TableHead>
                                                            <TableBody >
                                                                {plasmas.map((o)=>{
                                                                    if(o.Verifications.length > 0 && type === 'Showing Verified'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" >Contact Number : {o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small">Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none"><strong>User Id : </strong>{o.owner_id}</TableCell>
                                                                                <TableCell align="right"><strong>UserName : </strong>{o.owner_name}</TableCell>
                                                                                <TableCell align="right"><strong>Type : </strong>{o.type}</TableCell>
                                                                                <TableCell align="right"><strong>Upload Date : </strong>{o.upload_date}</TableCell>
                                                                                <TableCell align="right"><strong>Verifications : </strong>
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right"><strong>Price : </strong>{o.price}</TableCell>
                                                                                <TableCell align="right"><strong>Address : </strong>{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length === 0 && type === 'Showing Not Verified'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" >Contact Number : {o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small">Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none"><strong>User Id : </strong>{o.owner_id}</TableCell>
                                                                                <TableCell align="right"><strong>UserName : </strong>{o.owner_name}</TableCell>
                                                                                <TableCell align="right"><strong>Type : </strong>{o.type}</TableCell>
                                                                                <TableCell align="right"><strong>Upload Date : </strong>{o.upload_date}</TableCell>
                                                                                <TableCell align="right"><strong>Verifications : </strong>
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right"><strong>Price : </strong>{o.price}</TableCell>
                                                                                <TableCell align="right"><strong>Address : </strong>{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length >= 0 && type === 'Showing All'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" >Contact Number : {o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small">Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none"><strong>User Id : </strong>{o.owner_id}</TableCell>
                                                                                <TableCell align="right"><strong>UserName : </strong>{o.owner_name}</TableCell>
                                                                                <TableCell align="right"><strong>Type : </strong>{o.type}</TableCell>
                                                                                <TableCell align="right"><strong>Upload Date : </strong>{o.upload_date}</TableCell>
                                                                                <TableCell align="right"><strong>Verifications : </strong>
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right"><strong>Price : </strong>{o.price}</TableCell>
                                                                                <TableCell align="right"><strong>Address : </strong>{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                })}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </AccordionDetails>
                                            </Accordion>
                            </div>)}
                        </Collapse>
                        <Collapse isOpen={vaccine}>
                            {vaccineMap ? (<div>
                                <Map volunteers={volunteers} details={details}/>
                                <br/>
                                <Button color="primary" variant="contained" onClick={()=>{setVaccineMap(false)}}>Close</Button>
                            </div>) : (<div>
                                <div className="wrappers">
                                    <Button variant="contained" color="primary" endIcon={<Group />} onClick={()=>{calling()}}>{type}</Button>{' '}
                                    <Button variant="contained" color="primary" endIcon={<LocationOnIcon />} onClick={()=>{setVaccineMap(true);}}>Show On</Button>
                                    <br/>
                                </div>
                                <Accordion expanded={expanded === 'vaccines'} onChange={handleChange('vaccines')}  className="patientable accordian">
                                            <AccordionSummary expandIcon={'💉'} id={'vaccines'}>
                                                <Typography className={classes.heading}>Vaccine</Typography>
                                            </AccordionSummary>
                                                <AccordionDetails >
                                                    <TableContainer >
                                                        <Table aria-labelledby="tableTitle" size='medium' aria-label="enhanced table">
                                                            <TableHead>
                                                                <TableCell>Contact Number</TableCell>
                                                                <TableCell>ID</TableCell>
                                                                <TableCell>UserName</TableCell>
                                                                <TableCell>UploadDate</TableCell>
                                                                <TableCell>Verifications</TableCell>
                                                                <TableCell>Price</TableCell>
                                                                <TableCell>Address</TableCell>
                                                            </TableHead>
                                                            <TableBody >
                                                                {vaccines.map((o)=>{
                                                                    if(o.Verifications.length > 0 && type === 'Showing Verified'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                    <TableCell padding="checkbox">
                                                                        {userId !== 0 ? (<div>
                                                                            <Button color="primary" variant="outlined" >Contact Number : {o.contactNumber}</Button>
                                                                        </div>) : (<div>
                                                                            <Button color="primary" variant="outlined" size="small">Get</Button>
                                                                        </div>)}
                                                                    </TableCell>
                                                                    <TableCell scope="row" padding="none"><strong>User Id : </strong>{o.owner_id}</TableCell>
                                                                    <TableCell align="right"><strong>UserName : </strong>{o.owner_name}</TableCell>
                                                                    <TableCell align="right"><strong>Type : </strong>{o.type}</TableCell>
                                                                    <TableCell align="right"><strong>Upload Date : </strong>{o.upload_date}</TableCell>
                                                                    <TableCell align="right"><strong>Verifications : </strong>
                                                                        {o.Verifications.map((v)=>{
                                                                            return(
                                                                                <div>{v}</div>
                                                                            )
                                                                        })}
                                                                    </TableCell>
                                                                    <TableCell align="right"><strong>Price : </strong>{o.price}</TableCell>
                                                                    <TableCell align="right"><strong>Address : </strong>{o.owner_address}</TableCell>
                                                                </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length === 0 && type === 'Showing Not Verified'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                    <TableCell padding="checkbox">
                                                                        {userId !== 0 ? (<div>
                                                                            <Button color="primary" variant="outlined" >Contact Number : {o.contactNumber}</Button>
                                                                        </div>) : (<div>
                                                                            <Button color="primary" variant="outlined" size="small">Get</Button>
                                                                        </div>)}
                                                                    </TableCell>
                                                                    <TableCell scope="row" padding="none"><strong>User Id : </strong>{o.owner_id}</TableCell>
                                                                    <TableCell align="right"><strong>UserName : </strong>{o.owner_name}</TableCell>
                                                                    <TableCell align="right"><strong>Type : </strong>{o.type}</TableCell>
                                                                    <TableCell align="right"><strong>Upload Date : </strong>{o.upload_date}</TableCell>
                                                                    <TableCell align="right"><strong>Verifications : </strong>
                                                                        {o.Verifications.map((v)=>{
                                                                            return(
                                                                                <div>{v}</div>
                                                                            )
                                                                        })}
                                                                    </TableCell>
                                                                    <TableCell align="right"><strong>Price : </strong>{o.price}</TableCell>
                                                                    <TableCell align="right"><strong>Address : </strong>{o.owner_address}</TableCell>
                                                                </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length >= 0 && type === 'Showing All'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                    <TableCell padding="checkbox">
                                                                        {userId !== 0 ? (<div>
                                                                            <Button color="primary" variant="outlined" >Contact Number : {o.contactNumber}</Button>
                                                                        </div>) : (<div>
                                                                            <Button color="primary" variant="outlined" size="small">Get</Button>
                                                                        </div>)}
                                                                    </TableCell>
                                                                    <TableCell scope="row" padding="none"><strong>User Id : </strong>{o.owner_id}</TableCell>
                                                                    <TableCell align="right"><strong>UserName : </strong>{o.owner_name}</TableCell>
                                                                    <TableCell align="right"><strong>Type : </strong>{o.type}</TableCell>
                                                                    <TableCell align="right"><strong>Upload Date : </strong>{o.upload_date}</TableCell>
                                                                    <TableCell align="right"><strong>Verifications : </strong>
                                                                        {o.Verifications.map((v)=>{
                                                                            return(
                                                                                <div>{v}</div>
                                                                            )
                                                                        })}
                                                                    </TableCell>
                                                                    <TableCell align="right"><strong>Price : </strong>{o.price}</TableCell>
                                                                    <TableCell align="right"><strong>Address : </strong>{o.owner_address}</TableCell>
                                                                </TableRow>
                                                                        )
                                                                    }
                                                                })}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </AccordionDetails>
                                            </Accordion>
                            </div>)}
                        </Collapse>
                    </div>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
    )
}

export default PatientRequirements
