import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Shared/baseUrl';
import { Link } from 'react-router-dom';
import MainMenu from '../../Shared/MainMenu';
import { setAuthHeader } from '../../Redux/token';
import { useSelector } from 'react-redux';

function BreweryInfo(props) {
    // initialize brewery in state (basis is server:Model Brewery)
    const emptyBrewery = {
        "breweryId": 0,
        "name": "",
        "history": "",
        "address": "",
        "phone": "",
        "email": "",
        "imgUrl": "",
        "hours": "",
        "petFriendly": true
    };

    const [brewery, setBrewery] = useState(emptyBrewery);
    // get token and current user from redux store
    const token = useSelector(state => state.token.token);
    const user = useSelector(state => state.user);

    // set auth token in axios header before loading list of breweries
    useEffect(() => {
        setAuthHeader(token);
        getData();
    }, [token]);

    async function getData() {
        try {
            // get brewery from web api using the query string passed to the page
            let response = { data: emptyBrewery };
            // if a brewery id was passed to this page then get it from api otherwise return an empty brewery
            if (window.location.search) {
                //remove starting ?
                let id = window.location.search.substring(1);
                response = await axios.get(baseUrl + "/breweries/" + id);
            }
            setBrewery(response.data);
        } catch (ex) {
            alert(ex);
        }
    }

    // update brewery in state for each change in every form element
    function handleInputChange(event) {
        let value = event.target.value;
        if (event.target.type && event.target.type === "checkbox") {
            value = event.target.checked;
        }
        setBrewery({
            ...brewery,
            [event.target.name]: value
        })
    }

    async function handleSubmit(event) {
        // TO DO: validate brewery information before sending to server
        event.preventDefault();
        try {
            //save to server
            //if id is zero then create (post) a new brewery
            if (brewery.breweryId === 0) {
                await axios.post(baseUrl + "/breweries", brewery);
            } else {
                // else update the existing record
                await axios.put(baseUrl + "/breweries/" + brewery.breweryId, brewery);
            }

            // then redirect to list of breweries
            window.location = "/breweries";
        } catch (ex) {
            alert(ex);
        }
    }
    // check if current user can edit the form
    let isEditable = false;
    let role = user.authorities[0]
    if (role) {
        if (role.name === "ROLE_ADMIN" ||
            (role.name === "ROLE_BREWER" && user.breweryId === brewery.breweryId)) {
            isEditable = true;
        }
    }
    // change display based on access
    return (
        <div>
            <MainMenu />
            <div>BreweryInfo component</div>
            <label className="label">Brewery Name</label>
            <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Brewery Name"
                v-model="brewery.name"
                onChange={handleInputChange}
                value={brewery.name}
                readOnly={brewery.breweryId !== 0}
            />
            <label className="label">History</label>
            <input
                type="text"
                id="history"
                name="history"
                className="form-control"
                placeholder="History"
                v-model="brewery.history"
                onChange={handleInputChange}
                value={brewery.history}
                required
            />
            <label className="label">Address</label>
            <input
                type="text"
                id="address"
                name="address"
                className="form-control"
                placeholder="Address"
                v-model="brewery.address"
                onChange={handleInputChange}
                value={brewery.address}
                required
            />
            <label className="label">Phone</label>
            <input
                type="text"
                id="phone"
                name="phone"
                className="form-control"
                placeholder="Phone"
                v-model="brewery.phone"
                onChange={handleInputChange}
                value={brewery.phone}
                required
            />
            <label className="label">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Email"
                v-model="brewery.email"
                onChange={handleInputChange}
                value={brewery.email}
                required
            />

            <label className="label">Image</label>
            <input
                type="text"
                id="imgUrl"
                name="imgUrl"
                className="form-control"
                placeholder="Image Url"
                v-model="brewery.imgUrl"
                onChange={handleInputChange}
                value={brewery.imgUrl}
                required
            />
            <label className="label">Hours</label>
            <input
                type="text"
                id="hours"
                name="hours"
                className="form-control"
                placeholder="Hours"
                v-model="brewery.hours"
                onChange={handleInputChange}
                value={brewery.hours}
                required
            />
            <div>
                <input type="checkbox"
                    id="petFriendly"
                    name="petFriendly"
                    className="form-check-input me-2"
                    v-model="brewery.petFriendly"
                    onChange={handleInputChange}
                    checked={brewery.petFriendly}
                />
                <label className="label">Pet Friendly</label>
            </div>

            <div className="buttonContainer">
                {isEditable ?
                    (
                        <div>
                            <button className="button" type="submit" onClick={handleSubmit}>Save</button>
                        </div>
                    ) : null
                }
                <div>
                    <Link to="/breweries"><button className="button" type="cancel">Cancel</button></Link>
                </div>
                <div></div>
                <div>
                    <Link to={"/beers?breweryId=" + brewery.breweryId}><button className="button" type="cancel">MyBeers</button></Link>
                </div>
            </div>
        </div>
    )
}

export default BreweryInfo;