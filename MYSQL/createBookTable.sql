use oomami;

create table book ( 
	book_id int not null auto_increment,
	list_id int not null,
	title varchar(100) not null,
	author varchar(100) default 'Unknown',
	primary key (book_id),
	foreign key (list_id) references list (list_id)
) engine=InnoDB default charset=utf8;


