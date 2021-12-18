create function mytrigger()
	returns trigger as
$body$
begin
if NEW.in_stock < 10 then
	update book
	set in_stock = in_stock+(select sum(quantity) 
							 from user_order 
							 where id =NEW.id 
							 and order_date < current_timestamp 
							 and order_date > current_timestamp - interval '720 hours')
	where book.id = NEW.id;
end if;
return NEW;
end;
$body$
	language plpgsql volatile;
