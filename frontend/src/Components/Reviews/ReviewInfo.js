
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
import { func } from 'prop-types';

function ReviewInfo() {

    const[beer, setBeer] = useState({})
    const[brewery,setBrewery] = useState({})
    const[review, setReview] =useState({
        userId: '',
        beerId: '',
        description: '',
        rating: 0

    })
    
    // get token and current user from redux store
    const token = useSelector(state => state.token.token);
    const user = useSelector(state => state.user);
    const beerId = window.location.search.substring(8)

    useEffect(() => {
        setAuthHeader(token);
        getBeer()
        getUserId()
    }, [token]);

    useEffect(()=>{
        setReview(prev=>{
            return {
                ...prev,
                beerId: beer.beerId
            }
        })
        getBrewery()
    },[beer])
    

    


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
        setReview(prev=>{
            return {
                ...prev,
                userId: response.data
            }
        }) 
    }

    function handleOnChange(event) {
        const {name,value} = event.target
        setReview(prev=>{
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function redirectToCaller(event) {
        event.preventDefault();
        window.history.back();
    }


    function saveReview(event) {
        event.preventDefault()
        axios.post(baseUrl + "/reviews",review)
        .then(res=>{
            if(res.status === 201) {
                alert('Review Created')
                redirectToCaller(event)
            }
        })
        .catch(err=>{
            alert('Failed to Create Review')
            console.log(err.response)
        })
    }

    return (
        <div>
            <MainMenu/>
            
                <p className='beer-name'>Beer Name: {beer.name}</p>
                <p className='brewery-name'>Brewery: {brewery.name}</p>
            <form className='create-review-form' onSubmit={saveReview}>
                <label htmlFor='rating'>Rate this Beer: </label>
                <Rating name="rating" icon={<FilledBeerIcon />} emptyIcon={<EmptyBeerIcon />} 
                defaultValue={0} precision={1} value={review.rating} onChange={handleOnChange} />
                <textarea value={review.description} onChange={handleOnChange} name='description' className='review-desc' placeholder='Describe Experience' />
                <img width='30%' src={beer.imgUrl} />
                <textarea className='' readOnly value={beer.description} />
                <button>Create Review</button>                
            </form>
                <button onClick={redirectToCaller}>Cancel</button>
        </div>
    )
}

export default ReviewInfo;
