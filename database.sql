CREATE DATABASE users_database;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    designation VARCHAR(255),
    age NUMBER

);

INSERT INTO users(id, name) VALUES(55, 'dummy user123');
INSERT INTO users(id, name, address, designation, age) VALUES(1, 'dummy user1','India','senior engineer',20);
INSERT INTO users(id, name, address, designation, age) VALUES(2, 'dummy user2','UK','doctor',31);
INSERT INTO users(id, name, address, designation, age) VALUES(3, 'dummy user3','USA','driver',32);

SELECT * FROM users;

