CREATE DATABASE my_journal;

CREATE TABLE entries (
  id VARCHAR(100) PRIMARY KEY,
  user_email VARCHAR(255) FOREIGN KEY REFERENCES users(email),
  title VARCHAR(30),
  date VARCHAR(100),
  content VARCHAR(500)
);

CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  hashed_password VARCHAR(255),
  first_name VARCHAR(30)
);