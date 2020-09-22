-- Initialize users data
INSERT INTO user (username, first_name, last_name,
  password, street_no,
  street_name, postcode,
  phone, role_id) 
VALUES ('johndoe@gmail.com','John','Doe',
-- Hashed from "somePassword"
'$2a$10$9d5Yu1I1TfahZRJ5FOy83u/Icq3IdjCouPMb/UdbLT1nWroqlhlq.',
'123','Smith','12345',
'65900100200', (SELECT id FROM role WHERE name='customer' LIMIT 1)
);
