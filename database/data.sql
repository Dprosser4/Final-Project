insert into "users" ("username", "hashedPassword", "role", "firstName" , "lastName")
values ('dylan1', '$argon2id$v=19$m=4096,t=3,p=1$PnqCcNmXM6LKe+e8i9E8Zw$mzcDy8WZvSWpZRWsRGaSump9SCuKntniWL6vVCHPHJ4', 'admin', 'Dylan', 'Prosser');

insert into "users" ("username", "hashedPassword", "role", "firstName" , "lastName")
values ('admin1', '$argon2id$v=19$m=4096,t=3,p=1$0EkHGiZvBgd9VDgwZ1K22A$41Fgr06Udg/AJwmQTZHwwapYZNRXV/TkFLNRmVJAFc4', 'admin', 'Admin', 'User');

insert into "users" ("username", "hashedPassword", "role", "firstName" , "lastName")
values ('tech1', '$argon2id$v=19$m=4096,t=3,p=1$a4Vt1Jt3en+e2RkFnko88Q$soS42HSsBj7+qsaWal2pCSeU01wT+Gq7oI5axfwW6bc', 'tech', 'Technician', 'User');

insert into "users" ("username", "hashedPassword", "role", "firstName" , "lastName")
values ('alex1', '$argon2id$v=19$m=4096,t=3,p=1$a4Vt1Jt3en+e2RkFnko88Q$soS42HSsBj7+qsaWal2pCSeU01wT+Gq7oI5axfwW6bc', 'tech', 'Alex', 'Raymond');

insert into "users" ("username", "hashedPassword", "role", "firstName" , "lastName")
values ('john1', '$argon2id$v=19$m=4096,t=3,p=1$a4Vt1Jt3en+e2RkFnko88Q$soS42HSsBj7+qsaWal2pCSeU01wT+Gq7oI5axfwW6bc', 'tech', 'John', 'Smith');

insert into "users" ("username", "hashedPassword", "role", "firstName" , "lastName")
values ('jill4', '$argon2id$v=19$m=4096,t=3,p=1$a4Vt1Jt3en+e2RkFnko88Q$soS42HSsBj7+qsaWal2pCSeU01wT+Gq7oI5axfwW6bc', 'tech', 'Jill', 'Williams');

insert into "users" ("username", "hashedPassword", "role", "firstName" , "lastName")
values ('jack3', '$argon2id$v=19$m=4096,t=3,p=1$a4Vt1Jt3en+e2RkFnko88Q$soS42HSsBj7+qsaWal2pCSeU01wT+Gq7oI5axfwW6bc', 'tech', 'Jack', 'Johnson');

insert into "users" ("username", "hashedPassword", "role", "firstName" , "lastName")
values ('jason5', '$argon2id$v=19$m=4096,t=3,p=1$a4Vt1Jt3en+e2RkFnko88Q$soS42HSsBj7+qsaWal2pCSeU01wT+Gq7oI5axfwW6bc', 'tech', 'Jason', 'Lee');




insert into "projects" ("poNumber","name", "address", "city", "state", "zipcode")
values ('PT9000', 'Google Building', '1 Google Dr.', 'Irvine', 'CA', '92662');

insert into "projects" ("poNumber","name", "address", "city", "state", "zipcode")
values ('CFA1234', 'Chick-fil-a: 1234', '100 Chickfila St.', 'Atlanta', 'GA', '87215');

insert into "projects" ("poNumber","name", "address", "city", "state", "zipcode", "assignedTo")
values ('WAX42', 'Waxie HQ', '9353 Waxie Way', 'San Diego', 'CA', '92123', 3);

insert into "projects" ("poNumber","name", "address", "city", "state", "zipcode", "assignedTo")
values ('ECO2525', 'EcoLab North America', '5465 Ecolab Blvd.', 'Raleigh', 'NC', '78153', 3);

insert into "projects" ("poNumber","name", "address", "city", "state", "zipcode", "assignedTo")
values ('SPD4200', 'Speedway Gas: 4200', '751 Baker St', 'Costa Mesa', 'CA', '92626', 3);

insert into "projects" ("poNumber","name", "address", "city", "state", "zipcode")
values ('PT-VMX-001', 'Virtual Aquarium', '123 Main St', 'Seattle', 'WA', '98101');

insert into "projects" ("poNumber","name", "address", "city", "state", "zipcode")
values ('PT-RBT-002', 'Robotic Waiter', '456 Elm St', 'New York', 'NY', '10001');

insert into "projects" ("poNumber","name", "address", "city", "state", "zipcode")
values ('PT-SMG-003', 'Smart Garden', '789 Oak Ave', 'San Francisco', 'CA', '94102');

insert into "projects" ("poNumber","name", "address", "city", "state", "zipcode")
values ('PT-UWH-004', 'Underwater Hotel', '2468 Beach Blvd', 'Miami', 'FL', '33139');

insert into "projects" ("poNumber","name", "address", "city", "state", "zipcode")
values ('PT-FLY-005', 'Flying Car', '101 Skyway Rd', 'Los Angeles', 'CA', '90045');

insert into "projects" ("poNumber","name", "address", "city", "state", "zipcode")
values ('PT-AIPS-006', 'AI Personal Shopper', '222 Market St', 'Seattle', 'WA', '98121');

insert into "projects" ("poNumber","name", "address", "city", "state", "zipcode")
values ('PT-VRT-007', 'VR Theme Park', '333 Fantasy Blvd', 'Orlando', 'FL', '32830');

insert into "projects" ("poNumber","name", "address", "city", "state", "zipcode")
values ('PT-HCP-008', 'Holographic Concerts', '444 Music Ave', 'Nashville', 'TN', '37203');

insert into "projects" ("poNumber","name", "address", "city", "state", "zipcode")
values ('PT-SBL-009', 'Smart Bike Lock', '555 Tech St', 'San Francisco', 'CA', '94103');

insert into "projects" ("poNumber","name", "address", "city", "state", "zipcode")
values ('PT-HPT-010', 'Hyperloop Train', '666 Transit Way', 'Los Angeles', 'CA', '90071');
