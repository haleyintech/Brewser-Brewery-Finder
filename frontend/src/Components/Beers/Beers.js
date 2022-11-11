import axios from 'axios';
import { baseUrl } from '../../Shared/baseUrl';
import React from 'react';


export default class Beers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            beers: []
        };
    }
    async getBeersList() {
        await axios
            .get(`http://localhost:8081/beers`, { headers: { "Authorization": `Bearer ${this.props.token} ` } })

            .then(data => this.setState({ beers: data.data }))

            .catch((error) => {
                console.log(error)
            })

    }
    componentDidMount() {
        this.getBeersList()
    }
    render() {

        return (
            <>

                {this.state.beers.map(beer => {
                    console.log(beer.beerId)
                    return(
                    <>
                    <div key={beer.beerId}>

               
                        <p>Beer Name: {beer.name}</p>
                        <p>Brewery ID: (Can we change this to Brewery Name?): {beer.breweryId}</p>
                        <p>Beer Description: {beer.description}</p>
                        <p>Beer ABV (% Alcohol By Volume){beer.abv}</p>
                        <p>Beer Type {beer.type}</p>
                        <img>{beer.img_url}</img>
                    
                    </div>
                    
                    </>     
                    )
                })}</>
        )
    }
}
//this.beerId = beerId;
//this.breweryId = breweryId;
//this.name = name;
//this.description = description;
//this.imgUrl = imgUrl;
//this.abv = abv;
//this.type = type;