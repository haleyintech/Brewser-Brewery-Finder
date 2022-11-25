import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setAuthHeader } from '../../Redux/token';
import { baseUrl } from '../../Shared/baseUrl';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import FilledBeerIcon from '../../assets/FilledBeerIcon';
import EmptyBeerIcon from '../../assets/EmptyBeerIcon';

export default function MyBeersCard(props) {
    
    const [beer, setBeer] = useState({});
    const [avg,setAvg] = useState(0)
    // get token and user from redux store
    const token = useSelector(state => state.token.token);
    const user = useSelector(state => state.user);

    // set auth token in axios header before loading list of beers
    useEffect(() => {
        if(token) {
            setAuthHeader(token);
            getData();
        }
    },[token]);

    useEffect(()=>{getAvgRating()},[beer])

    async function getData() {
        const res = await axios.get(baseUrl + `/beers/${props.beerId}`)
        
        setBeer(res.data)
    }

    //Gets the Avg rating for each beer, rounded to the nearest integer
     function getAvgRating() {
         axios.get(baseUrl + `/reviews/beer/${props.beerId}/average-rating`)
        .then(res=>{
            if(res.status === 200) {
                setAvg(res.data)
            }
        })
        .catch(err => console.log(err))
    }

        let link = "/beer-info?" + props.beerId;
        

        return (
            <div>                
                <h5><Link to={link}>{props.name}</Link></h5>
                <Rating icon={<FilledBeerIcon />} emptyIcon={<EmptyBeerIcon/>} readOnly className='rating' value={avg} precision={1} />
            </div>
        );
    
}
