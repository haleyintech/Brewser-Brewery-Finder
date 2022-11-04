package com.techelevator.dao;

import com.techelevator.model.Beer;

import java.util.List;

public interface BeerDao {

    //Get Request Methods
    List<Beer> getAllBeers();

    Beer getBeerWithId(Long id);


}
