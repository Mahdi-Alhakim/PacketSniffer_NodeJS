CREATE DATABASE pcap;
use pcap;
CREATE TABLE sessions (
	name VARCHAR(20) NOT NULL,
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    device VARCHAR(20) NOT NULL,
    filter VARCHAR(30) NOT NULL,
    time TIMESTAMP NOT NULL,
    dur INT NOT NULL
);
CREATE TABLE packets (
	s_addr VARCHAR(100) NOT NULL,
    d_addr VARCHAR(100) NOT NULL,
    info VARCHAR(1000) NOT NULL,
    session_id INT NOT NULL,
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT
);