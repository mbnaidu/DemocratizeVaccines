import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Icon, Input, TextField } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { NavLink} from 'react-router-dom'
import VpnKeyIcon from '@material-ui/icons/VpnKey';







function DonorRequirements() {
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
    return (
        <nav className="glass">
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
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        <div className="alignList">
                            <FormControl>
                                <FormLabel>What Do You Have..?</FormLabel>
                                <FormGroup>
                                    {names.map((n,key={n})=>{
                                        return(
                                            <div>
                                                <FormControlLabel
                                                    key={n.id}
                                                    control={<Checkbox name={n.value} color="primary"  onChange={()=>{handleInput(n.value)}}/>}
                                                    label={n.value}
                                                />
                                            </div>
                                        )
                                    })}
                                </FormGroup>
                                <br/><br/>
                                <NavLink
                                    to={{
                                        pathname:'/donor-availability',
                                            state: {
                                                address:donorAddress,
                                                list:finalList,
                                                location:longLatt,
                                                user:'userId',
                                                password:'pass',
                                            } 
                                        }}
                                        exact
                                >
                                <Button variant="contained" color="primary" >Next</Button></NavLink>
                            </FormControl>
                        </div>
            </div>))}
        </nav>
    )
}

export default DonorRequirements
