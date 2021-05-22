import React, { useEffect, useState } from 'react'
import fetch from 'isomorphic-fetch'
import { compose, withProps, withStateHandlers } from 'recompose'
import {Marker,GoogleMap,withScriptjs,withGoogleMap,InfoWindow,Polyline} from 'react-google-maps'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import volunteer from '../../Img/helping.png'
import patient from '../../Img/patient.png'
import cylinder from '../../Img/cylinder.png'
import beds from '../../Img/bed.png'
import transport from '../../Img/transport.png'
import blood from '../../Img/blood.png'
import vaccine from '../../Img/vaccine.png'
import ambulance from '../../Img/ambulance.png'
import { Button, Icon } from '@material-ui/core';
var haversine = require("haversine-distance");


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
		isvolunteer:{},
	}),
    {
		onToggleOpen: ({ isOpen }) => props => {
			return {
				isOpen: {
					[props]: !isOpen[props]
				}
			};
		}
    },
	{
		onToggleVolunteer: ({ isvolunteer }) => props => {
			return {
				isvolunteer: {
					[props]: !isvolunteer[props]
				}
			};
		}
    }
	),
	withScriptjs,
	withGoogleMap
)
(props => (
	<GoogleMap defaultZoom={12} defaultCenter={{ lat: parseFloat(props.lat), lng: parseFloat(props.lon)}}>
		<MarkerClusterer
			onClick={props.onMarkerClustererClick}
			averageCenter
			enableRetinaIcons
			gridSize={60}
			label={"hi"}
		>	
		{props.volunteers.map((v,key=v.owner_id)=>{
			if(parseInt(haversine({ lat: parseFloat(props.lat), lng: parseFloat(props.lon)}, { lat: v.latitude, lng: v.longitude})/1000) > 100){
				return(
					<Marker
							key={v.owner_id}
							icon={volunteer}
							title="volunteer"
							position={{ lat: v.latitude, lng: v.longitude }}
							onClick={() => props.onToggleOpen(v.owner_id)}	
					>
						{props.isOpen[v.owner_id] && (
						<InfoWindow onCloseClick={props.onToggleOpen}>
							<div>
								<strong>Status : </strong>{v.status}
								<br/>
								<strong>Type : </strong>{v.type}
								<br/>
								<strong>TotalVerfications : </strong>{v.verifications}
								<br/>
								<strong>Name : </strong>{v.owner_name}
								<br/>
								<strong>E-Mail : </strong>{v.email}
								<br/>
								<strong>VolunteerAddress : </strong>{v.owner_address}
								<br/>
								<strong>Distance : </strong>{parseInt(haversine({ lat: parseFloat(props.lat), lng: parseFloat(props.lon)}, { lat: v.latitude, lng: v.longitude})/1000)}<strong> KM</strong>
								<br/>
								<strong>ContactNumber : </strong><Button variant="outlined" color="primary" size="small" endIcon={<Icon>send</Icon>} >7981960932</Button>{' '}
								<br/>
							</div>
						</InfoWindow>
					)}
					</Marker>
				)
			}
		})}
			{/* <Marker
				icon={patient}
				title="Your Location"
				position={{ lat: parseFloat(props.lat), lng: parseFloat(props.lon) }}
			/> */}
			{/* parseInt(haversine({ lat: parseFloat(props.lat), lng: parseFloat(props.lon)}, { lat: marker.latitude, lng: marker.longitude})/1000) */}
			{props.details.map((marker,i)=>{
				console.log(marker)
				return(
					<div>
						{marker.datas.map((m)=>{
							console.log(m)
							return(
								<Marker
									icon={
										m.type === 'Oxygen Cylinders' ? cylinder : 
										m.type === 'ICU BEDS' ? beds : 
										m.type === 'PRIVATE TRANSPORT' ? transport : 
										m.type === 'AMBULANCE' ? ambulance : 
										m.type === 'BLOOD' ? blood : 
										m.type === 'VACCINE' ? vaccine : 
									''}
									key={m.date}
									position={{ lat: marker.latitude, lng: marker.longitude }}
									onClick={() => props.onToggleOpen(m.UserName)}	
								>
									<Polyline
										path={[
											{ lat: parseFloat(props.lat), lng: parseFloat(props.lon) },
											{ lat:  marker.latitude, lng: marker.longitude }
										]}
										geodesic={true}
										options={{
											strokeColor: "#ff2527",
											strokeOpacity: 0.75,
											strokeWeight: 2,
											icons: [
												{
													icon: vaccine,
													offset: "0",
													repeat: "20px"
												}
											]
										}}
									/>
									{props.isOpen[m.UserName] && (
										<InfoWindow onCloseClick={props.onToggleOpen}>
											<div>
												<strong>Name : </strong>{m.UserName}
												<br/>
												<strong>Type : </strong>{m.type}
												<br/>
												<strong>Quantity : </strong>{m.quantity}
												<br/>
												<strong>UploadDate : </strong>{m.date}
												<br/>
												<strong>Verifications : </strong>{m.verifications.map((v)=>{
													return(
														<div>
															{v}
														</div>
													)
												})}
												<br/>
												<strong>DonorAddress : </strong>{m.address}
												<br/>
												<strong>DonorAddress1 : </strong>{m.address1}
												<br/>
												<strong>Distance : </strong>{parseInt(haversine({ lat: parseFloat(props.lat), lng: parseFloat(props.lon)}, { lat: marker.latitude, lng: marker.longitude})/1000)}<strong> KM</strong>
												<br/>
												<strong>ContactNumber : </strong><Button variant="outlined" color="primary" size="small" endIcon={<Icon>send</Icon>} >{marker.contact}</Button>{' '}
												<br/>
											</div>
										</InfoWindow>
									)}
								</Marker>
								)
						})}
					</div>
				)
			})}
		</MarkerClusterer>
	</GoogleMap>
))
function DemoApp(props) {
    const [lat,setLat] = useState(0);
    const [lon,setLon] = useState(0);
	const [markers,setMarkers] = useState([]);
	const [array,setArray] = useState();
	useEffect(() => {
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
	
const [pathCoordinates,setPathCoordinates] = useState([
        { lat: 15.912899800000002, lng: 79.7399875 },
        { lat: 16.912899800000002, lng: 80.7399875 }
    ])
	{props.details.map((o)=>{
		pathCoordinates.push({lat:(o.latitude),lng:(o.longitude)})
	})}
	return(
		<div>
			<MapWithAMarkerClusterer
				details={props.details}
					volunteers = {props.volunteers}
				lat={lat} lon={lon} type={array} pathCoordinates={pathCoordinates} userId={props.userId} phoneNumber={props.phoneNumber}/>
		</div>)

}

export default DemoApp