CREATE TABLE Products (
    product_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(60) NOT NULL,
    price float NOT NULL,
    category VARCHAR (90)
);