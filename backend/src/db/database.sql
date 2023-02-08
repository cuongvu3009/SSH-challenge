-- Database for DEV
CREATE DATABASE ssh

CREATE TABLE games (
	id BIGSERIAL PRIMARY KEY,
	board TEXT [],
	status VARCHAR(100) NOT NULL,
	result VARCHAR(50)
);


-- Database for Testing
CREATE DATABASE sshTest

CREATE TABLE games (
	id BIGSERIAL PRIMARY KEY,
	board TEXT [],
	status VARCHAR(100) NOT NULL,
	result VARCHAR(50)
);