
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

function ReviewInfo(props) {

    const[beer, setBeer] = React.useState({})
    const[review, setReview] = React.useState({
        userId: '',
        beerId: '',
        description: '',
        rating: 0

    })
    
    // get token and current user from redux store
    const token = useSelector(state => state.token.token);
    const user = useSelector(state => state.user);
    const beerId = window.location.search.substring(8)
    console.log(beerId)

    useEffect(() => {
        setAuthHeader(token);
        getBeer()
    }, [token]);


    async function getBeer() {
        const response = await axios.get(baseUrl + `/beers/${beerId}`)
        setBeer(response.data)
    }

    async function getUserId() {
        const response = await axios.get(baseUrl + "/users/id/")
    }

    function onRatingChange(event) {
        setReview(prev=>{
            return {
                ...prev,
                rating: event.target.value
            }
        })
    }

    function saveReview() {
        
    }

    console.log(review)

    return (
        <div>
            <MainMenu/>
            <form>
                <label for='rating'>Rate this Beer: </label>
                <Rating name="rating" icon={<FilledBeerIcon />} emptyIcon={<EmptyBeerIcon />} 
                defaultValue={0} precision={1} value={review.rating} onChange={onRatingChange} />
            </form>
        </div>
    )
}

export default ReviewInfo;
