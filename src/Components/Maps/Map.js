import React, { useEffect, useState } from 'react'
import fetch from 'isomorphic-fetch'
import { compose, withProps, withStateHandlers } from 'recompose'
import {Marker,GoogleMap,withScriptjs,withGoogleMap,InfoWindow} from 'react-google-maps'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import volunteer from '../../Img/helping.png'
import patient from '../../Img/patient.png'
import cylinder from '../../Img/cylinder.png'
import beds from '../../Img/bed.png'
import transport from '../../Img/transport.png'
import blood from '../../Img/blood.png'
import vaccine from '../../Img/vaccine.png'
import ambulance from '../../Img/ambulance.png'


const MapWithAMarkerClusterer = compose(
	withProps({
		googleMapURL:'https://maps.googleapis.com/maps/api/js?key=AIzaSyCSozCpAn3_xhiippC2_03Gd524yLtwu4E&v=3.exp&libraries=geometry,drawing,places',
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `400px` }} />,
		mapElement: <div style={{ height: `100%` }} />
	}),
	withStateHandlers(
    () => ({
		onMarkerClustererClick: () => markerClusterer => {
			const clickedMarkers = markerClusterer.getMarkers()
		},
		isOpen: {},
	}),
    {
		onToggleOpen: ({ isOpen }) => props => {
			return {
				isOpen: {
					[props]: !isOpen[props]
				}
			};
		}
    }
	),
	withScriptjs,
	withGoogleMap
)
(props => (
	<GoogleMap defaultZoom={12} defaultCenter={{ lat: parseInt(props.lat), lng: parseInt(props.lon)}}>
		<MarkerClusterer
			onClick={props.onMarkerClustererClick}
			averageCenter
			enableRetinaIcons
			gridSize={60}
			label={"hi"}
		>
			<Marker
				icon={patient}
				title="Your Location"
				position={{ lat: parseInt(props.lat), lng: parseInt(props.lon) }}
			/>
			{props.markers.map((marker,i)=>{
				if(props.type.includes(marker.type)){
					return(
				<Marker
					icon={
						marker.type === 'Oxygen Cylinders' ? cylinder : 
						marker.type === 'ICU Beds' ? beds : 
						marker.type === 'Private Transport' ? transport : 
						marker.type === 'Ambulance' ? ambulance : 
						marker.type === 'Plasma' ? blood : 
						marker.type === 'Vaccine' ? vaccine : 
					''}
					key={marker.owner_id}
					position={{ lat: marker.latitude, lng: marker.longitude }}
					onClick={() => props.onToggleOpen(marker.owner_id)}
				>
					{props.isOpen[marker.owner_id] && (
						<InfoWindow onCloseClick={props.onToggleOpen}>
							<div>
								<strong>Availability : </strong>{marker.availability}
								<br/>
								<strong>Type : </strong>{marker.type}
								<br/>
								<strong>DonorID : </strong>{marker.owner_id}
								<br/>
								<strong>Name : </strong>{marker.owner_name}
								<br/>
								<strong>UploadDate : </strong>{marker.upload_date}
								<br/>
								<strong>VerifiedDate : </strong>{marker.verifiedOn}
								<br/>
								<strong>VerifiedBy : </strong>{marker.verifiedBy}
								<br/>
								<strong>DonorAddress : </strong>{marker.owner_address}
								<br/>
							</div>
						</InfoWindow>
					)}
				</Marker>
				)
				}
			})}
		</MarkerClusterer>
	</GoogleMap>
))
function DemoApp(props) {
    const [lat,setLat] = useState(0);
    const [lon,setLon] = useState(0);
	const [markers,setMarkers] = useState([]);
	const [oxygenCylinders,setOxygenCylinders] = useState([
		{height: 375,latitude: 15.912899800000002,longitude: 79.7399875,owner_id: 4480,owner_name: "Madhu",type:"Oxygen Cylinders",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27930,verifiedBy: "18pa1a1213@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 16.912899800000002,longitude: 80.7399875,owner_id: 4481,owner_name: "Abhinav",type:"Oxygen Cylinders",owner_address: "rajolu",verifiedOn: "12-04-2021",photo_id: 27931,verifiedBy: "18pa1a1214@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 17.912899800000002,longitude: 81.7399875,owner_id: 4482,owner_name: "Sai",type:"Oxygen Cylinders",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27932,verifiedBy: "18pa1a1215@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 14.912899800000002,longitude: 78.7399875,owner_id: 4486,owner_name: "Hari",type:"Oxygen Cylinders",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27933,verifiedBy: "18pa1a1216@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 13.912899800000002,longitude: 77.7399875,owner_id: 4484,owner_name: "Richad",type:"Oxygen Cylinders",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27934,verifiedBy: "18pa1a1217@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 13.912899800000002,longitude: 76.7399875,owner_id: 4485,owner_name: "babu",type:"Oxygen Cylinders",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27935,verifiedBy: "18pa1a1219@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 25.912899800000002,longitude: 79.7399875,owner_id: 4580,owner_name: "Madhu",type:"ICU Beds",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27930,verifiedBy: "18pa1a1213@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 26.912899800000002,longitude: 80.7399875,owner_id: 4581,owner_name: "Abhinav",type:"ICU Beds",owner_address: "rajolu",verifiedOn: "12-04-2021",photo_id: 27931,verifiedBy: "18pa1a1214@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 27.912899800000002,longitude: 81.7399875,owner_id: 4582,owner_name: "Sai",type:"ICU Beds",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27932,verifiedBy: "18pa1a1215@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 24.912899800000002,longitude: 78.7399875,owner_id: 4586,owner_name: "Hari",type:"ICU Beds",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27933,verifiedBy: "18pa1a1216@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 23.912899800000002,longitude: 77.7399875,owner_id: 4584,owner_name: "Richad",type:"ICU Beds",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27934,verifiedBy: "18pa1a1217@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 23.912899800000002,longitude: 76.7399875,owner_id: 4585,owner_name: "babu",type:"ICU Beds",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27935,verifiedBy: "18pa1a1219@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 35.912899800000002,longitude: 79.7399875,owner_id: 4680,owner_name: "Madhu",type:"Private Transport",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27930,verifiedBy: "18pa1a1213@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 36.912899800000002,longitude: 80.7399875,owner_id: 4681,owner_name: "Abhinav",type:"Private Transport",owner_address: "rajolu",verifiedOn: "12-04-2021",photo_id: 27931,verifiedBy: "18pa1a1214@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 37.912899800000002,longitude: 81.7399875,owner_id: 4682,owner_name: "Sai",type:"Private Transport",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27932,verifiedBy: "18pa1a1215@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 34.912899800000002,longitude: 78.7399875,owner_id: 4686,owner_name: "Hari",type:"Private Transport",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27933,verifiedBy: "18pa1a1216@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 33.912899800000002,longitude: 77.7399875,owner_id: 4684,owner_name: "Richad",type:"Private Transport",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27934,verifiedBy: "18pa1a1217@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 33.912899800000002,longitude: 76.7399875,owner_id: 4685,owner_name: "babu",type:"Private Transport",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27935,verifiedBy: "18pa1a1219@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 45.912899800000002,longitude: 79.7399875,owner_id: 4780,owner_name: "Madhu",type:"Ambulance",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27930,verifiedBy: "18pa1a1213@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 46.912899800000002,longitude: 80.7399875,owner_id: 4781,owner_name: "Abhinav",type:"Ambulance",owner_address: "rajolu",verifiedOn: "12-04-2021",photo_id: 27931,verifiedBy: "18pa1a1214@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 47.912899800000002,longitude: 81.7399875,owner_id: 4782,owner_name: "Sai",type:"Ambulance",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27932,verifiedBy: "18pa1a1215@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 47.912899800000002,longitude: 78.7399875,owner_id: 4786,owner_name: "Hari",type:"Ambulance",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27933,verifiedBy: "18pa1a1216@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 43.912899800000002,longitude: 77.7399875,owner_id: 4784,owner_name: "Richad",type:"Ambulance",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27934,verifiedBy: "18pa1a1217@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 43.912899800000002,longitude: 76.7399875,owner_id: 4785,owner_name: "babu",type:"Ambulance",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27935,verifiedBy: "18pa1a1219@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 55.912899800000002,longitude: 79.7399875,owner_id: 4880,owner_name: "Madhu",type:"Plasma",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27930,verifiedBy: "18pa1a1213@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 56.912899800000002,longitude: 80.7399875,owner_id: 4881,owner_name: "Abhinav",type:"Plasma",owner_address: "rajolu",verifiedOn: "12-04-2021",photo_id: 27931,verifiedBy: "18pa1a1214@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 57.912899800000002,longitude: 81.7399875,owner_id: 4882,owner_name: "Sai",type:"Plasma",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27932,verifiedBy: "18pa1a1215@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 54.912899800000002,longitude: 78.7399875,owner_id: 4886,owner_name: "Hari",type:"Plasma",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27933,verifiedBy: "18pa1a1216@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 53.912899800000002,longitude: 77.7399875,owner_id: 4884,owner_name: "Richad",type:"Plasma",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27934,verifiedBy: "18pa1a1217@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 53.912899800000002,longitude: 76.7399875,owner_id: 4885,owner_name: "babu",type:"Plasma",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27935,verifiedBy: "18pa1a1219@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 65.912899800000002,longitude: 79.7399875,owner_id: 4980,owner_name: "Madhu",type:"Vaccine",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27930,verifiedBy: "18pa1a1213@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 66.912899800000002,longitude: 80.7399875,owner_id: 4981,owner_name: "Abhinav",type:"Vaccine",owner_address: "rajolu",verifiedOn: "12-04-2021",photo_id: 27931,verifiedBy: "18pa1a1214@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 67.912899800000002,longitude: 81.7399875,owner_id: 4982,owner_name: "Sai",type:"Vaccine",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27932,verifiedBy: "18pa1a1215@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 64.912899800000002,longitude: 78.7399875,owner_id: 4986,owner_name: "Hari",type:"Vaccine",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27933,verifiedBy: "18pa1a1216@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 63.912899800000002,longitude: 77.7399875,owner_id: 4984,owner_name: "Richad",type:"Vaccine",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27934,verifiedBy: "18pa1a1217@vishnu.edu.in",availability: "Available",upload_date: "25 June 2006",width: 500},
		{height: 375,latitude: 63.912899800000002,longitude: 76.7399875,owner_id: 4985,owner_name: "babu",type:"Vaccine",owner_address: "bhimavaram",verifiedOn: "12-04-2021",photo_id: 27935,verifiedBy: "18pa1a1219@vishnu.edu.in",availability: "Not Available",upload_date: "25 June 2006",width: 500},
	])
	const [array,setArray] = useState();
	useEffect(() => {
		setArray(props.location.state.finallist);
		var options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};
		function success(pos) {
			var crd = pos.coords;
			setLat(crd.latitude.toString())
			setLon(crd.longitude.toString())
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
			{data.photos.map((m)=>{
				k = k + 1;
				if(k<100){
				markers.push(m);
				}
			})}
		})
	}, [])
	return(
		<div>
			<MapWithAMarkerClusterer
					markers={oxygenCylinders}
				lat={lat} lon={lon} type={array}/>
		</div>)

}

export default DemoApp