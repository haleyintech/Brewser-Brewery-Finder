
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Shared/baseUrl';
import { Link } from 'react-router-dom';
import MainMenu from '../../Shared/MainMenu';
import { setAuthHeader } from '../../Redux/token';
import { useSelector } from 'react-redux';
import Rating from '@mui/material/Rating';
import FilledBeerIcon from '../../assets/FilledBeerIcon';
import EmptyBeerIcon from '../../assets/EmptyBeerIcon';
import { toast } from 'react-toastify'
import { func } from 'prop-types';

function ReviewInfo() {

    const [beer, setBeer] = useState({})
    const [brewery, setBrewery] = useState({})
    const [review, setReview] = useState({
        userId: '',
        beerId: '',
        description: '',
        rating: 0

    })
    /* new - add state for validation errors */
    const [validationError, setValidationError] = useState({});
    const [isFormValid, setIsFormValid] = useState(true);

    // get token and current user from redux store
    const token = useSelector(state => state.token.token);
    const user = useSelector(state => state.user);
    const beerId = window.location.search.substring(8)

    useEffect(() => {
        setAuthHeader(token);
        getBeer()
        getUserId()
    }, [token]);

    useEffect(() => {
        setReview(prev => {
            return {
                ...prev,
                beerId: beer.beerId
            }
        })
        getBrewery()
    }, [beer])

    async function getBeer() {
        const response = await axios.get(baseUrl + `/beers/${beerId}`)
        setBeer(response.data)
    }

    async function getBrewery() {
        const response = await axios.get(baseUrl + `/breweries/${beer.breweryId}`)
        setBrewery(response.data)
    }

    async function getUserId() {
        const response = await axios.get(baseUrl + `/users/id/?username=${user.username}`)
        setReview(prev => {
            return {
                ...prev,
                userId: response.data
            }
        })
    }

    function handleOnChange(event) {
        const { name, value } = event.target
        setReview(prev => {
            return {
                ...prev,
                [name]: value
            }
        });
        /* new - set validation error if any */
        setValidationError({ ...validationError, [event.target.name]: validateField(event.target) });

    }

    /* new - validate form */
    function formValid() {
        // get list of fields in the form
        let fields = document.getElementById("reviewForm").elements;

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
    /* new - validate every field in the form */
    function validateField(field) {
        let error = "";
        switch (field.name) {
            case "description":
                if (!field.value || field.value.length === 0) error = "Description of experience is required";
                break;
        }
        switch (field.name) {
            case "rating":
                if (review.rating === 0) error = "Rating is required";
                break;
        }
        return error;
    }

    /*end new */

    function redirectToCaller(event) {
        event.preventDefault();
        window.history.back();
    }


    function saveReview(event) {
        event.preventDefault()

        if (formValid()) {
            axios.post(baseUrl + "/reviews", review)
                .then(res => {
                    if (res.status === 201) {
                        /* orig
                        alert('Review Created')
                        */
                        toast.success("Review Created", {
                            position: toast.POSITION.BOTTOM_LEFT
                        });
                        redirectToCaller(event)
                    }
                })
                /* orig
                .catch(err=>{
                    alert('Failed to Create Review')
                    console.log(err.response)
                }) */
                .catch(err => {
                    toast.error(err.message, {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                })

        } else {
            toast.error("Form has validation errors", {
                position: toast.POSITION.BOTTOM_LEFT
            });
        }


    }

    return (
        <div>
            <MainMenu />
            <div><h1>Add Review</h1></div>

            <form id='reviewForm' className='create-review-container' >
                <p className='cr-beer-name'>Beer Name: {beer.name}</p>
                <p className='cr-brewery-name'>Brewery: {brewery.name}</p>
                <label htmlFor='rating'>Rate this Beer: </label>
                <Rating className='cr-rating' name="rating" icon={<FilledBeerIcon />} emptyIcon={<EmptyBeerIcon />}
                    defaultValue={0} precision={1} value={review.rating} onChange={handleOnChange} />

                {(!isFormValid && validationError.rating && validationError.rating.length > 0) ?
                    <div className="text-danger small ms-2">{validationError.rating}</div> : null
                }
                <br />
                <textarea className='cr-review form-control' value={review.description} onChange={handleOnChange} rows='5' required maxLength='255' name='description' placeholder='Describe Experience' />

                {(!isFormValid && validationError.description && validationError.description.length > 0) ?
                    <div className="text-danger small ms-2">{validationError.description}</div> : null
                }

                <br />
                <img className='cr-img' src={beer.imgUrl} />
                <br />
                <textarea className='cr-description' rows='5' required maxLength='255' readOnly value={beer.description} />

                <br />
                <button className='cr-btn' type='submit' onClick={saveReview}>Create Review</button>
                <button className='cnl-btn' onClick={redirectToCaller}>Cancel</button>
            </form>
        </div>

    )
}

export default ReviewInfo;
