package com.techelevator.model;

import javax.validation.constraints.NotNull;

public class Beer {
    private Long beerId;
    private Long breweryId;
    @NotNull
    private String name;
    @NotNull
    private String description;
    @NotNull
    private String imgUrl;
    @NotNull
    private double abv;
    private String type;

    public Beer() {
    }

    public Beer(Long beerId, Long breweryId,String name, String description, String imgUrl, double abv, String type) {
        this.beerId = beerId;
        this.breweryId = breweryId;
        this.name = name;
        this.description = description;
        this.imgUrl = imgUrl;
        this.abv = abv;
        this.type = type;
    }

    public Long getBeerId() {
        return beerId;
    }

    public Long getBreweryId() {
        return breweryId;
    }

    public void setBreweryId(Long breweryId) {
        this.breweryId = breweryId;
    }

    public void setBeerId(Long beerId) {
        this.beerId = beerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public double getAbv() {
        return abv;
    }

    public void setAbv(double abv) {
        this.abv = abv;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
