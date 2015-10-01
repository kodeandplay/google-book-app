use oomami;

create table list ( 
	list_id int not null auto_increment,
	user_id int not null,
	list_name varchar(100) not null,
	primary key (list_id),
	foreign key (user_id) references user (user_id)
) engine=InnoDB default charset=utf8;


