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
    description varchar(1000) NOT NULL,
    img_url varchar(255) NOT NULL,
    abv decimal NOT NULL,
    type varchar (50),
    CONSTRAINT PK_beer PRIMARY KEY (beer_id)
);

CREATE TABLE users (
	user_id int DEFAULT nextval('seq_user_id'::regclass) NOT NULL,    
    brewery_id bigint REFERENCES breweries (brewery_id),
	username varchar(50) NOT NULL,
	password_hash varchar(200) NOT NULL,
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

INSERT INTO breweries(name,history,address,phone,email,img_url,hours, is_pet_friendly) 
VALUES ('Avondale Brewing Company',
        'The Avondale Brewing Company is a brewery at 201 41st Street South in Avondale. The business was founded in 2010 as a partnership between real estate agent Coby Lake, his brother Hunter Lake, Chris Donaldson, and contractor and brewer Craig Shaw. Since October 2017 the brewery, tap room and patio have been owned by Orchestra Partners, and the brewery business by Jason Malone and Mike Sellers of Good People Brewing Company.',
        '201 41st Street S, Birmingham, AL 35222',
        '2057775456',
        'localtiesbrewing@gmail.com',
        'https://images.squarespace-cdn.com/content/v1/60b005690df77457aec71e03/4ed474ee-6112-4e93-9d82-24dc0f25c6e1/sign-3+copy.jpg?format=2500ws',
        'Monday - Wednesday: 12pm-10pm

Thursday: 12pm-11pm

Friday + Saturday: 12pm-12am

Sunday: 12pm-10pm',true);


--beers insert
--local ties
INSERT into beers(brewery_id,name,description,img_url,abv,type) VALUES (10000000,'Wolfsburg', 'Traditional German Pilsner with a little bit extra because why not?', 'https://assets.untappd.com/photos/2022_08_20/ce7669c9937f9e5b9bf2e01f90351fea_raw.jpg',5.1,'Pilsner');
INSERT into beers(brewery_id,name,description,img_url,abv,type) VALUES (10000000,'Gah Lee', 'Gah lee Pale Ale is the 3rd in the country learning series featuring our single hopped pale ales. Gah Lee is packed with tons of galaxy hops!', 'https://assets.untappd.com/photos/2022_09_30/c38baf52fcef27cde944b488cb33f86b_raw.jpg',5.5,'Pale Ale - American');
INSERT into beers(brewery_id,name,description,img_url,abv,type) VALUES (10000000,'Raspberry Lemon Gose', 'A traditional gose with over 30lbs of Raspberry and Lemon puree per barrel. a little sweet, a little sour.', 'https://assets.untappd.com/photos/2022_10_14/fb69e9ce842a993afbe1582f28e5be0a_raw.jpg',4.2,'Sour - Fruited Gose');
INSERT into beers(brewery_id,name,description,img_url,abv,type) VALUES (10000000,'Just a Lil Thick' , 'Juicy IPA w/ Citra, Simcoe, and Mosaic hops.', 'https://assets.untappd.com/photos/2022_11_06/ae3be3d3285ebd82eceb4b873b0ff1ba_raw.jpg',7.0,'IPA - Other');

--avondale
INSERT into beers(brewery_id,name,description,img_url,abv,type) VALUES (10000001,'Mosey', 'To Mosey is to take it easy and that’s exactly what we intended with this amber lager. Easy drinking with a crispy clean maltiness. If you like beer, you’ll love Mosey.', 'https://assets.untappd.com/photos/2022_10_29/fdad93fb0183d29faea765e5cffec408_raw.jpg',4.6,'Lager - Amber');
INSERT into beers(brewery_id,name,description,img_url,abv,type) VALUES (10000001,'A-OK IPA', 'Our tropical IPA, inspired by all things vacation.', 'https://assets.untappd.com/photos/2022_11_12/0206590ed907500fa66fd0a2c0b1e0fa_640x640.jpg',7.2,'IPA - American');
INSERT into beers(brewery_id,name,description,img_url,abv,type) VALUES (10000001,'Sour Pash', 'Sour Pash is a hazy, tart, fruit filled sour that is quenching and satisfying. This fun, year round addition, is the beer you want to end your hike with or have ready in the cooler to greet you after the bike ride!', 'https://assets.untappd.com/photos/2022_11_13/154dfc664417bfd2c0f7126c7a761906_640x640.jpg',4.2,'Sour - Fruited');

--user insert
INSERT INTO users (username,password_hash,role) VALUES ('user','$2a$10$n/2wbjc/dRZbix6PKyF0WeVIWSDE.yv27ZcGiFOboLVM2qkKaqpVS','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('beerlover295','$2a$10$n/2wbjc/dRZbix6PKyF0WeVIWSDE.yv27ZcGiFOboLVM2qkKaqpVS','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('ntwing','$2a$10$n/2wbjc/dRZbix6PKyF0WeVIWSDE.yv27ZcGiFOboLVM2qkKaqpVS','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('jjohns','$2a$10$n/2wbjc/dRZbix6PKyF0WeVIWSDE.yv27ZcGiFOboLVM2qkKaqpVS','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('admin','$2a$10$n/2wbjc/dRZbix6PKyF0WeVIWSDE.yv27ZcGiFOboLVM2qkKaqpVS','ROLE_ADMIN');
INSERT INTO users (username,password_hash,brewery_id,role) VALUES ('localties','$2a$10$n/2wbjc/dRZbix6PKyF0WeVIWSDE.yv27ZcGiFOboLVM2qkKaqpVS',(SELECT brewery_id from breweries WHERE name='Local Ties Brewing Company'),'ROLE_BREWER');
INSERT INTO users (username,password_hash,brewery_id,role) VALUES ('avondale','$2a$10$n/2wbjc/dRZbix6PKyF0WeVIWSDE.yv27ZcGiFOboLVM2qkKaqpVS',(SELECT brewery_id from breweries WHERE name='Avondale Brewing Company'),'ROLE_BREWER');


--review insert
--local ties
INSERT INTO reviews (user_id, beer_id, description, rating)
VALUES((SELECT user_id from users WHERE username ='user'),(SELECT beer_id from beers WHERE name = 'Wolfsburg'),'Amazing Pilsner!',5);

INSERT INTO reviews (user_id, beer_id, description, rating)
VALUES((SELECT user_id from users WHERE username ='ntwing'),(SELECT beer_id from beers WHERE name = 'Wolfsburg'),'I was not a big fan...',3.5);

INSERT INTO reviews (user_id, beer_id, description, rating)
VALUES((SELECT user_id from users WHERE username ='jjohns'),(SELECT beer_id from beers WHERE name = 'Wolfsburg'),'I thought it was a good Pilsner.',4);

INSERT INTO reviews (user_id, beer_id, description, rating)
VALUES((SELECT user_id from users WHERE username ='beerlover295'),(SELECT beer_id from beers WHERE name = 'Gah Lee'),'It was too hoppy for me...',1);
INSERT INTO reviews (user_id, beer_id, description, rating)
VALUES((SELECT user_id from users WHERE username ='user'),(SELECT beer_id from beers WHERE name = 'Gah Lee'),'It was ok',3.5);
INSERT INTO reviews (user_id, beer_id, description, rating)
VALUES((SELECT user_id from users WHERE username ='ntwing'),(SELECT beer_id from beers WHERE name = 'Raspberry Lemon Gose'),'A perfect blend of sweet and sour.',5);
INSERT INTO reviews (user_id, beer_id, description, rating)
VALUES((SELECT user_id from users WHERE username ='beerlover295'),(SELECT beer_id from beers WHERE name = 'Just a Lil Thick'),'Really enjoyed this IPA',4);
INSERT INTO reviews (user_id, beer_id, description, rating)
VALUES((SELECT user_id from users WHERE username ='jjohns'),(SELECT beer_id from beers WHERE name = 'Just a Lil Thick'),'A bit too thick more like it',3);

--avondale

INSERT INTO reviews (user_id, beer_id, description, rating)
VALUES((SELECT user_id from users WHERE username ='beerlover295'),(SELECT beer_id from beers WHERE name = 'A-OK IPA'),'I loved it! Huge fan of trapical flavors',5);
INSERT INTO reviews (user_id, beer_id, description, rating)
VALUES((SELECT user_id from users WHERE username ='user'),(SELECT beer_id from beers WHERE name = 'Sour Pash'),'It was ok',3.5);
INSERT INTO reviews (user_id, beer_id, description, rating)
VALUES((SELECT user_id from users WHERE username ='ntwing'),(SELECT beer_id from beers WHERE name = 'Sour Pash'),'Pretty decent sour.',4);

COMMIT TRANSACTION;
