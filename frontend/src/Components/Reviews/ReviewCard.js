import React from 'react'
import { baseUrl } from '../../Shared/baseUrl';
import axios from 'axios';
import { setAuthHeader } from '../../Redux/token';
import { useSelector } from 'react-redux';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import FilledBeerIcon from '../../assets/FilledBeerIcon';
import EmptyBeerIcon from '../../assets/EmptyBeerIcon';
import { toast } from 'react-toastify';
import { toastOptions } from '../../Shared/toastOptions';

export default function ReviewCard(props) {

    const [reviewedBeer,setReviewedBeer] = React.useState({})
    const [owner, setOwner] = React.useState({})  
    
    const token = useSelector(state=>state.token.token);
    const user = useSelector(state=>state.user);

   

    React.useEffect(()=>{
        if(token) {
            setAuthHeader(token)
            getReviewedBeer()
            getOwner()
        }
    },[token])

    async function getReviewedBeer() {
        try {
            // get beer of review 
            let response = await axios.get(baseUrl + `/beers/${props.beerId}`);
            // and save to state
            setReviewedBeer(response.data);
        } catch (ex) {
            toast.error(ex.message, toastOptions);
        }
    }

    async function getOwner() {
        try {
            // get owner of review 
            let response = await axios.get(baseUrl + `/users/user/${props.userId}`);
            // and save to state
            setOwner(response.data);
        } catch (ex) {
            toast.error(ex.message, toastOptions);
        }
    }


  return (
    <div className='review-container-beers' >
        <img className="img-beers-reviews" src={reviewedBeer.imgUrl} />
        <div className='review-body card-body' >
            <h1 className='beer-name-reviews'><Link to={"/beer-info?" + reviewedBeer.beerId}>{reviewedBeer.name}</Link></h1>
            <Rating icon={<FilledBeerIcon />} emptyIcon={<EmptyBeerIcon/>} name="read-only" className='review-rating' value={props.rating} readOnly precision={0.5}/>
            <p className='beer-card-text'>Reviewed By: {owner.username}</p>
            <p className='beer-card-text'>{props.description}</p>
        </div>
    </div>
  )
}
