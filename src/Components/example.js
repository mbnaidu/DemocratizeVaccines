import React, { Component } from "react";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import { Badge, Button } from "@material-ui/core";
import user from '../Img/user.png';
import supplier from '../Img/supplier.jpg';
import volunteer from '../Img/v1.png';
import logo from '../Img/logo.webp';
import { NavLink } from "react-router-dom";


export default class Example extends Component {
    state = {
        goToSlide: 0,
        offsetRadius: 2,
        showNavigation: true,
        config: config.gentle
    };

    slides = [
        {
            key: 1,
            content: 
            <Badge badgeContent={"Users : "+5674} color="primary" anchorOrigin={{vertical: 'top',horizontal: 'left',}}>
                <div className="our-team">
                    <div className="picture">
                    <img className="img-fluid" src={user} alt="image"/>
                    </div>
                    <div className="team-content">
                    <h3 className="name">Patient</h3>
                    <Button color="primary" variant="contained" className="title">Google Location Is required</Button>
                    </div>
                    <ul className="social">
                        <li><NavLink to="/patient-requirements"><Button variant="contained" color="primary">Go</Button></NavLink></li>
                    </ul>
                </div>
            </Badge>
        },
        {
            key: 2,
            content:
            <Badge badgeContent={"Suppliers : "+784} color="primary" anchorOrigin={{vertical: 'top',horizontal: 'left',}}>
                <div className="our-team">
                    <div className="picture">
                    <img className="img-fluid" src={supplier} alt="logo"/>
                    </div>
                    <div className="team-content">
                    <h3 className="name">SUPPLIER</h3>
                    <Button color="primary" variant="contained" className="title">Google Location Is required</Button>
                    </div>
                    <ul className="social">
                        <NavLink to="/donor-requirements"><Button variant="contained" color="primary" >GO</Button></NavLink>
                    </ul>
                </div>
            </Badge>
        },
        {
            key: 3,
            content: 
            <Badge badgeContent={"Volunteers : "+56784} color="primary" anchorOrigin={{vertical: 'top',horizontal: 'left',}}>
                <div className="our-team">
                <div className="picture">
                <img className="img-fluid"  src={volunteer} alt="logo"/>
                </div>
                <div className="team-content">
                <h3 className="name">VOLUNTEER</h3>
                <Button color="primary" variant="contained" className="title">Google Location Is required</Button>
                </div>
                <ul className="social">
                    <NavLink to="/volunteer-requirements"><Button variant="contained" color="primary" >GO</Button></NavLink>
                </ul>
            </div>
            </Badge>
        },
    ].map((slide, index) => {
        return { ...slide, onClick: () => this.setState({ goToSlide: index }) };
    });

    onChangeInput = e => {
        this.setState({
        [e.target.name]: parseInt(e.target.value, 10) || 0
        });
    };

    render() {
        return (
            <div>
                <img src={logo} alt="logo" height="100px" style={{marginLeft:"140px"}}/>
                <div style={{ width: "160%", height: "280px", marginTop: "80%" }}>
                    <Carousel
                    slides={this.slides}
                    goToSlide={this.state.goToSlide}
                    offsetRadius={this.state.offsetRadius}
                    showNavigation={this.state.showNavigation}
                    animationConfig={this.state.config}
                    />
                </div>
            </div>
        );
    }
    }
