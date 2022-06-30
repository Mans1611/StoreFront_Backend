CREATE TABLE Orders (
order_id SERIAL PRIMARY KEY NOT NULL,
user_id SERIAL NOT NULL, 
status VARCHAR(60),
FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
