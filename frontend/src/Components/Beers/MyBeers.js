import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Shared/baseUrl';
import { Link } from 'react-router-dom';
import MainMenu from '../../Shared/MainMenu';
import { setAuthHeader } from '../../Redux/token';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';

/* List existing beers of the Brewery creating a new Beer */
function MyBeers(props) {
    // store list of beers in state
    const [beers, setBeers] = useState([]);
    // get token and user from redux store
    const token = useSelector(state => state.token.token);
    const user = useSelector(state => state.user);

    // set auth token in axios header before loading list of beers
    useEffect(() => {
        setAuthHeader(token);
        getData();
    },[token]);

    async function getData() {
        try {
            // check parameter from search string
            let data = [];
            // if brewery id is passed then remember the beweryId and 
            // load all the beers for the brewery
            let breweryId = getBreweryId();
            if (breweryId > "0") {
                // get list of beers of the brewery creating/updating its beers
                let response = await axios.get(baseUrl + "/breweries/" + breweryId + "/beers");
                data = response.data;
            } else {
                // get list of beers 
                let response = await axios.get(baseUrl + "/beers");
                data = response.data;
            }
            // and save to state
            setBeers(data);
        } catch (ex) {
            toast.error(ex.message,{
                position: toast.POSITION.BOTTOM_LEFT
            });
        }
    }
    function getBreweryId() {
        if (window.location.search && window.location.search.indexOf("?breweryId=") >= 0) {
            return window.location.search.substring(11);
        } else {
            return "0";
        }
    }
    function redirectToCaller(event) {
        event.preventDefault();
        window.history.back();
    }
    // check if current user is brewer
    let breweryId = getBreweryId();
    let isBrewer = false;
    let role = user.authorities[0]
    if (role) {
        if ((role.name === "ROLE_ADMIN" && breweryId !== "0") ||
            (role.name === "ROLE_BREWER" && user.breweryId
                && user.breweryId !== 0 && user.breweryId === Number(breweryId))) {
            isBrewer = true;
        }
    }
    return (
        <div>
            <MainMenu />
            <div className='card m-2'>
                <div className='card-body'>
                    <div className="row">
                        <div className='col'><h1>Beer List</h1></div>
                        <div className='col d-flex justify-content-end me-3'>
                            {isBrewer ?
                                (

                                    <Link to={"/beer-info?breweryId=" + getBreweryId()}><button className="btn btn-primary" type="button">Add</button></Link>
                                ) : null
                            }
                            <button className="btn btn-primary ms-2" type="cancel" onClick={redirectToCaller}>Cancel</button>
                           
                        </div>
                    </div>
                    <div className="row mt-2">
                        {
                            beers.map(beer => {
                                let link = "/beer-info?" + beer.beerId;
                                return (
                                    <div key={beer.beerId}>
                                        <h5><Link to={link}>{beer.name}</Link></h5>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyBeers;