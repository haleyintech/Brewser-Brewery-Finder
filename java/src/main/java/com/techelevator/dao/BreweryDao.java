package com.techelevator.dao;

import com.techelevator.model.Beer;
import com.techelevator.model.Brewery;

import java.util.List;

public interface BreweryDao {

    //Get Methods (any role)
    List<Brewery> getAllBreweries();
    Brewery getBreweryById(Long id);
    List<Beer> getBeersWithBreweryId(Long id);
    Beer getBeerFromBreweryWithBeerId(Long id);

    //Post Methods (Only Admin)

    void addBrewery(Brewery brewery);

    //Put Methods (Only Admin, Brewer)

    void updateBreweryWithId(Brewery brewery, Long id);
    //Delete Methods (Only Admin)

    void deleteBreweryWithId(Long id);

}
