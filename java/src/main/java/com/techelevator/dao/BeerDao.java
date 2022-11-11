package com.techelevator.dao;

import com.techelevator.model.Beer;

import java.util.List;

public interface BeerDao {

    //Get Request Methods
    List<Beer> getAllBeers();
    //Should be an annotation

    Beer getBeerWithId(Long id);

    //Put Methods
    void updateBeer(Beer beer, Long id);

    //Delete Methods
    void deleteBeer(Long id);


}
