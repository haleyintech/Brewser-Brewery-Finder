package com.techelevator.controller;

import com.techelevator.dao.BeerDao;
import com.techelevator.dao.BreweryDao;
import com.techelevator.model.Beer;
import com.techelevator.model.Brewery;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/breweries")
@PreAuthorize("isAuthenticated()")
public class BreweryController {

    private BeerDao beerDao;
    private BreweryDao breweryDao;

    public BreweryController(BeerDao beerDao, BreweryDao breweryDao) {
        this.beerDao = beerDao;
        this.breweryDao = breweryDao;
    }

    //Get Requests
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Brewery> getAllBreweries() {
        return breweryDao.getAllBreweries();
    }
    @GetMapping(value = "/{id}/beers")
    @ResponseStatus(HttpStatus.OK)
    public List<Beer> getAllBeersWithBrewerId(@PathVariable Long id) {
        return breweryDao.getBeersWithBreweryId(id);
    }
    //Post Requests
    @PostMapping(value = "/{breweryId}/{beerId}")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('ROLE_BREWER','ROLE_ADMIN')")
    public void addBeerToBrewery(@PathVariable Long beerId, @PathVariable Long breweryId) {
        breweryDao.addBeerToBrewery(beerId,breweryId);
    }
    //Put Requests
    //Delete Requests
}
