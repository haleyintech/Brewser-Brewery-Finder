package com.techelevator.controller;

import com.techelevator.dao.BeerDao;
import com.techelevator.model.Beer;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/beers")
@PreAuthorize("isAuthenticated()")
public class BeerController {

    private BeerDao beerDao;

    public BeerController(BeerDao beerDao) {
        this.beerDao = beerDao;
    }

    //GET Requests
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Beer> getAllBeers() {
        return beerDao.getAllBeers();
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Beer getBeerWithId(@PathVariable Long id) {
        return beerDao.getBeerWithId(id);
    }

    //PUT Requests
    @PutMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_BREWER')")
    public void updateBeer(@Valid @RequestBody Beer beer, @PathVariable Long id) {
        beerDao.updateBeer(beer,id);
    }

    //Delete Requests
    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_BREWER')")
    public void deleteBeer(@PathVariable Long id) {
        beerDao.deleteBeer(id);
    }




}
