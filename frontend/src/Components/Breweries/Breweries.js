import * as React from 'react';
import axios from 'axios';
import { baseUrl } from '../../Shared/baseUrl';
import { Link } from 'react-router-dom';
import MainMenu from '../../Shared/MainMenu';

function Breweries(props) {
    function getData() {
        // call axios here
        //let response = axios.get(baseUrl + "/breweries");
        // return response
        //for testing only
        return [];
    }
    const breweries = getData();
    return (
        <div>
            <MainMenu />
            <div>Breweries component</div>
            <ul>
                {
                    breweries.map(brewery=>{
                        let link = "/brewery-info?" + brewery.id;
                        return(
                            <li>
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
