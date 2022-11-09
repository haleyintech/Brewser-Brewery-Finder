package com.techelevator.controller;

import com.techelevator.dao.BeerDao;
import com.techelevator.dao.BreweryDao;
import com.techelevator.model.Beer;
import com.techelevator.model.Brewery;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/breweries")
@PreAuthorize("isAuthenticated()")
@CrossOrigin
public class BreweryController {

    private BreweryDao breweryDao;

    public BreweryController(BreweryDao breweryDao) {
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

    @GetMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Brewery getBreweryById(@PathVariable Long id) {
        return breweryDao.getBreweryById(id);
    }

    //Post Requests
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void addBrewery(@RequestBody Brewery brewery) {
        breweryDao.addBrewery(brewery);
    }

    @PostMapping(value = "/{breweryId}")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('ROLE_BREWER','ROLE_ADMIN')")
    public void addBeerToBrewery(@Valid @RequestBody Beer beer, @PathVariable Long breweryId) {
        breweryDao.addBeerToBrewery(beer,breweryId);
    }
    //Put Requests
    @PutMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_BREWER')")
    public void updateBrewery(@Valid @RequestBody Brewery brewery, @PathVariable Long id) {
        breweryDao.updateBreweryWithId(brewery,id);
    }
    //Delete Requests
    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteBrewery(@PathVariable Long id) {
        breweryDao.deleteBreweryWithId(id);
    }
}
