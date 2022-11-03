BEGIN TRANSACTION;

DROP TABLE IF EXISTS users, beer, brewery, beer_brewery CASCADE;
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
 


CREATE TABLE users (
	user_id int DEFAULT nextval('seq_user_id'::regclass) NOT NULL,
	username varchar(50) NOT NULL,
	password_hash varchar(200) NOT NULL,
	role varchar(50) NOT NULL,
	CONSTRAINT PK_user PRIMARY KEY (user_id)
);

CREATE TABLE beer (
    beer_id SERIAL NOT NULL,
    name varchar(50) NOT NULL,
    description varchar(255) NOT NULL,
    img_url varchar(255) NOT NULL,
    abv decimal NOT NULL,
    type varchar (50),
    CONSTRAINT PK_beer PRIMARY KEY (beer_id)
);

CREATE TABLE brewery (
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

CREATE TABLE beer_brewery (
    beer_id int NOT NULL REFERENCES beer (beer_id),
    brewery_id bigInt REFERENCES brewery (brewery_id) NOT NULL
);

--user insert
INSERT INTO users (username,password_hash,role) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');


--beer insert
INSERT into beer(name,description,img_url,abv,type) VALUES ('Beer 1', 'Local Ties Beer', 'https://assets.untappd.com/photos/2022_08_20/ce7669c9937f9e5b9bf2e01f90351fea_raw.jpg',5.1,'Pilsner');

--brewery insert
INSERT INTO brewery(name,history,address,phone,email,img_url,hours, is_pet_friendly) 
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

--beer_brewery insert

INSERT INTO beer_brewery (beer_id, brewery_id) VALUES ((SELECT beer_id from beer WHERE name = 'Beer 1'),
(SELECT brewery_id from brewery WHERE name='Local Ties Brewing Company'));

COMMIT TRANSACTION;
