
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Shared/baseUrl';
import { Link } from 'react-router-dom';
import MainMenu from '../../Shared/MainMenu';
import { setAuthHeader } from '../../Redux/token';
import { useSelector } from 'react-redux';
import '../../Components/Breweries/BreweryStyles.css';

function BeerCard(props) {


  const [breweryName, setBreweryName] = useState("");
  // get token and current user from redux store
  const token = useSelector(state => state.token.token);

  // set auth token in axios header before loading list of beers
  useEffect(() => {
    if(token) {
      setAuthHeader(token);
      getBreweryName();
    }
  }, [token]);

  // update beer in state for each change in every form element


  async function getBreweryName() {
    if (props.breweryId > 0) {
      let response = await axios.get(baseUrl + "/breweries/" + props.breweryId);
      setBreweryName(response.data.name);
    }
  }

  // change display based on access
  return (

    
      <div className='card-container-beers'>
        <label className='beer-name'><h1>{props.name}</h1></label>
        {/* <p>Beer Name: {props.name}</p> */}
        <div class="beer-img-review-container">
        <img class='img-beers' src={props.imgUrl} />
        
        <div class='beer-card-text'>
        <p>Brewery: {breweryName}</p>
        <p>Description: {props.description}</p>
        <p>ABV (%) = {props.abv}%</p>
        <p>Beer Type: {props.type}</p></div></div>

        <Link to={"/review-info?beerId=" + props.beerId}><button className="btn-reviews" type="button">Add Review</button></Link>
        </div>
      
   
   

  )
}
export default BeerCard;