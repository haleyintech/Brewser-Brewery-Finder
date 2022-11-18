import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Shared/baseUrl';
import { Link } from 'react-router-dom';
import MainMenu from '../../Shared/MainMenu';
import { setAuthHeader } from '../../Redux/token';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import phoneFormat from '../../Shared/phoneFormat';

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
    const [validationError, setValidationError] = useState({});
    const [isFormValid, setIsFormValid] = useState(true);
    const [isEditable, setIsEditable] = useState(true);
    // get token and current user from redux store
    const token = useSelector(state => state.token.token);
    const user = useSelector(state => state.user);

    // set auth token in axios header before loading list of breweries
    useEffect(() => {
        setAuthHeader(token);
        getData();
    }, [token]);

    useEffect(() => {
        // check if current user can edit the form
        let editable = false;
        let role = user.authorities[0]
        if (role) {
            if (role.name === "ROLE_ADMIN" ||
                (role.name === "ROLE_BREWER" && user.breweryId === brewery.breweryId)) {
                editable = true;
            }
        }
        setIsEditable(editable);
    },[user, brewery]);

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
            toast.error(ex.message, {
                position: toast.POSITION.BOTTOM_LEFT
            });
        }
    }

    // update brewery in state for each change in every form element
    function handleInputChange(event) {
        let value = event.target.value;
        if (event.target.type && event.target.type === "checkbox") {
            value = event.target.checked;
        }
        setBrewery({ ...brewery, [event.target.name]: value });
        setValidationError({ ...validationError, [event.target.name]: validateField(event.target) });
    }

    // validate form
    function formValid() {
        // get list of fields in the form
        let fields = document.getElementById("breweryForm").elements;

        //for every field validate and get the error message
        // and save in fieldErrors (eg. fieldErrors.name, fieldErrors.address, etc.)
        let fieldErrors = {}
        Array.from(fields).forEach(field => {
            let error = validateField(field);
            if (error && error.length > 0) fieldErrors = { ...fieldErrors, [field.name]: error };
        })
        let errors = Object.values(fieldErrors);
        let valid = true;
        errors.forEach((error) => {
            if (error && error.length > 0) valid = false;
        });
        setValidationError(fieldErrors);
        setIsFormValid(valid);
        return valid;
    }
    // validate every field in the form
    function validateField(field) {
        let error = "";
        switch (field.name) {
            case "name":
                if (!field.value || field.value.length === 0) error = "Brewery Name is required";
                break;
            case "address":
                if (!field.value || field.value.length === 0) error = "Address is required";
                break;
            case "phone":
                if (!field.value || field.value.length === 0) {
                    error = "Phone is required";
                } else {
                    if (field.value.length < 10) {
                        error = "Phone should be 10 digits";
                    }
                }
                break;
            case "email":
                if (!field.value || field.value.length === 0) {
                    error = "Email address is required";
                } else {
                    if (!validateEmail(field.value)) {
                        error = "Invalid email address"
                    }
                }
                break;
            case "imgUrl":
                if (!field.value || field.value.length === 0) error = "Image is required";
                break;
            case "hours":
                if (!field.value || field.value.length === 0) error = "Hours is required";
                break;
            case "history":
                if (!field.value || field.value.length === 0) error = "History is required";
                break;
        }
        return error;
    }

    function validateEmail(email) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    async function handleSubmit(event) {
        // TO DO: validate brewery information before sending to server
        event.preventDefault();
        if (formValid()) {
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
                if (user.authorities[0].name === "ROLE_ADMIN") {
                    window.history.back();
                } else {
                    toast.success("Saved successfully", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                }
            } catch (ex) {
                toast.error(ex.message, {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            }
        } else {
            toast.error("Form has validation errors", {
                position: toast.POSITION.BOTTOM_LEFT
            });
        }
    }
    async function handleDelete(event) {
        event.preventDefault();
        try {
            //delete from server
            //if id is zero then show an error
            if (brewery.breweryId === 0) {
                toast.error("Brewery id is required for delete", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            } else {
                // else update the existing record
                await axios.delete(baseUrl + "/breweries/" + brewery.breweryId);
            }

            // then redirect to list of breweries
            window.history.back();
        } catch (ex) {
            toast.error(ex.message, {
                position: toast.POSITION.BOTTOM_LEFT
            });
        }
    }
    function redirectToCaller(event) {
        event.preventDefault();
        window.history.back();
    }

    

    // change display based on access
    return (
        <div>
            <MainMenu />
            <div className='card m-2'>
                <div className='card-body'>
                    <div><h1>Brewery Information</h1></div>
                    <form id="breweryForm">
                        <div className="row">
                            <div className="col-8">
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
                                    maxLength={50}
                                />
                                {(!isFormValid && validationError.name && validationError.name.length > 0) ?
                                    <div className="text-danger small ms-2">{validationError.name}</div> : null
                                }

                                <label className="label mt-2">Address</label>
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
                                    maxLength={100}
                                    readOnly={!isEditable}
                                />
                                {(!isFormValid && validationError.address && validationError.address.length > 0) ?
                                    <div className="text-danger small ms-2">{validationError.address}</div> : null
                                }
                                <label className="label mt-2">Phone</label>
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
                                    maxLength={10}
                                    readOnly={!isEditable}
                                />
                                {(!isFormValid && validationError.phone && validationError.phone.length > 0) ?
                                    <div className="text-danger small ms-2">{validationError.phone}</div> : null
                                }
                                <label className="label mt-2">Email</label>
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
                                    maxLength={50}
                                    readOnly={!isEditable}
                                />
                                {(!isFormValid && validationError.email && validationError.email.length > 0) ?
                                    <div className="text-danger small ms-2">{validationError.email}</div> : null
                                }
                                <label className="label mt-2">Image</label>
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
                                    maxLength={255}
                                    readOnly={!isEditable}
                                />
                                {(!isFormValid && validationError.imgUrl && validationError.imgUrl.length > 0) ?
                                    <div className="text-danger small ms-2">{validationError.imgUrl}</div> : null
                                }
                                <label className="label mt-2">Hours</label>
                                <textarea
                                    id="hours"
                                    name="hours"
                                    className="form-control"
                                    placeholder="Hours"
                                    v-model="brewery.hours"
                                    onChange={handleInputChange}
                                    value={brewery.hours}
                                    rows="2"
                                    required
                                    maxLength={255}
                                    readOnly={!isEditable}
                                />
                                {(!isFormValid && validationError.hours && validationError.hours.length > 0) ?
                                    <div className="text-danger small ms-2">{validationError.hours}</div> : null
                                }
                                <div className="mt-2">
                                    <input type="checkbox"
                                        id="petFriendly"
                                        name="petFriendly"
                                        className="form-check-input me-2"
                                        v-model="brewery.petFriendly"
                                        onChange={handleInputChange}
                                        checked={brewery.petFriendly}
                                        readOnly={!isEditable}
                                    />
                                    <label className="label">Pet Friendly</label>
                                </div>
                            </div>
                            <div className="col">
                                <div><img className="img-fluid img-brewery-details rounded" src={brewery.imgUrl} /></div>
                                <label className="label mt-2">History</label>
                                <textarea
                                    id="history"
                                    name="history"
                                    className="form-control"
                                    placeholder="History"
                                    v-model="brewery.history"
                                    onChange={handleInputChange}
                                    value={brewery.history}
                                    rows="8"
                                    required
                                    maxLength={1000}
                                    readOnly={!isEditable}
                                />
                                {(!isFormValid && validationError.history && validationError.history.length > 0) ?
                                    <div className="text-danger small ms-2">{validationError.history}</div> : null
                                }
                            </div>
                        </div>
                        <div className="buttonContainer mt-3">
                            {isEditable ?
                                (
                                    <div>
                                        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Save</button>
                                    </div>
                                ) : null
                            }
                            <div>
                                <button className="btn btn-primary" type="cancel" onClick={redirectToCaller}>Cancel</button>
                            </div>
                            <div>
                                <Link to={"/mybeers?breweryId=" + brewery.breweryId}><button className="btn btn-primary" type="cancel">MyBeers</button></Link>
                            </div>
                            {user.authorities[0].name === "ROLE_ADMIN" && brewery.breweryId > 0 ? (
                                <div className='ms-3'>
                                    <button className="btn btn-primary" type="cancel" onClick={handleDelete}>Delete</button>
                                </div>
                            ) : null}
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default BreweryInfo;