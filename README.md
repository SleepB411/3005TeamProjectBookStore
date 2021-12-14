# 3005PJ
# Team: Zifan Zhu,  Tiancheng Qin


Instructions:

With node js and postgresql installed:

First, create a new database using pgAdmin and using the two sql files in sql directory to initalize the database.

Download 3005TeamProject or .zip file and unzip it, in the 3005TeamProject directory open terminal:
> npm install

modify the nodemon.json file:
change this
	{
		"env": {
		"user": "postgres",
		"host": "localhost",
		"database": "bookstore",
		"password": "password",
		"port": 5432
		}
	}
to this form:
	{
		"env": {
		"user": your database user,
		"host": "localhost",
		"database": your new created database name,
		"password": your database password,
		"port": your database port
		}
	}
  
go back to the terminal you opened:
> npm start
  
open a browser and go to "localhost:3000"

Then you can use username: student
                 password: student
to sign in for testing purpose or sign up your own account.


