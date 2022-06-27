CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(60) NOT NULL,
    lastname VARCHAR(60) NOT NULL,
    password VARCHAR (90) NOT NULL
);