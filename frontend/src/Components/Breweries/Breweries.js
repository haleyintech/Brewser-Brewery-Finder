import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Shared/baseUrl';
import { Link } from 'react-router-dom';
import MainMenu from '../../Shared/MainMenu';
import { setAuthHeader } from '../../Redux/token';
import { useSelector } from 'react-redux';

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
            alert(ex);
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
            <div>Brewery List</div>
            <div className="buttonContainer">
                {isAdmin?
                    (
                        <div>
                            <Link to="/brewery-info"><button className="button" type="button">Add</button></Link>
                        </div>
                    ):null
                }
            </div>
            <ul>
                {
                    breweries.map(brewery=>{
                        let link = "/brewery-info?" + brewery.breweryId;
                        return(
                            <li key={brewery.breweryId}>
                                <div><Link to={link}>{brewery.name}</Link></div>
                            </li>
                        );
                    })
                }
            </ul>

        </div>
    )
}

export default Breweries;