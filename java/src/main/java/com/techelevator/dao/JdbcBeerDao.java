package com.techelevator.dao;

import com.techelevator.model.Beer;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JdbcBeerDao implements BeerDao{

    private JdbcTemplate jdbcTemplate;

    public JdbcBeerDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Beer> getAllBeers() {
        List<Beer> beers = new ArrayList<>();
        String sql = "SELECT * FROM beers;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while(results.next()) {
            beers.add(mapRowToBeer(results));
        }

        return beers;
    }

    @Override
    public Beer getBeerWithId(Long id) {
        return null;
    }

    @Override
    public List<Beer> getBeersByBreweryId(Long id) {
        return null;
    }

    @Override
    public void addBeer(Beer beerToAdd) {

    }

    @Override
    public void updateBeer(Beer updatedBeer, Long id) {

    }

    @Override
    public void deleteBeerWithId(Long id) {

    }

    private Beer mapRowToBeer(SqlRowSet results) {
        Beer beer = new Beer();
        beer.setBeerId(results.getLong("beer_id"));
        beer.setName(results.getString("name"));
        beer.setDescription(results.getString("description"));
        beer.setImgUrl(results.getString("img_url"));
        beer.setAbv(results.getDouble("abv"));
        beer.setType(results.getString("type"));

        return beer;
    }
}
