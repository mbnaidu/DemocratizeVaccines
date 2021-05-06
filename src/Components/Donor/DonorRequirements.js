import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, Icon, Input, TextField } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import VpnKeyIcon from '@material-ui/icons/VpnKey';







function DonorRequirements() {
    const [login,setLogin] = useState(true);
    const [signup,setSignup] = useState(false);
    const [generate,setGenerate] = useState("Generate")
    return (
        <nav className="glass">
            {signup ? (<div>
                {generate === "Generate" ? (
							<div>
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
								<Input placeholder="10-digit-phone-number" type="number" id="phonenumber"/>{' '}
								<Button variant="contained" color="primary" endIcon={<Icon>send</Icon>} onClick={()=>{setGenerate('Submit');}}>
									{generate}
								</Button>
							</div>
						) : (
							<div>
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
								<Input placeholder="6-digit-code" id="6digitcode"/>{' '}<Button variant="contained" color="primary" endIcon={<Icon>send</Icon>} onClick={()=>{setSignup(false);setLogin(true)}}>
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
                                            <TextField id="input-with-icon-grid" label="UserID" />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1} alignItems="flex-end">
                                        <Grid item>
                                            <VpnKeyIcon />
                                        </Grid>
                                        <Grid item>
                                            <TextField id="input-with-icon-grid" label="Password" type="password"/>
                                        </Grid>
                                    </Grid><br/><br/>
                                    <Button color="primary" variant="outlined" onClick={()=>{setLogin(false);}}>Login</Button>{' '}
                                    <Button color="secondary" variant="contained" onClick={()=>{setSignup(true);}}>Sign Up</Button>
                                </div>
            </div>) : (<div>
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        <FormControl component="fieldset">
                        <FormLabel component="legend">What Do You Have..?</FormLabel>
                        <FormGroup>
                        <FormControlLabel
                            control={<Checkbox name="Oxygen Cylinders" color="primary"/>}
                            label="Oxygen Cylinders"
                        />
                        <FormControlLabel
                            control={<Checkbox name="ICU Bed" color="primary"/>}
                            label="ICU Bed"
                        />
                        <FormControlLabel
                            control={<Checkbox name="Ambulance" color="primary"/>}
                            label="Ambulance"
                        />
                        <FormControlLabel
                            control={<Checkbox name="Private Transport" color="primary"/>}
                            label="Private Transport"
                        />
                        <FormControlLabel
                            control={<Checkbox name="Vaccine" color="primary"/>}
                            label="Vaccine"
                        />
                        <FormControlLabel
                            control={<Checkbox name="Plasma" color="primary"/>}
                            label="Plasma"
                        />
                        </FormGroup>
                        <br/><br/>
                        <NavLink to="/donor-availability"><Button variant="contained" color="primary">NEXT</Button></NavLink>
                    </FormControl>
            </div>))}
        </nav>
    )
}

export default DonorRequirements
