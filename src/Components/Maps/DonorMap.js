import React, { useState } from 'react'

import MapPicker from 'react-google-map-picker'
// var x = 0;
// function getLocation() {
//     console.log("hi")
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
    
//   } else { 
    
//   }
// }
// function showPosition(position) {
//     x = 30
// }
// getLocation()
// console.log("hiii",x    ,typeof(x))

var global = 0; //Define global variable outside of function

function setGlobal(){
    global = 10
    if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            });
        }
};
setGlobal();
console.log(global); //This will print out "Hello World"
const DefaultLocation = {lat: 0,
  lng: 86.9250}
const DefaultZoom = 10;

const DonorMap = () => {

  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation (lat, lng){
    setLocation({lat:lat, lng:lng});
  }
  
  function handleChangeZoom (newZoom){
    setZoom(newZoom);
  }

  function handleResetLocation(){
    setDefaultLocation({ ... DefaultLocation});
    setZoom(DefaultZoom);
  }

  return (
    <>
  <button onClick={handleResetLocation}>Reset Location</button>
  <label>Latitute:</label><input type='text' value={location.lat} disabled/>
  <label>Longitute:</label><input type='text' value={location.lng} disabled/>
  <label>Zoom:</label><input type='text' value={zoom} disabled/>
  
  <MapPicker defaultLocation={defaultLocation}
    zoom={zoom}
    style={{height:'700px'}}
    onChangeLocation={handleChangeLocation} 
    onChangeZoom={handleChangeZoom}
    apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'/>
  </>
  );
}

export default DonorMap