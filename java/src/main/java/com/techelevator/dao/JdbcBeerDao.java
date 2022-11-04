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
        Beer beer = null;
        String sql = "SELECT * from beers WHERE beer_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql,id);
        if(results.next()) {
            beer = mapRowToBeer(results);
        }
        return beer;
    }



    @Override
    public void addBeer(Beer beerToAdd) {
        String sql = "INSERT INTO beers (name,description,img_url,abv,type) VALUES (?,?,?,?,?);";
        jdbcTemplate.update(sql,
                beerToAdd.getName(),
                beerToAdd.getDescription(),
                beerToAdd.getImgUrl(),
                beerToAdd.getAbv(),
                beerToAdd.getType());
    }

    @Override
    public void updateBeer(Beer updatedBeer, Long id) {
        String sql = "UPDATE beers SET name = ?, description = ?, img_url = ?, abv = ?, type = ? WHERE beer_id = ?;";
        jdbcTemplate.update(sql,
                updatedBeer.getName(),
                updatedBeer.getDescription(),
                updatedBeer.getImgUrl(),
                updatedBeer.getAbv(),
                updatedBeer.getType(),
                id);
    }

    @Override
    public void deleteBeerWithId(Long id) {
        String sql = "DELETE FROM beers WHERE beer_id = ?;";
        jdbcTemplate.update(sql,id);
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
