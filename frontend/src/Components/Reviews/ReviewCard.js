import React from 'react'
import { baseUrl } from '../../Shared/baseUrl';
import axios from 'axios';
import { setAuthHeader } from '../../Redux/token';
import { useSelector } from 'react-redux';

export default function ReviewCard() {

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
        
    }

    async function getOwner() {

    }

  return (
    <>

    </>
  )
}
