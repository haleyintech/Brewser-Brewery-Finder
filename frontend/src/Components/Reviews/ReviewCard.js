import React from 'react'
import { baseUrl } from '../../Shared/baseUrl';
import axios from 'axios';
import { setAuthHeader } from '../../Redux/token';
import { useSelector } from 'react-redux';
import Rating from '@mui/material/Rating';


export default function ReviewCard(props) {

    const [reviewedBeer,setReviewedBeer] = React.useState({})
    const [owner, setOwner] = React.useState({})  
    
    const token = useSelector(state=>state.token.token);
    const user = useSelector(state=>state.user);

    React.useEffect(()=>{
        setAuthHeader(token)
        getReviewedBeer()
        getOwner()
    },[token])

    async function getReviewedBeer() {
        try {
            // get beer of review 
            let response = await axios.get(baseUrl + `/beers/${props.beerId}`);
            // and save to state
            setReviewedBeer(response.data);
        } catch (ex) {
            alert(ex);
        }
    }

    async function getOwner() {
        try {
            // get owner of review 
            let response = await axios.get(baseUrl + `/users/user/${props.userId}`);
            // and save to state
            setOwner(response.data);
        } catch (ex) {
            alert(ex);
        }
    }


  return (
    <>
        <img className='review--img' src={reviewedBeer.imgUrl} />
        <p className='review--name'>Beer: {reviewedBeer.name}</p>
        <p className='review--reviewer'>Reviewer: {owner.username}</p>
        <Rating name="read-only" className='review--rating' value={props.rating} readOnly precision={0.5}/>
        <textarea className='review--description' readOnly>{props.description}</textarea>
    </>
  )
}
