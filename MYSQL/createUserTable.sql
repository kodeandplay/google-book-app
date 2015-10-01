use oomami;

create table user ( 
	user_id int not null auto_increment,
	username varchar(25) not null,
	password varchar(500) not null,
	primary key (user_id),
	unique (username)
) engine=InnoDB default charset=utf8;


