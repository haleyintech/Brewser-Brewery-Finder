import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Shared/baseUrl';
import { Link } from 'react-router-dom';
import MainMenu from '../../Shared/MainMenu';
import { setAuthHeader } from '../../Redux/token';
import { useSelector } from 'react-redux';

function BeerInfo(props) {
    // initialize beer in state (basis is server:Model Beer)
    const emptyBeer = {
        "beerId": 0,
        "breweryId": Number(getBreweryId()),
        "name": "",
        "description": "",
        "imgUrl": "",
        "abv": 0,
        "type": ""
    };

    const [beer, setBeer] = useState(emptyBeer);
    // get token and current user from redux store
    const token = useSelector(state => state.token.token);
    const user = useSelector(state => state.user);

    // set auth token in axios header before loading list of beers
    useEffect(() => {
        setAuthHeader(token);
        getData();
    }, [token]);

    async function getData() {
        try {
            // get beer from web api using the query string passed to the page
            let response = { data: emptyBeer};
            // check parameter from search string
            if (window.location.search) {
                // if brewery id is passed then assume that admin or brewer 
                // wants to add a new beer
                if(beer.breweryId===0) {
                    //get id after ?
                    let id = window.location.search.substring(1);
                    response = await axios.get(baseUrl + "/beers/" + id);
                    setBeer(response.data);
                }
            } else {
                alert("Beer id or brewery id required")
            }
        } catch (ex) {
            alert(ex);
        }
    }

    // update beer in state for each change in every form element
    function handleInputChange(event) {
        event.preventDefault()
        setBeer({
            ...beer,
            [event.target.name]: event.target.value
        })
    }

    async function handleSubmit(event) {
        // TO DO: validate beer information before sending to server
        event.preventDefault();
        try {
            //save to server
            //if id is zero then create (post) a new beer
            if (beer.beerId === 0) {
                await axios.post(baseUrl + "/breweries/"+beer.breweryId, beer);
            } else {
                // else update the existing record
                await axios.put(baseUrl + "/beers/" + beer.beerId, beer);
            }

            // then redirect to list of beers
            window.location = "/beers?breweryId="+beer.breweryId;
        } catch (ex) {
            alert(ex);
        }
    }
    function handleDelete(event) {
        return
    }

    function getBreweryId() {
        if(window.location.search && window.location.search.indexOf("?breweryId=")>=0) {
            return window.location.search.substring(11);
        } else {
            return "0";
        }
    }
    // check if current user can edit the form
    let isEditable = false;
    let role = user.authorities[0]
    if (role) {
        if (role.name === "ROLE_ADMIN" ||
            (role.name === "ROLE_BREWER" && user.breweryId === beer.breweryId)) {
            isEditable = true;
        }
    }
    // change display based on access
    return (
        <div>
            <MainMenu />
            <div>BeerInfo component</div>
            <label className="label">Beer Name</label>
            <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Beer Name"
                v-model="beer.name"
                onChange={handleInputChange}
                value={beer.name}
                readOnly={beer.beerId !== 0}
            />
            <label className="label">Description</label>
            <input
                type="text"
                id="description"
                name="description"
                className="form-control"
                placeholder="Description"
                v-model="beer.description"
                onChange={handleInputChange}
                value={beer.description}
                required
            />
            <label className="label">Image</label>
            <input
                type="text"
                id="imgUrl"
                name="imgUrl"
                className="form-control"
                placeholder="Image Url"
                v-model="beer.imgUrl"
                onChange={handleInputChange}
                value={beer.imgUrl}
                required
            />
            <label className="label">Alcohol by Volume (ABV)</label>
            <input
                type="text"
                id="abv"
                name="abv"
                className="form-control"
                placeholder="ABV"
                v-model="beer.abv"
                onChange={handleInputChange}
                value={beer.abv}
                required
            />
            <label className="label">Type</label>
            <input
                type="text"
                id="type"
                name="type"
                className="form-control"
                placeholder="Type"
                v-model="beer.type"
                onChange={handleInputChange}
                value={beer.type}
                required
            />

            <div className="buttonContainer">
                {isEditable ?
                    (
                        <div>
                            <button className="button" type="submit" onClick={handleSubmit}>Save</button>
                        </div>
                    ) : null
                }
                <div>
                    <Link to={"/beers"+(beer.breweryId>0?"?breweryId="+(user.authorities[0].name==="ROLE_ADMIN"?beer.breweryId:user.breweryId):"")}><button className="button" type="cancel">Cancel</button></Link>
                </div>
                <div></div>
                <div>
                    <button className="button" type="cancel" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default BeerInfo;