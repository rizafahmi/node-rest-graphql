DROP DATABASE IF EXISTS node_frieds;
CREATE DATABASE node_friends;
\c node_friends;

/* people → friends → location → weather api */

CREATE TABLE people (
       id SERIAL PRIMARY KEY,
       name VARCHAR,
       email VARCHAR,
       location VARCHAR
);
