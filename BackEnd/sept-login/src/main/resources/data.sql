drop table if exists booking;
drop table if exists booking_status;
drop table if exists employee_service;
drop table if exists service;
drop table if exists working_date;
drop table if exists time_slot;
drop table if exists user;
drop table if exists role;


create table booking_status
(
	id bigint unsigned auto_increment,
	name varchar(10) not null,
	constraint booking_status_id_uindex
		unique (id)
);

alter table booking_status
	add primary key (id);

create table role
(
	id bigint unsigned auto_increment,
	name varchar(10) not null,
	constraint role_id_uindex
		unique (id)
);

alter table role
	add primary key (id);

create table service
(
	id bigint unsigned auto_increment,
	name varchar(20) not null,
	price decimal not null,
	description varchar(50) not null,
	constraint service_id_uindex
		unique (id)
);

alter table service
	add primary key (id);

create table time_slot
(
	id bigint unsigned auto_increment,
	time time not null,
	constraint time_slot_id_uindex
		unique (id)
);

alter table time_slot
	add primary key (id);

create table user
(
	username varchar(40) not null,
	first_name varchar(20) not null,
	last_name varchar(20) not null,
	password varchar(100) not null,
	role_id bigint unsigned not null,
	street_no varchar(20) not null,
	street_name varchar(30) not null,
	postcode varchar(10) not null,
	phone varchar(15) not null,
	constraint user_phone_uindex
		unique (phone),
	constraint user_username_uindex
		unique (username),
	constraint user_role_id_fk
		foreign key (role_id) references role (id)
);

alter table user
	add primary key (username);

create table employee_service
(
	employee_id varchar(30) not null,
	service_id bigint unsigned not null,
	primary key (employee_id, service_id),
	constraint employee_service_service_id_fk
		foreign key (service_id) references service (id),
	constraint employee_service_user_username_fk
		foreign key (employee_id) references user (username)
);

create table working_date
(
	id bigint unsigned auto_increment,
	employee_id varchar(30) not null,
	day_name varchar(10) not null,
	timeslot bigint unsigned not null,
	constraint working_date_id_uindex
		unique (id),
	constraint working_date_time_slot_id_fk
		foreign key (timeslot) references time_slot (id),
	constraint working_date_user_username_fk
		foreign key (employee_id) references user (username)
);

alter table working_date
	add primary key (id);

create table booking
(
	id bigint unsigned not null,
	customer_id varchar(30) not null,
	booking_date date not null,
	working_date_id bigint unsigned not null,
	service_id bigint unsigned not null,
	booking_status_id bigint unsigned not null,
	constraint booking_id_uindex
		unique (id),
	constraint booking_booking_status_id_fk
		foreign key (booking_status_id) references booking_status (id),
	constraint booking_service_id_fk
		foreign key (service_id) references service (id),
	constraint booking_user_username_fk
		foreign key (customer_id) references user (username),
	constraint booking_working_date_id_fk
		foreign key (working_date_id) references working_date (id)
);

alter table booking
	add primary key (id);

	
-- Initialize role
-- Three type of users:
--  1. admin user (business owner); 
--  2. workers, who can login and see their dashboard;
--  3. customer, who wants to book an appointment for a service.
INSERT INTO role (name) VALUES ('admin');
INSERT INTO role (name) VALUES ('worker');
INSERT INTO role (name) VALUES ('customer');