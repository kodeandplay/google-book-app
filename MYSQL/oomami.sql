create database oomami;

use oomami;

create table users ( 
	username varchar(20) not null,
	password varchar(500) not null,
	primary key (username)
) engine=InnoDB default charset=utf8;


