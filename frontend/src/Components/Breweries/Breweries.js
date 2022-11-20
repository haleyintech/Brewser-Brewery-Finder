import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Shared/baseUrl';
import { Link } from 'react-router-dom';
import MainMenu from '../../Shared/MainMenu';
import { setAuthHeader } from '../../Redux/token';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import phoneFormat from '../../Shared/phoneFormat';
import './BreweryStyles.css';

function Breweries(props) {
    // store list of breweries in state
    const [breweries, setBreweries] = useState([]);
    // get token and user from redux store
    const token = useSelector(state=>state.token.token);
    const user = useSelector(state=>state.user);

    // set auth token in axios header before loading list of breweries
    useEffect(()=>{
        setAuthHeader(token);
        getData();
    },[token]);

    async function getData() {
        try {
            // get list of breweries 
            let response = await axios.get(baseUrl + "/breweries");
            // and save to state
            setBreweries(response.data);
        } catch (ex) {
            toast.error(ex.message,{
                position: toast.POSITION.BOTTOM_LEFT
            });
        }
    }
    // check if current user is administrator
    let isAdmin = false;
    let role = user.authorities[0]
    if(role) {
        if(role && role.name==="ROLE_ADMIN") {
            isAdmin = true;
        } 
    }
    return (
        <div>
            <MainMenu />
            <div className="row ms-2 mt-2">
                <div className='col'><h1>Brewery List</h1></div>
                {isAdmin?
                    (
                        <div className='col d-flex justify-content-end me-3'>
                            <Link to="/brewery-info"><button className="btn" type="button">Add</button></Link>
                        </div>
                    ):null
                }
            </div>
            <div className="row">
                {
                    breweries.map(brewery=>{
                        let link = "/brewery-info?" + brewery.breweryId;
                        return(
                            <div className="col-6" key={brewery.breweryId}>
                                <div className="brewery-card card m-2">
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <div><img className='img-fluid img-brewery rounded' src={brewery.imgUrl}></img></div>
                                            <div className="ms-2">
                                                <h5 className="card-title"><Link to={link}>{brewery.name}</Link></h5>
                                                <div className="card-text">
                                                <p>Address: {brewery.address}<br/>
                                                Phone: {phoneFormat(brewery.phone)}<br/>
                                                Hours: {brewery.hours}
                                                </p>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>

        </div>
    )
}

export default Breweries;