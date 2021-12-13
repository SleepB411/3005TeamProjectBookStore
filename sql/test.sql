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
insert into owner values ('tianchengqin','123456','tcq@qtc.com','123214124124','1038 zl E','1038 zl E');
insert into owner values ('zzf','123456','zfz@zzf.com','1232141264654','1037 zl E','1037 zl E');
insert into customer values ('qtc','123456','qtc@qtc.com','1232145435124','1037 zl E','1037 zl E');
insert into customer values ('zifanzhu','123456','zzf@zfz.com','123426345124124','1034 zl E','1034 zl E');
insert into book(book_name,author_name,publisher_name,genre,ISBN,prices,cost,sales_percentage,in_stock) values ('???','zzf','aaa','sci','djaosdj312',18.88,8.88,0.25,188);
insert into book(book_name,author_name,publisher_name,genre,ISBN,prices,cost,sales_percentage,in_stock) values ('You Yong','zzf','bbb','sci','djaosdj322',18.99,8.88,0.25,165);
insert into book(book_name,author_name,publisher_name,genre,ISBN,prices,cost,sales_percentage,in_stock) values ('Math5603','zzf','ccc','adv','djaosdj332',18.88,8.88,0.25,143);
insert into book(book_name,author_name,publisher_name,genre,ISBN,prices,cost,sales_percentage,in_stock) values ('history','qtc','ddd','sci','gadgas24321',28.88, 9.88,0.30,67);
insert into book(book_name,author_name,publisher_name,genre,ISBN,prices,cost,sales_percentage,in_stock) values ('comp3005','qtc','aaa','adv','djagregre312',58.88,28.88,0.15,99);
insert into book(book_name,author_name,publisher_name,genre,ISBN,prices,cost,sales_percentage,in_stock) values ('comp3005','qc','aaa','adv','djaghdfg312',58.88,28.88,0.15,99);
insert into book(book_name,author_name,publisher_name,genre,ISBN,prices,cost,sales_percentage,in_stock) values ('Three Body','LCX','aaa','adv','dja4236gre312',58.88,28.88,0.15,99);
insert into book(book_name,author_name,publisher_name,genre,ISBN,prices,cost,sales_percentage,in_stock) values ('Thx For U Coming','qfh','aaa','romantic','djaggherh4312',58.88,28.88,0.15,99);
insert into book(book_name,author_name,publisher_name,genre,ISBN,prices,cost,sales_percentage,in_stock) values ('Aceamword','xqj','ccc','adv','djasdfjsjg43',58.88,28.88,0.15,99);
insert into book(book_name,author_name,publisher_name,genre,ISBN,prices,cost,sales_percentage,in_stock) values ('Sleep B 4 11','ZZF','aaa','horror','dju89690jdfh',58.88,28.88,0.15,99);
insert into book(book_name,author_name,publisher_name,genre,ISBN,prices,cost,sales_percentage,in_stock) values ('Neon Evanglian','AYXM','aaa','sci','dgjsrgj85948',58.88,28.88,0.15,99);
insert into book(book_name,author_name,publisher_name,genre,ISBN,prices,cost,sales_percentage,in_stock) values ('goudan','zz','aaa','adv','djagrgdf9g54',58.88,28.88,0.15,99);
insert into book(book_name,author_name,publisher_name,genre,ISBN,prices,cost,sales_percentage,in_stock) values ('how is goudan become iron','qc','aaa','adv','djhjgtuh4854',58.88,28.88,0.15,99);
insert into book(book_name,author_name,publisher_name,genre,ISBN,prices,cost,sales_percentage,in_stock) values ('dont br mean','yql','ddd','adv','drht437uf394',58.88,28.88,0.15,99);
insert into report values ('2021-12-03','sci','zzf',1180.88,567.66);
insert into report values ('2021-12-08','sci','zzf',3245.45,2453.45);
insert into report values ('2021-12-24','adv','zzf',80.88,5.66);
insert into report values ('2021-12-17','sci','qtc',280.88,57.66);
insert into user_order(user_name,order_date,Id,quantity,expected_date,current_location) values ('zifanzhu','2021-12-01',3,3,'2022-12-01','ottawa, ON');
insert into user_order(user_name,order_date,Id,quantity,expected_date,current_location) values ('qtc','2021-12-03',4,5,'2022-12-05','ottawa, ON');
insert into user_order(user_name,order_date,Id,quantity,expected_date,current_location) values ('qtc','2021-12-04',4,1,'2022-12-06','ottawa, ON');
insert into user_order(user_name,order_date,Id,quantity,expected_date,current_location) values ('qtc','2021-12-05',6,1,'2022-12-07','ottawa, ON');
insert into access values ('zzf','2021-12-03','sci','zzf');
insert into access values ('zzf','2021-12-24','adv','zzf');
insert into access values ('tianchengqin','2021-12-17','sci','qtc');
insert into access values ('tianchengqin','2021-12-03','sci','zzf');
insert into manage values ('zzf',1);
insert into manage values ('zzf',2);
insert into manage values ('zzf',3);
insert into manage values ('zzf',4);
