import { Button, MenuItem, Select } from '@material-ui/core'
import { Home } from '@material-ui/icons'
import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../Styles/Patient.css'
import { UserProvider } from '../UserContext'
import PatientAvailability from './PatientAvailability'

const madhu = () => {
    const user = { name: 'Tania', loggedIn: true }
    return(
        <UserProvider value={user}>
            <PatientAvailability />
        </UserProvider>
    )
}
class PatientLocation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countries : [],
			states : [],
			cities : [],
			selectedCountry : '',
			selectedState : '',
            selectedCity:''
		};
		this.changeCountry = this.changeCountry.bind(this);
		this.changeState = this.changeState.bind(this);
        this.changeCity = this.changeCity.bind(this);
	}
	componentDidMount() {
		this.setState({
			countries : [
				{
                    State: 'Andhra Pradesh', 
                    states: [ 
                        {
                            State: 'Anantapur', cities: ['Anantapuram','Dharmavaram','Hindupuram','Kadiri','Madakasira','Penukonda','Rayadurgam','Kalyanadurgam','Gooty','Tadipatri','Urvakonda','Singanamala','Kanekallu','Kambadur','Puttaparthi','Nallamada','Chennekothapalle',]
                        },
                        {
                            State: 'Chittoor', cities: ['Chittoor','Tirupati','Madanapalle','Punganur','Palamaneru','Kuppam','Bangarupalem','Srikalahasthi','Satyavedu','Puttur','Chandragiri','Thamballapalle','Chinnagottigalu','Thottambadu','Nagari']
                        },
                        {
                            State: 'East Godavari', cities: ['Kakinada','Rajahmundry','Amalapuram','Mummidivaram','Razole','Kothapeta','Alamur','Ramachandrapuram','Rampachodavaram','Yellavaram ','Peddapuram','Prathipadu','Tuni','Pithapuram','Tallaveru','P.Gannavaram','Rayavaram','Rangampeta','MANDAPETA']
                        },
                        {
                            State: 'Guntur', cities: ['Guntur','Tenali','Repalle','Bapatla','Narasaraopeta','Vinukonda','Palnadu ','Sattenapalle','Prathipadu','Tadikonda','Mangalagiri','Emani','Amruthalur','Pallapata','Bapatla','Chilakaluripeta','Ipur','Macherla','Piduguralla','Rajupalem','Talluru']
                        },
                        {
                            State: 'Krishna', cities: ['Jaggayyapet','Nandigama','Kanchikacherla','Mylavaram','Tiruvuru','Vissannapet','Nuzvid','Gannavaram','Vijayawada','Vuyyuru','Gudivada','Mandavalli','Kaikalur','Bantumilli','Pamarru','Movva','Bandar','Divi']
                        },
                        {
                            State: 'Kurnool', cities: ['Kurnool','Adoni','Nandyal','Yemmiganur','Dhone','Atmakur','Nandikotkur','Allagadda','Banaganapalle','Koilakuntla','Kodumur','Alur','Pattikonda']
                        },
                        {
                            State: 'Kadapa', cities: ['Kadapa','Rajampeta','Pulivendula','Proddutur','Badvel','Sidhout','Rayachoti','Kamalapuram','Jammalamadugu','Muddanur','Kodur','Lakkireddipalli']
                        },
                        {
                            State: 'Nellore', cities: ['Nellore','Gudur','Sullurpet','Venkatagiri','Rapur','Atmakur','Udayagiri','Kovur','Kavali','Indurkurpet','Vakadu','Naidupet','Podalakur','Vinjamur','Buchireddipalem']
                        },
                        {
                            State: 'Prakasam', cities: ['Ongole','Kandukur','Kanigiri','Giddalur','Markapuram','Podili','Darsi','Addanki','Chirala','Maddipadu','Parchur','Santhamaguluru','Bestavaripeta','Yerragondapalem','Tarlupadu','Pamuru','Kondapi']
                        },
                        {
                            State: 'Srikakulam', cities: ['Srikakulam','Cheepurupalle','Bobbili','Salur','Parvathipuram','Palakonda','Pathapatnam','Narsannapeta','Tekkali','Sompet','Ichapuram','Amadalavalasa','Rajam','Hiramandalam','Kotabommali','Palasa','Ranasthalam','Ponduru']
                        },
                        {
                            State: 'Visakhapatnam', cities: ['Visakhapatnam','Anakapalle','Yelamanchili','Narasapatnam','Chintapalle','Paderu','Chodavaram','Srungavarapukota','Gajapathinagaram','Vizianagaram','Bheemunipatnam']
                        },
                        {
                            State: 'Vizianagaram', cities: []
                        },
                        {
                            State: 'West Godavari', cities: ['Eluru','Chintalapudi','Polavaram','Kovvur','Tadepalligudem','Tanuku','Narsapur','Bheemavaram','Bhimadole','Gopalapuram','Ganapavaram','Penumantra','Poduru','Akiveedu']
                        },
                        
                    ]
                },
				{
                    State: 'Arunachal Pradesh',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
				{
                    State: 'Assam',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Bihar',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Chhattisgarh',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Goa',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Gujarat',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Haryana',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Himachal Pradesh',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Jharkhand',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Karnataka',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Kerala',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Madhya Pradesh',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Maharashtra',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Manipur',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Meghalaya',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Mizoram',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Nagaland',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Odisha',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Punjab',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Rajasthan',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Sikkim',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Tamil Nadu',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Telangana',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Tripura',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Uttarakhand',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'Uttar Pradesh',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                {
                    State: 'West Bengal',
                    states: [
                        {
                            State: ['B','c'], cities: ['Barcelona']
                        }
                    ]
                },
                
			]
		});
	}
	changeCountry(event) {
		this.setState({selectedCountry: event.target.value});
		this.setState({states : this.state.countries.find(cntry => cntry.State === event.target.value).states});
	}

	changeState(event) {
		this.setState({selectedState: event.target.value});
		const stats = this.state.countries.find(cntry => cntry.State === this.state.selectedCountry).states;
		this.setState({cities : stats.find(stat => stat.State === event.target.value).cities});
	}
	changeCity(event){
        this.setState({selectedCity: event.target.value});
    }
	render() {
		return (
			<nav className="glass">
				<div className="patientlocation">
                    <div>
                        <label>Choose State : </label>
                        <Select placeholder="State" value={this.state.selectedCountry} onChange={this.changeCountry}>
                            {this.state.countries.map((e, key) => {
                                return <MenuItem value={e.State} key={key}>{e.State}</MenuItem>;
                            })}
                        </Select>
                    </div>
                    <div>
                        <label>Choose District : </label>
                        <Select placeholder="District" value={this.state.selectedState} onChange={this.changeState}>
                            {this.state.states.map((e, key) => {
                                return <MenuItem value={e.State} key={key}>{e.State}</MenuItem>;
                            })}
                        </Select>
                    </div>
                    <div>
                        <label>Choose Mandal : </label>
                        <Select placeholder="City" value={this.state.selectedCity} onChange={this.changeCity}>
                            {this.state.cities.map((e, key) => {
                                return <MenuItem value={e} key={key}>{e}</MenuItem>;
                            })}
                        </Select>
                    </div>
                    <br/><br/><br/><br/><br/><br/><br/>
                    <NavLink to="/"><Button variant="contained" color="primary">HOME</Button></NavLink>{" "}
                    {/* {this.state.selectedCity.length>1 ? 
                        <NavLink to="/patient-requirements"><Button variant="contained" color="primary" onClick={()=>{madhu()}}>Search</Button></NavLink> : 
                        <Button variant="contained" color="primary" onClick={()=>{madhu()}}>Search</Button>
                        } */}
                    <NavLink
                        to={{
                                pathname:'/patient-requirements',
                                state: {
                                    State:this.state.selectedCountry,
                                    District:this.state.selectedState,
                                    Mandal:this.state.selectedCity
                                } 
                            }}
                            exact
                        ><Button variant="contained" color="primary">Search</Button>
                    </NavLink>
                    {/* <Button variant="contained" color="primary" onClick={()=>{console.log(this.state.selectedCountry,this.state.selectedState,this.state.selectedCity)}}>Search</Button> */}
                </div>
			</nav>
		)
	}
}
export default PatientLocation;