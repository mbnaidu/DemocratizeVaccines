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
	<GoogleMap defaultZoom={12} defaultCenter={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng)}}>
		<MarkerClusterer
			onClick={props.onMarkerClustererClick}
			averageCenter
			enableRetinaIcons
			gridSize={60}
			label={"hi"}
		>	
			{props.volunteers !== undefined ? (
				<div>
					{props.volunteers.map((v,key=v.owner_id)=>{
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
		})}
				</div>
			) : (<div></div>)}
			{/* <Marker
				icon={patient}
				title="Your Location"
				position={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }}
			/> */}
			{/* parseInt(haversine({ lat: parseFloat(props.lat), lng: parseFloat(props.lon)}, { lat: marker.latitude, lng: marker.longitude})/1000) */}
			{props.type === 'patient' ? (<div>
				{props.details.donors.map((marker,i)=>{
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
					<Polyline
						path={[
							{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) },
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
								<strong>Distance : </strong>{parseInt(haversine({ lat: parseFloat(props.lat), lng: parseFloat(props.lng)}, { lat: marker.latitude, lng: marker.longitude})/1000)}<strong> KM</strong>
								<br/>
								<strong>ContactNumber : </strong><Button variant="outlined" color="primary" size="small" onClick={()=>{console.log(marker,props.userId,props.phoneNumber,parseFloat(props.lat),parseFloat(props.lng))}} endIcon={<Icon>send</Icon>} >Send Request</Button>{' '}
								<br/>
							</div>
						</InfoWindow>
					)}
				</Marker>
				)
			})}
			</div>) : (<div>
				{props.details.length === undefined ? (<div>
					{props.details.datas.map((m)=>{
						return(
							<div>
								<Marker
								icon={
									m.type === 'Oxygen Cylinders' ? cylinder : 
									m.type === 'ICU BEDS' ? beds : 
									m.type === 'PRIVATE TRANSPORT' ? transport : 
									m.type === 'AMBULANCE' ? ambulance : 
									m.type === 'BLOOD' ? blood : 
									m.type === 'VACCINE' ? vaccine : 
								''}
								key={props.details._id}
								position={{ lat: props.details.latitude1, lng: props.details.longitude1 }}
								onClick={() => props.onToggleOpen(props.details._id)}	
							>
								{props.isOpen[props.details._id] && (
									<InfoWindow onCloseClick={props.onToggleOpen}>
										<div>
											<strong>Name : </strong>{m.username}
											<br/>
											<strong>Type : </strong>{m.type}
											<br/>
											<strong>Quantity : </strong>{m.quantity}
											<br/>
											<strong>Price : </strong>{m.price}
											<br/>
											<strong>UploadDate : </strong>{m.date}
											<br/>
											<strong>Verifications : </strong>{m.verifications.map((v)=>{return(<div>{v}</div>)})}
											<strong>DonorAddress : </strong>{m.address1.length >0 ? m.address1 : m.address}
											<br/>
											<strong>Distance : </strong>{parseInt(haversine({ lat: parseFloat(props.lat), lng: parseFloat(props.lng)}, { lat: props.details.latitude, lng: props.details.longitude})/1000)}<strong> KM</strong>
											<br/>
										</div>
									</InfoWindow>
								)}
							</Marker>
						</div>
						)
					})}
				</div>) : (<div>
					{props.details.map((marker,i)=>{
						console.log(marker)
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
					<Polyline
						path={[
							{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) },
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
					{props.isOpen[marker.owner_id] && (
						<InfoWindow onCloseClick={props.onToggleOpen}>
							<div>
								<strong>DonorID : </strong>{marker.owner_id}
								<br/>
								<strong>Name : </strong>{marker.owner_name}
								<br/>
								<strong>Type : </strong>{marker.type}
								<br/>
								<strong>UploadDate : </strong>{marker.upload_date}
								<br/>
								<strong>Verifications : </strong>{marker.Verifications.map((v)=>{return(<div>{v}</div>)})}
								<strong>DonorAddress : </strong>{marker.owner_address}
								<br/>
								<strong>Distance : </strong>{parseInt(haversine({ lat: parseFloat(props.lat), lng: parseFloat(props.lng)}, { lat: marker.latitude, lng: marker.longitude})/1000)}<strong> KM</strong>
								<br/>
								<strong>ContactNumber : </strong>{marker.contactNumber}
								<br/>
							</div>
						</InfoWindow>
					)}
				</Marker>
				)
			})}
				</div>)}
			</div>)}
		</MarkerClusterer>
	</GoogleMap>
))
function DemoApp(props) {
    const [lat,setLat] = useState(0);
    const [lng,setLng] = useState(0);
	useEffect(() => {
		var options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};
		function success(pos) {
			var crd = pos.coords;
			setLat(crd.latitude.toString())
			setLng(crd.longitude.toString())
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
	return(
		<div>
			<MapWithAMarkerClusterer
					details={props.details}
					volunteers={props.volunteers}
					lat={lat} lng={lng} 
					types={props.types}
				/>
		</div>)

}

export default DemoApp