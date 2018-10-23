DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;
CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255),
    price DECIMAL(10,2),
    stock_quantity INTEGER,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Tenor Saxophone", "Music Instruments", 3000.00, 5), 
("iPhone Xs", "Technology", 999.00, 30), 
("Galaxy S9", "Technology", 899.00, 10),
("Pizza Stone", "Cookware", 60.00, 20),
("Chef's Knife", "Cookware", 120.00, 25),
("Clarinet", "Music Instruments", 1500.00, 3),
("Donut", "Food", 3.00, 20),
("Sandwich", "Food", 7.00, 15),
("Laptop", "Technology", 3500.00, 4),
("Beff Jezos' Soul", "Metaphysics", 100000.00, 1);

