BEGIN TRANSACTION;

DROP TABLE IF EXISTS users, beer CASCADE;
DROP SEQUENCE IF EXISTS seq_user_id;

CREATE SEQUENCE seq_user_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
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

--user insert
INSERT INTO users (username,password_hash,role) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');


--beer insert
INSERT into beer(name,description,img_url,abv,type) VALUES ('Beer 1', 'Local Ties Beer', 'https://assets.untappd.com/photos/2022_08_20/ce7669c9937f9e5b9bf2e01f90351fea_raw.jpg',5.1,'Pilsner');

COMMIT TRANSACTION;
