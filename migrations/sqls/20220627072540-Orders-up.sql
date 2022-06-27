CREATE TABLE Orders (
id SERIAL PRIMARY KEY NOT NULL,
product_id SERIAL NOT NULL,
product_quantity INT NOT NULL,
user_id SERIAL NOT NULL, 
status VARCHAR(60),
FOREIGN KEY (product_id) REFERENCES Products(product_id),
FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
