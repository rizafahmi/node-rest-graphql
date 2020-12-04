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

CREATE TABLE friends (
       id SERIAL PRIMARY KEY,
       people_id INT,
       friend_id INT,
       CONSTRAINT fk_people FOREIGN KEY(people_id) REFERENCES people(id),
       CONSTRAINT fk_friend FOREIGN KEY(friend_id) REFERENCES people(id)
);

INSERT INTO people (id, name, email, location) VALUES
       (1, 'Ryan', 'ryan@me.net', 'Bekasi'),
       (2, 'Newline', 'newline@gmail.com', 'Depok'),
       (3, 'Ford', 'h.ford@hotmail.com', 'Jakarta');

INSERT INTO friends (people_id, friend_id) VALUES
       (1, 2),
       (1, 3),
       (2, 1),
       (3, 1);
