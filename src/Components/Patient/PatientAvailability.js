import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, Collapse, Grid, Icon, Input, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ModalBody, ModalFooter, ModalTitle, Modal} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { AccountCircle, Call, ExpandLess, ExpandMore, Group, Twitter } from '@material-ui/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Map from '../Maps/PatientMap';
import VpnKeyIcon from '@material-ui/icons/VpnKey';


function PatientAvailability() {
    const [expanded, setExpanded] = React.useState(false);
    const [oxygens,setOxygens] = useState([
        {height: 375,latitude: 13.912899800000002,longitude: 79.7399875,owner_id: 4480,owner_number:'1234567890',owner_name: "Madhu",type:"Oxygen Cylinders",owner_address: "bhimavaram",Verifications:["18pa1a1213@vishnu.edu.in - 12-02-1202","18pa1a1217@vishnu.edu.in - 12-02-1202","18pa1a1217@vishnu.edu.in - 12-02-1202"],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 13.992899800000002,longitude: 79.7399875,owner_id: 4481,owner_number:'1234567890',owner_name: "Abhinav",type:"Oxygen Cylinders",owner_address: "rajolu",Verifications:["18pa1a1214@vishnu.edu.in - 12-02-1202"],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 17.912899800000002,longitude: 81.7399875,owner_id: 4482,owner_number:'1234567890',owner_name: "Sai",type:"Oxygen Cylinders",owner_address: "bhimavaram",Verifications:[],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 14.912899800000002,longitude: 78.7399875,owner_id: 4486,owner_number:'1234567890',owner_name: "Hari",type:"Oxygen Cylinders",owner_address: "bhimavaram",Verifications:["18pa1a1216@vishnu.edu.in - 12-02-1202"],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 13.912899800000002,longitude: 77.7399875,owner_id: 4484,owner_number:'1234567890',owner_name: "Richad",type:"Oxygen Cylinders",owner_address: "bhimavaram",Verifications:["18pa1a1217@vishnu.edu.in - 12-02-1202"],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 13.912899800000002,longitude: 76.7399875,owner_id: 4485,owner_number:'1234567890',owner_name: "babu",type:"Oxygen Cylinders",owner_address: "bhimavaram",Verifications:[],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
    ])
    const [ICUBeds,setICUBeds] = useState([
        {height: 375,latitude: 25.912899800000002,longitude: 79.7399875,owner_id: 4580,owner_number:'1234567890',owner_name: "Madhu",type:"ICU Beds",owner_address: "bhimavaram",Verifications:["18pa1a1213@vishnu.edu.in - 12-02-1202","18pa1a1217@vishnu.edu.in - 12-02-1202"],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 26.912899800000002,longitude: 80.7399875,owner_id: 4581,owner_number:'1234567890',owner_name: "Abhinav",type:"ICU Beds",owner_address: "rajolu",Verifications:[],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 27.912899800000002,longitude: 81.7399875,owner_id: 4582,owner_number:'1234567890',owner_name: "Sai",type:"ICU Beds",owner_address: "bhimavaram",Verifications:[],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 24.912899800000002,longitude: 78.7399875,owner_id: 4586,owner_number:'1234567890',owner_name: "Hari",type:"ICU Beds",owner_address: "bhimavaram",Verifications:["18pa1a1216@vishnu.edu.in - 12-02-1202"],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 23.912899800000002,longitude: 77.7399875,owner_id: 4584,owner_number:'1234567890',owner_name: "Richad",type:"ICU Beds",owner_address: "bhimavaram",Verifications:["18pa1a1217@vishnu.edu.in - 12-02-1202","18pa1a1217@vishnu.edu.in - 12-02-1202","18pa1a1217@vishnu.edu.in - 12-02-1202"],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		{height: 375,latitude: 23.912899800000002,longitude: 76.7399875,owner_id: 4585,owner_number:'1234567890',owner_name: "babu",type:"ICU Beds",owner_address: "bhimavaram",Verifications:[],upload_date: "25 June 2006",contactNumber:'12344',price:'Single Item Cost',width: 500},
		
    ]);
    const [privateTransport,setPrivateTransport] = useState([
        {height: 375,latitude: 35.912899800000002,longitude: 79.7399875,owner_id: 4680,owner_number:'1234567890',owner_name: "Madhu",type:"Private Transport",owner_address: "bhimavaram",Verifications:["18pa1a1213@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 36.912899800000002,longitude: 80.7399875,owner_id: 4681,owner_number:'1234567890',owner_name: "Abhinav",type:"Private Transport",owner_address: "rajolu",Verifications:["18pa1a1214@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 37.912899800000002,longitude: 81.7399875,owner_id: 4682,owner_number:'1234567890',owner_name: "Sai",type:"Private Transport",owner_address: "bhimavaram",Verifications:["18pa1a1215@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 34.912899800000002,longitude: 78.7399875,owner_id: 4686,owner_number:'1234567890',owner_name: "Hari",type:"Private Transport",owner_address: "bhimavaram",Verifications:["18pa1a1216@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 33.912899800000002,longitude: 77.7399875,owner_id: 4684,owner_number:'1234567890',owner_name: "Richad",type:"Private Transport",owner_address: "bhimavaram",Verifications:[],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 33.912899800000002,longitude: 76.7399875,owner_id: 4685,owner_number:'1234567890',owner_name: "babu",type:"Private Transport",owner_address: "bhimavaram",Verifications:[],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		
    ])
    const [ambulance,setAmbulance] = useState([
        {height: 375,latitude: 45.912899800000002,longitude: 79.7399875,owner_id: 4780,owner_number:'1234567890',owner_name: "Madhu",type:"Ambulance",owner_address: "bhimavaram",Verifications:["18pa1a1213@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 46.912899800000002,longitude: 80.7399875,owner_id: 4781,owner_number:'1234567890',owner_name: "Abhinav",type:"Ambulance",owner_address: "rajolu",Verifications:[],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 47.912899800000002,longitude: 81.7399875,owner_id: 4782,owner_number:'1234567890',owner_name: "Sai",type:"Ambulance",owner_address: "bhimavaram",Verifications:["18pa1a1215@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 47.912899800000002,longitude: 78.7399875,owner_id: 4786,owner_number:'1234567890',owner_name: "Hari",type:"Ambulance",owner_address: "bhimavaram",Verifications:["18pa1a1216@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 43.912899800000002,longitude: 77.7399875,owner_id: 4784,owner_number:'1234567890',owner_name: "Richad",type:"Ambulance",owner_address: "bhimavaram",Verifications:["18pa1a1217@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 43.912899800000002,longitude: 76.7399875,owner_id: 4785,owner_number:'1234567890',owner_name: "babu",type:"Ambulance",owner_address: "bhimavaram",Verifications:[],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
    ])
    const [plasma,setplasma] = useState([
        {height: 375,latitude: 55.912899800000002,longitude: 79.7399875,owner_id: 4880,owner_number:'1234567890',owner_name: "Madhu",type:"Plasma",owner_address: "bhimavaram",Verifications:["18pa1a1213@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 56.912899800000002,longitude: 80.7399875,owner_id: 4881,owner_number:'1234567890',owner_name: "Abhinav",type:"Plasma",owner_address: "rajolu",Verifications:["18pa1a1214@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 57.912899800000002,longitude: 81.7399875,owner_id: 4882,owner_number:'1234567890',owner_name: "Sai",type:"Plasma",owner_address: "bhimavaram",Verifications:[],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 54.912899800000002,longitude: 78.7399875,owner_id: 4886,owner_number:'1234567890',owner_name: "Hari",type:"Plasma",owner_address: "bhimavaram",Verifications:["18pa1a1216@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 53.912899800000002,longitude: 77.7399875,owner_id: 4884,owner_number:'1234567890',owner_name: "Richad",type:"Plasma",owner_address: "bhimavaram",Verifications:["18pa1a1217@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 53.912899800000002,longitude: 76.7399875,owner_id: 4885,owner_number:'1234567890',owner_name: "babu",type:"Plasma",owner_address: "bhimavaram",Verifications:[],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
    ])
    const [vaccine,setVaccine] = useState([
        {height: 375,latitude: 65.912899800000002,longitude: 79.7399875,owner_id: 4980,owner_number:'1234567890',owner_name: "Madhu",type:"Vaccine",owner_address: "bhimavaram",Verifications:["18pa1a1213@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 66.912899800000002,longitude: 80.7399875,owner_id: 4981,owner_number:'1234567890',owner_name: "Abhinav",type:"Vaccine",owner_address: "rajolu",Verifications:[],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 67.912899800000002,longitude: 81.7399875,owner_id: 4982,owner_number:'1234567890',owner_name: "Sai",type:"Vaccine",owner_address: "bhimavaram",Verifications:["18pa1a1215@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 64.912899800000002,longitude: 78.7399875,owner_id: 4986,owner_number:'1234567890',owner_name: "Hari",type:"Vaccine",owner_address: "bhimavaram",Verifications:["18pa1a1216@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 63.912899800000002,longitude: 77.7399875,owner_id: 4984,owner_number:'1234567890',owner_name: "Richad",type:"Vaccine",owner_address: "bhimavaram",Verifications:["18pa1a1217@vishnu.edu.in - 12-02-1202"],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 63.912899800000002,longitude: 76.7399875,owner_id: 4985,owner_number:'1234567890',owner_name: "babu",type:"Vaccine",owner_address: "bhimavaram",Verifications:[],contactNumber:'12344',price:'Single Item Cost',upload_date: "25 June 2006",width: 500},
    ])
	const location = useLocation();
    const [list,setList] = useState(location.state.finallist)
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const accordian = [
        {
            id:'panel1',panelName:'',panelControl:'panel1bh-content',panelColor:'blue',panelText1:'Oxygen Cylinders',
            panelText2:'Available',panelId:'panel1bh-header',panelIcon:'🔋'
        },
        {
            id:'panel2',panelName:'',panelControl:'panel2bh-content',panelColor:'brown',panelText1:'ICU Beds',
            panelText2:'Available',panelId:'panel2bh-header',panelIcon:'🛏️'
        },
        {
            id:'panel3',panelName:'',panelControl:'panel3bh-content',panelColor:'green',panelText1:'Ambulance',
            panelText2:'Available',panelId:'panel3bh-header',panelIcon:'🚑'
        },
        {
            id:'panel4',panelName:'',panelControl:'panel4bh-content',panelColor:'gold',panelText1:'Private Transport',
            panelText2:'Available',panelId:'panel4bh-header',panelIcon:'🚖'
        },
        {
            id:'panel5',panelName:'',panelControl:'panel5bh-content',panelColor:'green',panelText1:'Vaccine',
            panelText2:'Available',panelId:'panel5bh-header',panelIcon:'💉',
        },
        {
            id:'panel6',panelName:'',panelControl:'panel6bh-content',panelColor:'red',panelText1:'Plasma',
            panelText2:'Available',panelId:'panel6bh-header',panelIcon:'🩸'
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
    const [showMap,setShowMap] = useState(false)
    const classes = useStyles();
    const [login,setLogin] = useState(false);
    const [signup,setSignup] = useState(false);
    const [generate,setGenerate] = useState("Generate");
    const [userId,setUserId] = useState(0);
    const [pass,setPass] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [code,setCode] = useState('');
    const [show,setShow] = useState(false);
    const [twitter,setTwitter] = useState(false);
    const [openCylinder,setCylinder] = useState(false);
    const [openBeds,setBeds] = useState(false);
    const [show1,setShow1] = useState(false);
    const [volunteers,setVolunteers] = useState([
		{height: 375,latitude: 14.99299800000002,longitude: 79.7399875,TotalVerifications: 34,owner_id:1213,owner_number:'1234567890',owner_name: "Madhu",type:"volunteer",owner_address: "bhimavaram",Verifications: ["18pa1a1213@vishnu.edu.in - 12-04-2021"],email: "18pa1a1213@vishnu.edu.in",status: "Active",width: 500},
		{height: 375,latitude: 15.99299800000002,longitude: 79.7399875,TotalVerifications: 0,owner_id:121,owner_number:'1234567890',owner_name: "Madhu",type:"volunteer",owner_address: "bhimavaram",Verifications: [],email: "18pa1a1213@vishnu.edu.in",status: "Active",width: 500},
    ])
    const [all,setAll] = useState([]);
    const handleBody = (l) =>{
        return(
            <div>
                {l === 'Oxygen Cylinders' ? setAll(oxygens) : 
                l === 'ICU Beds' ? setAll(ICUBeds) : 
                l === 'Ambulance' ? setAll(ambulance) :
                l === 'Private Transport' ? setAll(privateTransport) :
                l === 'Vaccine' ? setAll(vaccine) :
                l === 'Plasma' ? setAll(plasma) :
                ''}
            </div>
        )
    }
    const [data,setData] = useState([]);
    const [details,setDetails] = useState([]);
    const [type,setType] = useState('Showing All');
    const calling = () => {
        return(
            <div>
                {   
                    type === 'Showing All' ? (
                        <div>
                            {setType('Showing Verified')}
                            {setDetails(verified)}
                        </div>) : 
                    type === 'Showing Verified' ? (<div>
                        {setType('Showing Not Verified')}
                        {setDetails(notVerified)}
                    </div>) : 
                    type === 'Showing Not Verified' ? (<div>
                        {setType('Showing All')}
                        {setDetails(DATA)}
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
		
    ])
    const [oxygen,setOxygen] = useState([]);
    const [ICUbeds,setICUbeds] = useState([]);
    const [ambulances,setAmbulances] = useState([]);
    const [privates,setPrivates] = useState([]);
    const [plasmas,setPlasmas] = useState([]);
    const [vaccines,setVaccines] = useState([]);
    const [verified,setVerified] = useState([]);
    const [notVerified,setNotVerified] = useState([]);
    useEffect(() => {
        {DATA.map((m)=>{
            if(list.includes(m.type)){
                details.push(m)
            return(
                <div>
                    {m.Verifications.length > 0 ? verified.push(m) : notVerified.push(m)}
                    {m.type === 'Oxygen Cylinders' ? (oxygen.push(m)) : m.type === 'ICU Beds' ? (ICUbeds.push(m)) : m.type === 'Private Transport' ? (privates.push(m)) : m.type === 'Ambulance' ? (ambulances.push(m)) : m.type === 'Plasma' ? (plasmas.push(m)) : m.type === 'Vaccine' ? (vaccines.push(m)) :  ''}
                </div>
            )
            }
        })}
    }, []);
    return (
        <div>
                <div> 
                    <Modal show={show1}>
                        <ModalBody>
                            <Map  location={location} volunteers={volunteers} details={details}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={()=>{setShow1(false)}}>Close</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal size="xl" show={show} >
                        <ModalHeader closeButton onClick={()=>{setShow(false);}}>
                            <ModalTitle>Recent calls</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            {data === [] ? (<div>
                                No data
                            </div>) : (<div>
                            <TableContainer >
                                <Table aria-labelledby="tableTitle" size='medium' aria-label="enhanced table">
                                    <TableHead>
                                        <TableCell>Select</TableCell>
                                        <TableCell>type</TableCell>
                                        <TableCell>ID</TableCell>
                                        <TableCell>UserName</TableCell>
                                        <TableCell>UploadDate</TableCell>
                                        <TableCell>VerifiedOn</TableCell>
                                        <TableCell>VerifiedBy</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Address</TableCell>
                                        <TableCell>ContactNumber</TableCell>
                                    </TableHead>
                                    <TableBody >
                                        {data.map((o,key=o.id)=>{
                                            return(
                                                <TableRow hover role="checkbox">
                                                    <TableCell padding="checkbox">
                                                        <Button color="secondary" variant="outlined" >Delete Request</Button>
                                                    </TableCell>
                                                    <TableCell align="right">{o.type}</TableCell>
                                                    <TableCell scope="row" padding="none">{o.owner_id}</TableCell>
                                                    <TableCell align="right">{o.owner_name}</TableCell>
                                                    <TableCell align="right">{o.upload_date}</TableCell>
                                                    <TableCell align="right">{o.verifiedOn}</TableCell>
                                                    <TableCell align="right">{o.verifiedBy}</TableCell>
                                                    <TableCell align="right">{o.price}</TableCell>
                                                    <TableCell align="right">{o.owner_address}</TableCell>
                                                    <TableCell align="right">{o.contactNumber}</TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            </div>)}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={()=>{setShow(false);}}>Close</Button>{' '}
                        </ModalFooter>
                    </Modal>
                </div>
                <div>
                    <Modal size="sm" show={twitter} >
                        <ModalHeader closeButton onClick={()=>{setTwitter(false)}}>
                            <ModalTitle>Tweets</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <List>
                                <ListItem button onClick={()=>{setCylinder(!openCylinder)}}>
                                    <ListItemIcon>
                                        {!openCylinder ? <ExpandMore color="action" /> : <Twitter color="primary"/>}
                                    </ListItemIcon>
                                    <ListItemText primary="O2 Cylinder" />
                                    {openCylinder ? (<div>01-05-2021</div>) : (<div>01-05-2021</div>)}
                                </ListItem>
                                <Collapse in={openCylinder} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                    <ListItem >
                                        <ListItemText primary="Details" />
                                    </ListItem>
                                    </List>
                                </Collapse>
                                <ListItem button onClick={()=>{setBeds(!openBeds)}}>
                                    <ListItemIcon>
                                        {!openBeds ? <ExpandMore color="action"/> : <Twitter color="primary"/>}
                                    </ListItemIcon>
                                    <ListItemText primary="ICU Beds" />
                                    {openBeds ? (<div>21-02-2021</div>) : (<div>21-02-2021</div>)}
                                </ListItem>
                                <Collapse in={openBeds} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                    <ListItem  >
                                        <ListItemText primary="Details" />
                                    </ListItem>
                                    </List>
                                </Collapse>
                            </List>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={()=>{setTwitter(false)}}>Close</Button>{' '}
                        </ModalFooter>
                    </Modal>
                </div>
                {login ? signup ? (<div>
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
                </div>) : (<div>
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
                </div>) : showMap ? (<div>
                    <Map location={location} volunteers={volunteers} details={details}/>
                    <br/>
                    <Button color="primary" variant="contained" onClick={()=>{setShowMap(false)}}>Close</Button>
                </div>) : (<div>
                    <div className="trail"> 
                        <div className="wrappers">
                            <Button variant="contained" color="primary" endIcon={<Group />} onClick={()=>{calling()}}>{type}</Button>{' '}
                            <Button variant="contained" color="primary" endIcon={<Call/>} onClick={()=>{setShow(true)}}>Recent</Button>{' '}
                            <Button variant="contained" color="primary" endIcon={<LocationOnIcon />} onClick={()=>{setShowMap(true)}}>Show On</Button>
                        </div>
                        {list.map((l)=>{
                            return(
                                <div>
                                    {l === 'Oxygen Cylinders' ? (<div>
                                        <Accordion expanded={expanded === 'oxygencylinders'} onChange={handleChange('oxygencylinders')}  className="patientable accordian" onClick={()=>{handleBody(l)}}>
                                            <AccordionSummary expandIcon={'🔋'} id={'oxygencylinders'}>
                                                <Typography className={classes.heading}>Oxygen Cylinders</Typography>
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
                                                                {oxygen.map((o)=>{
                                                                    if(o.Verifications.length > 0 && type === 'Showing Verified'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" onClick={()=>{data.push(o);}}>{o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small" onClick={()=>{setLogin(true)}}>Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none">{o.owner_id}</TableCell>
                                                                                <TableCell align="right">{o.owner_name}</TableCell>
                                                                                <TableCell align="right">{o.upload_date}</TableCell>
                                                                                <TableCell align="right">
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right">{o.price}</TableCell>
                                                                                <TableCell align="right">{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length === 0 && type === 'Showing Not Verified'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" onClick={()=>{data.push(o);}}>{o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small" onClick={()=>{setLogin(true)}}>Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none">{o.owner_id}</TableCell>
                                                                                <TableCell align="right">{o.owner_name}</TableCell>
                                                                                <TableCell align="right">{o.upload_date}</TableCell>
                                                                                <TableCell align="right">
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right">{o.price}</TableCell>
                                                                                <TableCell align="right">{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length >= 0 && type === 'Showing All'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" onClick={()=>{data.push(o);}}>{o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small" onClick={()=>{setLogin(true)}}>Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none">{o.owner_id}</TableCell>
                                                                                <TableCell align="right">{o.owner_name}</TableCell>
                                                                                <TableCell align="right">{o.upload_date}</TableCell>
                                                                                <TableCell align="right">
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right">{o.price}</TableCell>
                                                                                <TableCell align="right">{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                })}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </AccordionDetails>
                                            </Accordion>
                                    </div>) : l === "ICU Beds" ? (<div>
                                        <Accordion expanded={expanded === 'beds'} onChange={handleChange('beds')}  className="patientable accordian" onClick={()=>{handleBody(l)}}>
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
                                                                                        <Button color="primary" variant="outlined" onClick={()=>{data.push(o);}}>{o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small" onClick={()=>{setLogin(true)}}>Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none">{o.owner_id}</TableCell>
                                                                                <TableCell align="right">{o.owner_name}</TableCell>
                                                                                <TableCell align="right">{o.upload_date}</TableCell>
                                                                                <TableCell align="right">
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right">{o.price}</TableCell>
                                                                                <TableCell align="right">{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length === 0 && type === 'Showing Not Verified'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" onClick={()=>{data.push(o);}}>{o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small" onClick={()=>{setLogin(true)}}>Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none">{o.owner_id}</TableCell>
                                                                                <TableCell align="right">{o.owner_name}</TableCell>
                                                                                <TableCell align="right">{o.upload_date}</TableCell>
                                                                                <TableCell align="right">
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right">{o.price}</TableCell>
                                                                                <TableCell align="right">{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length >= 0 && type === 'Showing All'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" onClick={()=>{data.push(o);}}>{o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small" onClick={()=>{setLogin(true)}}>Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none">{o.owner_id}</TableCell>
                                                                                <TableCell align="right">{o.owner_name}</TableCell>
                                                                                <TableCell align="right">{o.upload_date}</TableCell>
                                                                                <TableCell align="right">
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right">{o.price}</TableCell>
                                                                                <TableCell align="right">{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                })}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </AccordionDetails>
                                            </Accordion>
                                    </div>) : l === 'Private Transport' ? (<div>
                                        <Accordion expanded={expanded === 'transport'} onChange={handleChange('transport')}  className="patientable accordian" onClick={()=>{handleBody(l)}}>
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
                                                                                        <Button color="primary" variant="outlined" onClick={()=>{data.push(o);}}>{o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small" onClick={()=>{setLogin(true)}}>Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none">{o.owner_id}</TableCell>
                                                                                <TableCell align="right">{o.owner_name}</TableCell>
                                                                                <TableCell align="right">{o.upload_date}</TableCell>
                                                                                <TableCell align="right">
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right">{o.price}</TableCell>
                                                                                <TableCell align="right">{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length === 0 && type === 'Showing Not Verified'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" onClick={()=>{data.push(o);}}>{o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small" onClick={()=>{setLogin(true)}}>Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none">{o.owner_id}</TableCell>
                                                                                <TableCell align="right">{o.owner_name}</TableCell>
                                                                                <TableCell align="right">{o.upload_date}</TableCell>
                                                                                <TableCell align="right">
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right">{o.price}</TableCell>
                                                                                <TableCell align="right">{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length >= 0 && type === 'Showing All'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" onClick={()=>{data.push(o);}}>{o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small" onClick={()=>{setLogin(true)}}>Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none">{o.owner_id}</TableCell>
                                                                                <TableCell align="right">{o.owner_name}</TableCell>
                                                                                <TableCell align="right">{o.upload_date}</TableCell>
                                                                                <TableCell align="right">
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right">{o.price}</TableCell>
                                                                                <TableCell align="right">{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                })}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </AccordionDetails>
                                            </Accordion>
                                    </div>) : l === 'Ambulance' ? (<div>
                                        <Accordion expanded={expanded === 'ambulance'} onChange={handleChange('ambulance')}  className="patientable accordian" onClick={()=>{handleBody(l)}}>
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
                                                                                        <Button color="primary" variant="outlined" onClick={()=>{data.push(o);}}>{o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small" onClick={()=>{setLogin(true)}}>Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none">{o.owner_id}</TableCell>
                                                                                <TableCell align="right">{o.owner_name}</TableCell>
                                                                                <TableCell align="right">{o.upload_date}</TableCell>
                                                                                <TableCell align="right">
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right">{o.price}</TableCell>
                                                                                <TableCell align="right">{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length === 0 && type === 'Showing Not Verified'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" onClick={()=>{data.push(o);}}>{o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small" onClick={()=>{setLogin(true)}}>Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none">{o.owner_id}</TableCell>
                                                                                <TableCell align="right">{o.owner_name}</TableCell>
                                                                                <TableCell align="right">{o.upload_date}</TableCell>
                                                                                <TableCell align="right">
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right">{o.price}</TableCell>
                                                                                <TableCell align="right">{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length >= 0 && type === 'Showing All'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" onClick={()=>{data.push(o);}}>{o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small" onClick={()=>{setLogin(true)}}>Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none">{o.owner_id}</TableCell>
                                                                                <TableCell align="right">{o.owner_name}</TableCell>
                                                                                <TableCell align="right">{o.upload_date}</TableCell>
                                                                                <TableCell align="right">
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right">{o.price}</TableCell>
                                                                                <TableCell align="right">{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                })}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </AccordionDetails>
                                            </Accordion>
                                    </div>) : l === 'Plasma' ? (<div>
                                        <Accordion expanded={expanded === 'plasmas'} onChange={handleChange('plasmas')}  className="patientable accordian" onClick={()=>{handleBody(l)}}>
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
                                                                                        <Button color="primary" variant="outlined" onClick={()=>{data.push(o);}}>{o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small" onClick={()=>{setLogin(true)}}>Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none">{o.owner_id}</TableCell>
                                                                                <TableCell align="right">{o.owner_name}</TableCell>
                                                                                <TableCell align="right">{o.upload_date}</TableCell>
                                                                                <TableCell align="right">
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right">{o.price}</TableCell>
                                                                                <TableCell align="right">{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length === 0 && type === 'Showing Not Verified'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" onClick={()=>{data.push(o);}}>{o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small" onClick={()=>{setLogin(true)}}>Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none">{o.owner_id}</TableCell>
                                                                                <TableCell align="right">{o.owner_name}</TableCell>
                                                                                <TableCell align="right">{o.upload_date}</TableCell>
                                                                                <TableCell align="right">
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right">{o.price}</TableCell>
                                                                                <TableCell align="right">{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length >= 0 && type === 'Showing All'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" onClick={()=>{data.push(o);}}>{o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small" onClick={()=>{setLogin(true)}}>Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none">{o.owner_id}</TableCell>
                                                                                <TableCell align="right">{o.owner_name}</TableCell>
                                                                                <TableCell align="right">{o.upload_date}</TableCell>
                                                                                <TableCell align="right">
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right">{o.price}</TableCell>
                                                                                <TableCell align="right">{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                })}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </AccordionDetails>
                                            </Accordion>
                                    </div>) : l === 'Vaccine' ? (<div>
                                        <Accordion expanded={expanded === 'vaccines'} onChange={handleChange('vaccines')}  className="patientable accordian" onClick={()=>{handleBody(l)}}>
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
                                                                                        <Button color="primary" variant="outlined" onClick={()=>{data.push(o);}}>{o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small" onClick={()=>{setLogin(true)}}>Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none">{o.owner_id}</TableCell>
                                                                                <TableCell align="right">{o.owner_name}</TableCell>
                                                                                <TableCell align="right">{o.upload_date}</TableCell>
                                                                                <TableCell align="right">
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right">{o.price}</TableCell>
                                                                                <TableCell align="right">{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length === 0 && type === 'Showing Not Verified'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" onClick={()=>{data.push(o);}}>{o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small" onClick={()=>{setLogin(true)}}>Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none">{o.owner_id}</TableCell>
                                                                                <TableCell align="right">{o.owner_name}</TableCell>
                                                                                <TableCell align="right">{o.upload_date}</TableCell>
                                                                                <TableCell align="right">
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right">{o.price}</TableCell>
                                                                                <TableCell align="right">{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                    else if(o.Verifications.length >= 0 && type === 'Showing All'){
                                                                        return(
                                                                            <TableRow hover role="checkbox">
                                                                                <TableCell padding="checkbox">
                                                                                    {userId !== 0 ? (<div>
                                                                                        <Button color="primary" variant="outlined" onClick={()=>{data.push(o);}}>{o.contactNumber}</Button>
                                                                                    </div>) : (<div>
                                                                                        <Button color="primary" variant="outlined" size="small" onClick={()=>{setLogin(true)}}>Get</Button>
                                                                                    </div>)}
                                                                                </TableCell>
                                                                                <TableCell scope="row" padding="none">{o.owner_id}</TableCell>
                                                                                <TableCell align="right">{o.owner_name}</TableCell>
                                                                                <TableCell align="right">{o.upload_date}</TableCell>
                                                                                <TableCell align="right">
                                                                                    {o.Verifications.map((v)=>{
                                                                                        return(
                                                                                            <div>{v}</div>
                                                                                        )
                                                                                    })}
                                                                                </TableCell>
                                                                                <TableCell align="right">{o.price}</TableCell>
                                                                                <TableCell align="right">{o.owner_address}</TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                })}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </AccordionDetails>
                                            </Accordion>
                                    </div>) : ''}
                                </div>
                            )
                        })}
                    <NavLink to="/"><Button variant="contained" color="primary">HOME</Button></NavLink><br/><br/>
                    <Button  variant="contained" color="primary" onClick={()=>{setTwitter(true)}}>Show From Twitter</Button>
                    </div>
                </div>)}
        </div>
    )
}

export default PatientAvailability
