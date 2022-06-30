CREATE TABLE orderProducts (
    order_id SERIAL,
    product_id SERIAL,
    quantity INT,
    id SERIAL PRIMARY KEY,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)

);