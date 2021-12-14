delete from owner;
delete from customer;
delete from book;
delete from report;
delete from user_order;
delete from publisher;
delete from access;
delete from manage;

ALTER SEQUENCE book_Id_seq RESTART WITH 1;
ALTER SEQUENCE user_order_order_id_seq RESTART WITH 1;

insert into publisher values ('aaa','1039 zl R','aaa@aaa.com','111-122-333','1111111111111');
insert into publisher values ('bbb','1038 zl R','bbb@aaa.com','111-122-444','1222222222211');
insert into publisher values ('ccc','1037 zl R','ccc@aaa.com','111-122-555','1333333333331');
insert into publisher values ('ddd','1036 zl R','ddd@aaa.com','111-122-666','1114444444411');
insert into owner values ('student','student','student@student.com','123456789','3005 Comp Rd E','3005 Comp Rd E');
insert into owner values ('tianchengqin','123456','tcq@qtc.com','123214124124','1038 zl E','1038 zl E');
insert into owner values ('zzf','123456','zfz@zzf.com','1232141264654','1037 zl E','1037 zl E');
insert into customer values ('student','student','student@student.com','123456789','3005 Comp Rd E','3005 Comp Rd E');
insert into customer values ('tianchengqin','123456','tcq@qtc.com','123214124124','1038 zl E','1038 zl E');
insert into customer values ('zzf','123456','zfz@zzf.com','1232141264654','1037 zl E','1037 zl E');
insert into customer values ('qtc','123456','qtc@qtc.com','1232145435124','1037 zl E','1037 zl E');
insert into customer values ('zifanzhu','123456','zzf@zfz.com','123426345124124','1034 zl E','1034 zl E');
insert into book(book_name,author_name,publisher_name,genre,ISBN,price,cost,sales_percentage,in_stock) values ('Hello World','zzf','aaa','sci','djaosdj312',18.88,8.88,0.25,188);
insert into book(book_name,author_name,publisher_name,genre,ISBN,price,cost,sales_percentage,in_stock) values ('You Young','zzf','bbb','sci','djaosdj322',18.99,8.88,0.25,165);
insert into book(book_name,author_name,publisher_name,genre,ISBN,price,cost,sales_percentage,in_stock) values ('Math5603','zzf','ccc','adv','djaosdj332',18.88,8.88,0.25,143);
insert into book(book_name,author_name,publisher_name,genre,ISBN,price,cost,sales_percentage,in_stock) values ('history','qtc','ddd','sci','gadgas24321',28.88, 9.88,0.30,67);
insert into book(book_name,author_name,publisher_name,genre,ISBN,price,cost,sales_percentage,in_stock) values ('comp3005','qtc','aaa','adv','djagregre312',58.88,28.88,0.15,99);
insert into book(book_name,author_name,publisher_name,genre,ISBN,price,cost,sales_percentage,in_stock) values ('comp3005','qc','aaa','adv','djaghdfg312',58.88,28.88,0.15,99);
insert into book(book_name,author_name,publisher_name,genre,ISBN,price,cost,sales_percentage,in_stock) values ('Three Body','LCX','aaa','adv','dja4236gre312',58.88,28.88,0.15,99);
insert into book(book_name,author_name,publisher_name,genre,ISBN,price,cost,sales_percentage,in_stock) values ('Thx For U Coming','qfh','aaa','romantic','djaggherh4312',58.88,28.88,0.15,99);
insert into book(book_name,author_name,publisher_name,genre,ISBN,price,cost,sales_percentage,in_stock) values ('Aceamword','xqj','ccc','adv','djasdfjsjg43',58.88,28.88,0.15,99);
insert into book(book_name,author_name,publisher_name,genre,ISBN,price,cost,sales_percentage,in_stock) values ('Sleep B 4 11','ZZF','aaa','horror','dju89690jdfh',58.88,28.88,0.15,99);
insert into book(book_name,author_name,publisher_name,genre,ISBN,price,cost,sales_percentage,in_stock) values ('Neon Evanglian','AYXM','aaa','sci','dgjsrgj85948',58.88,28.88,0.15,99);
insert into book(book_name,author_name,publisher_name,genre,ISBN,price,cost,sales_percentage,in_stock) values ('goudan','zz','aaa','adv','djagrgdf9g54',58.88,28.88,0.15,99);
insert into book(book_name,author_name,publisher_name,genre,ISBN,price,cost,sales_percentage,in_stock) values ('how is goudan become iron','qc','aaa','adv','djhjgtuh4854',58.88,28.88,0.15,99);
insert into book(book_name,author_name,publisher_name,genre,ISBN,price,cost,sales_percentage,in_stock) values ('dont br mean','yql','ddd','adv','drht437uf394',58.88,28.88,0.15,99);
insert into report values ('2021-12-06 20:38:40','sci','zzf',1180.88,567.66);
insert into report values ('2021-12-16 20:38:40','sci','zzf',3245.45,2453.45);
insert into report values ('2021-12-27 20:38:40','adv','zzf',80.88,5.66);
insert into report values ('2021-11-20 20:38:40','sci','qtc',280.88,527.66);
insert into report values ('2021-12-04 20:38:40','sci','zzf',7180.88,4367.66);
insert into report values ('2021-12-18 20:38:40','sci','zzf',3245.45,2453.45);
insert into report values ('2021-12-26 20:38:40','adv','qtc',805.88,45.66);
insert into report values ('2021-12-11 20:38:40','sci','zzf',180.88,267.66);
insert into report values ('2021-12-17 20:38:40','sci','qtc',3264.47,1443.45);
insert into report values ('2021-12-25 20:38:40','adv','zzf',8540.88,5342.66);
insert into user_order(user_name,order_date,Id,quantity,expected_date,current_location) values ('zifanzhu','2021-02-16 20:38:40',3,3,'2021-02-16 20:38:40','ottawa, ON');
insert into user_order(user_name,order_date,Id,quantity,expected_date,current_location) values ('qtc','2021-02-16 20:38:40',4,5,'2021-02-16 20:38:40','ottawa, ON');
insert into user_order(user_name,order_date,Id,quantity,expected_date,current_location) values ('qtc','2021-02-16 20:38:40',4,1,'2021-02-16 20:38:40','ottawa, ON');
insert into user_order(user_name,order_date,Id,quantity,expected_date,current_location) values ('qtc','2021-02-16 20:38:40',6,1,'2021-02-16 20:38:40','ottawa, ON');