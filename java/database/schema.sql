BEGIN TRANSACTION;

DROP TABLE IF EXISTS users, beers, breweries, reviews CASCADE;
DROP SEQUENCE IF EXISTS seq_user_id, seq_brewery_id;

CREATE SEQUENCE seq_user_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;
  
 CREATE SEQUENCE seq_brewery_id
 INCREMENT BY 1
 START WITH 10000000
 CACHE 1;
 





CREATE TABLE breweries (
    brewery_id bigint DEFAULT nextval('seq_brewery_id'::regclass) NOT NULL,
    name varchar(50) NOT NULL,
    history varchar(1000) NOT NULL,
    address varchar(100) NOT NULL,
    phone varchar(10) NOT NULL,
    email varchar(50) NOT NULL,
    img_url varchar(255) NOT NULL,
    hours varchar(255) NOT NULL,
    is_pet_friendly boolean NOT NULL,
    CONSTRAINT PK_brewery PRIMARY KEY (brewery_id)
);


CREATE TABLE beers (
    beer_id SERIAL NOT NULL,    
    brewery_id bigint NOT NULL REFERENCES breweries (brewery_id),
    name varchar(50) NOT NULL UNIQUE,
    description varchar(255) NOT NULL,
    img_url varchar(255) NOT NULL,
    abv decimal NOT NULL,
    type varchar (50),
    CONSTRAINT PK_beer PRIMARY KEY (beer_id)
);

CREATE TABLE users (
	user_id int DEFAULT nextval('seq_user_id'::regclass) NOT NULL,
	username varchar(50) NOT NULL,
	password_hash varchar(200) NOT NULL,
    brewery_id bigint REFERENCES breweries (brewery_id),
	role varchar(50) NOT NULL,
	CONSTRAINT PK_user PRIMARY KEY (user_id)
);


CREATE TABLE reviews (
    review_id SERIAL NOT NULL,
    user_id int REFERENCES users (user_id) NOT NULL,
    beer_id int REFERENCES beers (beer_id) NOT NULL,
    description varchar (255) NOT NULL,
    rating int NOT NULL    
);




--breweries insert
INSERT INTO breweries(name,history,address,phone,email,img_url,hours, is_pet_friendly) 
VALUES ('Local Ties Brewing Company',
        'Local Ties Brewing Company is a family owned and operated taproom focused microbrewery. Our goal is to create an environment where friends and family can gather, enjoy unique craft beer, and make memories.

Local Ties Brewing Company opened in Carrollton, GA in August of 2022. We look forward to seeing and serving you on your next visit!',
        '119 Bradley Street
Carrollton, GA 30117',
        '6786640268',
        'localtiesbrewing@gmail.com',
        'https://utfb-images.untappd.com/6x1ow5r5y3x2ghhjb2as4lg678pl?auto=compress',
        'Thursday: 4–10PM
Friday: 12–10PM
Saturday: 12–10PM
Sunday: 1–6PM
Monday: Closed
Tuesday: Closed
Wednesday: 4–10PM',true);

--beers insert
INSERT into beers(brewery_id,name,description,img_url,abv,type) VALUES (10000000,'Wolfsburg', 'Traditional German Pilsner with a little bit extra because why not?', 'https://assets.untappd.com/photos/2022_08_20/ce7669c9937f9e5b9bf2e01f90351fea_raw.jpg',5.1,'Pilsner');

--user insert
INSERT INTO users (username,password_hash,role) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');
INSERT INTO users (username,password_hash,brewery_id,role) VALUES ('brewer','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC',(SELECT brewery_id from breweries WHERE name='Local Ties Brewing Company'),'ROLE_BREWER');


--review insert

INSERT INTO reviews (user_id, beer_id, description, rating)
VALUES((SELECT user_id from users WHERE username ='user'),(SELECT beer_id from beers WHERE name = 'Wolfsburg'),'Amazing Pilsner!',5);

COMMIT TRANSACTION;
