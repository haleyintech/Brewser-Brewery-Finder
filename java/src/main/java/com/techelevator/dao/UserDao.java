package com.techelevator.dao;

import com.techelevator.model.User;

import java.util.List;

public interface UserDao {

    List<User> findAll();

    User getUserById(Long userId);

    User findByUsername(String username);

    int findIdByUsername(String username);

    boolean create(Long breweryId, String username, String password, String role);
//    boolean createWithBreweryId(String username, Long breweryId, String password, String role);
}
