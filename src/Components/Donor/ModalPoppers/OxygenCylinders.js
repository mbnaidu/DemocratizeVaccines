import { Button, Grid, TextField,Icon,} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React, { useState } from 'react'
import BatteryStdSharpIcon from '@material-ui/icons/BatteryStdSharp';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { ModalBody, ModalFooter } from 'react-bootstrap';
import { Modal } from 'bootstrap';

function OxygenCylinders() {
    const [show,setShow] = useState(false);
    const oxygen = () => {
        return(
            <div>
                <div class="contentarea">
                    <div class="camera">
                        <video id="video">Video stream not available.</video>
                    </div>
                        <Button id="startbutton" endIcon={<AddAPhotoIcon></AddAPhotoIcon>}>Capture</Button>
                    <br/>
                    <canvas id="canvas"></canvas>
                    <div class="output">
                        <img id="photo" alt="The screen capture will appear in this box." />
                    </div>
                    <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>}>Submit</Button>
                </div>
            <script src="../js/FileSaver.min.js"></script>
            <script src="../js/script.js"></script>
            </div>
        )
    }
    
    return (
        <div>
            <Modal show={show}>
                <div>
                    <h5 >Oxygen Cylinders</h5>
                    <button type="button" class="close"  aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <ModalBody >
                        {oxygen()}
                    </ModalBody>
                    <ModalFooter >
                        <Button color="primary" variant="outlined" onClick={()=>{setShow(false)}} >Close</Button>
                    </ModalFooter>
                </div>
                </Modal>
            <div >
                <div className="row">
                    <div className="column">
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AccountCircle />
                            </Grid>
                            <Grid item>
                                <TextField id="input-with-icon-grid" label="madhu1213" disabled/>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="column">
                        <Button  data-toggle="modal" data-target="#picturecapture" endIcon={<CallMadeIcon></CallMadeIcon>}>Send Pictures</Button>
                    </div>
                </div>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <BatteryStdSharpIcon />
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="Quantity" type="number"/>
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <LocalOfferIcon />
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="Price for each" type="number" />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <LocationOnIcon />
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="Address" type="text" />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default OxygenCylinders
