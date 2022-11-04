package com.techelevator.dao;

import com.techelevator.model.Beer;

import java.util.List;

public interface BeerDao {

    //Get Request Methods
    List<Beer> getAllBeers();

    Beer getBeerWithId(Long id);

    //Best to be in BreweryDao?
    List<Beer> getBeersByBreweryId(Long id);

    //Post Request Methods
    void addBeer(Beer beerToAdd);

    //Put Request Methods

    void updateBeer(Beer updatedBeer, Long id);

    //Delete Request Methods

    void deleteBeerWithId(Long id);

}
