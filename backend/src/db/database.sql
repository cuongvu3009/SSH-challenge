CREATE DATABASE ssh

-- cannot preferences stations for return returnStation_id because there is some station does not exist, will fix this one soon.
CREATE TABLE games (
	id BIGSERIAL PRIMARY KEY,
	board VARCHAR(250) NOT NULL,
	status VARCHAR(100) NOT NULL
);