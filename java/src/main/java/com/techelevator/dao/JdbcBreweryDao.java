package com.techelevator.dao;

import com.techelevator.model.Beer;
import com.techelevator.model.Brewery;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JdbcBreweryDao implements BreweryDao {
    @Override
    public List<Brewery> getAllBreweries() {
        return null;
    }

    @Override
    public Brewery getBreweryById(Long id) {
        return null;
    }

    @Override
    public List<Beer> getBeersWithBreweryId(Long id) {
        return null;
    }

    @Override
    public Beer getBeerFromBreweryWithBeerId(Long id) {
        return null;
    }

    @Override
    public void addBrewery(Brewery brewery) {

    }

    @Override
    public void updateBreweryWithId(Brewery brewery, Long id) {

    }

    @Override
    public void deleteBreweryWithId(Long id) {

    }
}
