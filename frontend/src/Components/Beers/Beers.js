import axios from 'axios';
import {baseUrl} from '../../Shared/baseUrl';
import React from 'react';
import MainMenu from '../../Shared/MainMenu';
import {Response} from 'cross-fetch';
import BeerCard from './BeerCard'

export default class Beers extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            beers: []
        };
    }


    async getBeersList() {
        await axios.get(`http://localhost:8081/beers`, {
            headers: {
                "Authorization": `Bearer ${
                    this.props.token
                } `
            }
        }).then(response => this.setState({beers: response.data})).catch((error) => {
            console.log(error)
        })

    }
    componentDidMount() {
        this.getBeersList()
    }
    render() {

        return (
            <>
            <MainMenu/> 
            {this.state.beers.map(beer => {return (<BeerCard {...beer}/>)})}</>)
    }
}
