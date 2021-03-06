drop schema public cascade;
create schema public;

create table owner
	(user_name		  	varchar(15),
	 password			varchar(15),
	 email		    	varchar(25),
	 payment    		varchar(16),
	 billing_address	varchar(35),
	 shipping_address	varchar(35),
	 
	 primary key (user_name)
	);

create table customer
	(user_name		  	varchar(15),
	 password			varchar(15),
	 email		    	varchar(25),
	 payment    		varchar(16),
	 billing_address	varchar(35),
	 shipping_address	varchar(35),

	 primary key (user_name)
	);
	
	create table publisher
	(publisher_name		varchar(25),
	 address			varchar(35),
	 email				varchar(25),
	 phone_number		varchar(15),
	 bank_account		varchar(16),
	 
	 primary key (publisher_name)
	);

create table book
	(Id		  			SERIAL PRIMARY KEY,
	 book_name			varchar(25),
	 author_name    	varchar(25),
	 publisher_name    	varchar(25),
	 genre				varchar(15),
	 ISBN				varchar(15),
	 price  			numeric(6,2),
	 cost				numeric(6,2),
	 sales_percentage	numeric(3,2),
	 in_stock			numeric(4,0),
	 
	 foreign key (publisher_name) references publisher
	 		on delete cascade,
	 CONSTRAINT name_author UNIQUE (book_name,author_name)
	);

create table report
	(date		  		timestamp,
	 genre				varchar(15),
	 author_name		varchar(25),
	 sales    			numeric(8,2),
	 expenditures		numeric(8,2),
	 
	 primary key (date,genre,author_name)
	);

create table user_order
	(order_id			SERIAL PRIMARY KEY,
	 user_name		  	varchar(15),
	 Id					int NOT NULL references book,
	 quantity			numeric(4,0),
	 order_date			timestamp,
	 expected_date		timestamp,
	 current_location   varchar(35),

	 foreign key (user_name) references customer
	 		on delete cascade
	);



create table access
	(user_name			varchar(15),
	 date		  		timestamp,
	 genre				varchar(15),
	 author_name		varchar(25),
	 
	 primary key (user_name,date,genre,author_name),
	 foreign key (user_name) references owner
	 		on delete cascade,
	 foreign key (date,genre,author_name) references report 
	 		on delete cascade
	);

create table manage
	(user_name			varchar(15),
	 Id					int NOT NULL references book,

	 primary key (user_name,Id),
	 foreign key (user_name) references owner
	 		on delete cascade
	);
