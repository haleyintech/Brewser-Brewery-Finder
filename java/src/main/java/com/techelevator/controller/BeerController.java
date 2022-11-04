package com.techelevator.controller;

import com.techelevator.dao.BeerDao;
import com.techelevator.model.Beer;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping
    public List<Beer> getAllBeers() {
        return beerDao.getAllBeers();
    }
}
