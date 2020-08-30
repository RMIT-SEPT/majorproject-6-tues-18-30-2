create table if not exists m_booking_status
(
	id bigint unsigned auto_increment
		primary key,
	name varchar(10) not null,
	created_at timestamp not null,
	updated_at timestamp not null
);

create table if not exists m_role
(
	id bigint unsigned auto_increment
		primary key,
	name varchar(20) not null,
	updated_at timestamp not null
);

create table if not exists m_service
(
	id bigint unsigned auto_increment
		primary key,
	name varchar(20) not null,
	duration int not null,
	price int not null,
	description varchar(100) not null,
	available tinyint(1) not null,
	created_at timestamp not null,
	updated_at timestamp not null,
	constraint m_service_name_uindex
		unique (name)
);

create table if not exists m_user
(
	id bigint unsigned auto_increment
		primary key,
	username varchar(30) not null,
	password varchar(30) not null,
	role_id bigint unsigned not null,
	available tinyint(1) null,
	created_at timestamp null,
	updated_at timestamp null,
	constraint m_user_m_role_id_fk
		foreign key (role_id) references m_role (id)
);

create table if not exists m_customer
(
	id bigint unsigned auto_increment
		primary key,
	username varchar(30) not null,
	address varchar(200) not null,
	phone varchar(30) not null,
	user_id bigint null,
	created_at timestamp null,
	updated_at timestamp null,
	constraint m_customer_m_user_id_fk
		foreign key (id) references m_user (id)
);

create table if not exists m_employee
(
	id bigint unsigned auto_increment
		primary key,
	user_id bigint unsigned null,
	created_at timestamp null,
	updated_at timestamp null,
	constraint m_employee_m_user_id_fk
		foreign key (user_id) references m_user (id)
);

create table if not exists m_booking
(
	id bigint unsigned auto_increment
		primary key,
	booking_no varchar(20) not null,
	customer_id bigint unsigned not null,
	booking_date date not null,
	start_time time not null,
	end_time time not null,
	service_id bigint unsigned not null,
	employee_id bigint unsigned not null,
	booking_status_id bigint unsigned not null,
	created_at timestamp not null,
	updated_at timestamp not null,
	constraint m_booking_booking_no_uindex
		unique (booking_no),
	constraint m_booking_m_booking_status_id_fk
		foreign key (booking_status_id) references m_booking_status (id),
	constraint m_booking_m_customer_id_fk
		foreign key (customer_id) references m_customer (id),
	constraint m_booking_m_employee_id_fk
		foreign key (employee_id) references m_employee (id),
	constraint m_booking_m_service_id_fk
		foreign key (service_id) references m_service (id)
);

create table if not exists m_employee_service
(
	employee_id bigint unsigned not null,
	service_id bigint unsigned not null,
	primary key (employee_id, service_id),
	constraint m_employeeService_m_employee_id_fk
		foreign key (employee_id) references m_employee (id),
	constraint m_employeeService_m_service_id_fk
		foreign key (service_id) references m_service (id)
);

create table if not exists m_working_date
(
	id bigint unsigned auto_increment
		primary key,
	employee_id bigint unsigned not null,
	working_date date not null,
	start_time time not null,
	end_time time not null,
	created_at timestamp not null,
	updated_at datetime not null,
	constraint m_working_date_m_employee_id_fk
		foreign key (employee_id) references m_employee (id)
);

