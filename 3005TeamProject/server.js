const express = require('express')
const app = express()
const session = require('express-session')
const {Client} = require('pg')

const client = new Client({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port
})

client.connect();

app.use(session({
    cookie:{
        maxAge:null
    },
    secret:"Hello Secret"
}))

app.use(express.urlencoded({extended: true}))
app.set("view engine", "pug")
app.use("/",(req,res,next)=>{
    next()
})


app.get("/modify.html", auth, auth2)
app.use(express.static("views"))
app.use(express.static("public"))
app.use(express.static("public/css"))
app.use(express.static("public/js"))




//*report
app.post("/report/:rid", auth, auth2, getReport)
function getReport(req, res, next){
    let rId = req.params.rid;
    if(rId == "1"){
        client.query("select sum(sales) as total_sale, sum(expenditures) as total_exp from report where date < "+sqlV(req.body.enddate)+" and date >"+sqlV(req.body.startdate)+";",(err, response)=>{
            if(err){
                let code = 404;
                let note = ["invalid input"];
                res.status(404).render("badReq", {code,note})
            }
            else{
                if(response.rowCount == 0){
                    let code = 404;
                    let note = ["invalid inputs"];
                    res.status(404).render("badReq", {code,note}) 
                    
                }else{
                    let report = response.rows[0];
                    res.status(200).render("report",{report})
                }
            }
        })
    }else if(rId == "2"){
        client.query("select genre, sum(sales) as total_sale, sum(expenditures) as total_exp from report where date < "+sqlV(req.body.enddate)+" and date >"+sqlV(req.body.startdate)+" and genre="+sqlV(req.body.genre)+" group by genre",(err, response)=>{
            if(err){
                let code = 404;
                let note = ["invalid input"];
                res.status(404).render("badReq", {code,note})
            }
            else{
                if(response.rowCount == 0){
                    let code = 404;
                    let note = ["invalid inputs"];
                    res.status(404).render("badReq", {code,note}) 
                    
                }else{
                    let report = response.rows[0];
                    res.status(200).render("report",{report})
                }
            }
        })
    }else if(rId == "3"){
        client.query("select author_name, sum(sales) as total_sale, sum(expenditures) as total_exp from report where date < "+sqlV(req.body.enddate)+" and date >"+sqlV(req.body.startdate)+" and author_name="+sqlV(req.body.author)+" group by author_name",(err, response)=>{
            if(err){
                let code = 404;
                let note = ["invalid input"];
                res.status(404).render("badReq", {code,note})
            }
            else{
                if(response.rowCount == 0){
                    let code = 404;
                    let note = ["invalid inputs"];
                    res.status(404).render("badReq", {code,note}) 
                    
                }else{
                    let report = response.rows[0];
                    res.status(200).render("report",{report})
                }
            }
        })
    }else{
        let code = 404;
        let note = ["invalid report number"];
        res.status(404).render("badReq", {code,note}) 
    }
}  


//*report page
app.get("/report", reportPage)

function reportPage(req, res,next){
    let report = {};
    res.status(200).render("report",{report})
}


//*order page
app.get("/orders/:oid", orderPage)

function orderPage(req,res,next){
    client.query("select * from user_order where order_id="+req.params.oid, (err, response)=>{
        if(err) throw err
        else{
            if(response.rowCount == 0){
                let code = 404;
                let note = ["Order not found"];
                res.status(404).render("badReq", {code, note});
            }
            res.status(200).render("order", {order: response.rows[0]});
        }
    })
}



//*manage bookstore page
app.post("/manage/add", auth, auth2, add)

function auth2(req, res, next){
    if (!req.session.user.isOwner){
        let note =["You are not owner!"]
        let code = "401";
        res.status(401).render("badReq",{code,note});
    }else{
        next();
    }
}


//add book to bookstore
function add(req, res, next){
    client.query("select * from book where book_name="+sqlV(req.body.bookname)+"and author_name="+sqlV(req.body.authorname)+";",(err, response)=>{
        if(err) throw err
        else{
            if (response.rowCount != 0){
                let code = "401";
                let note = ["book already exists in the database"];
                res.status(401).render("badReq", {code, note})
            }else{
                client.query("select * from publisher where publisher_name="+sqlV(req.body.publishername)+";", (err1, response1) => {
                    if(err1) throw err1
                    else{
                        if(response1.rowCount == 0){
                            client.query("insert into publisher values("+sqlV(req.body.publishername)+", "+ sqlV(req.body.address)+","+sqlV(req.body.email)+"," + sqlV(req.body.phonenumber)+", "+ sqlV(req.body.bankaccount)+ ");", (err2, response2)=>{
                                if(err2) throw err2
                                else{
                                    client.query("insert into book(book_name,author_name,publisher_name,genre,ISBN,price,cost,sales_percentage,in_stock) values ("+sqlV(req.body.bookname)+", "+sqlV(req.body.authorname)+", "+ sqlV(req.body.publishername)+ ", " + sqlV(req.body.genre)+","+sqlV(req.body.isbn)+","+req.body.price +"," +req.body.cost+","+req.body.salespercentage+","+req.body.instock+");",(err3, response3)=>{
                                        if(err3) throw err3
                                    })
                                }
                            })
                        }else{
                            client.query("update publisher set address="+sqlV(req.body.address)+", email="+sqlV(req.body.email)+", phone_number= "+sqlV(req.body.phonenumber)+", bank_account="+sqlV(req.body.bankaccount)+" where publisher_name="+sqlV(req.body.publishername)+";", (err2,response2)=>{
                                if(err2) throw err2
                                else{
                                    client.query("insert into book(book_name,author_name,publisher_name,genre,ISBN,price,cost,sales_percentage,in_stock) values ("+sqlV(req.body.bookname)+", "+sqlV(req.body.authorname)+", "+ sqlV(req.body.publishername)+ ", " + sqlV(req.body.genre)+","+sqlV(req.body.isbn)+","+req.body.price +"," +req.body.cost+","+req.body.salespercentage+","+req.body.instock+");",(err3, response3)=>{
                                        if(err3) throw err3
                                        else{
                                            client.query("select id from book where book_name ="+sqlV(req.body.bookname)+" and author_name="+sqlV(req.body.authorname)+";",(err4, response4)=>{
                                                if(err4) throw err4
                                                else{
                                                    let id = response.rows[0].id;
                                                    client.query("insert into manage values("+sqlV(req.session.user.user_name)+", id="+id+");", (err5, response5)=>{
                                                        if(err5) throw err5
                                                        else{
                                                            console.log("Owner" + req.session.user.user_name+" added a book!")
                                                        }

                                                    })
                                                }
                                            })
                                            
                                        }
                                    })
                                }
                            })
                        }
                        
                    }
                })
            }
        }
    })
    res.status(200).redirect("/home");
    
}

//*delete book from bookstore
app.post("/manage/delete", auth, auth2, del)

function del(req, res, next){
    client.query("select * from book where id="+req.body.bookid+";",(err, response)=>{
        if(err) throw err
        else{
            if (response.rowCount == 0){
                let code = "404"
                let note = ["book cannot be found"];
                res.staus(404).render("badReq", {code,note});
            }else{
                client.query("delete from book where id="+req.body.bookid+";", (err1, response1) => {
                    if(err1) throw err1
                })
            }
        }
    })
    res.status(200).redirect("/home");
}



//*toggle customer and owner
app.post("/users/:uid", auth, switchOwner)
function switchOwner(req, res, next){
    let user = req.session.user; //should get this from database
    if(user.isOwner){
        client.query("delete from owner where user_name ="+sqlV(user.user_name)+";", (err, response)=>{
            if(err) throw err
        })
    }else{
        client.query("insert into owner values("+sqlV(user.user_name)+", "+sqlV(user.password)+", "+sqlV(user.email)+", "+sqlV(user.payment)+", "+sqlV(user.billing_address)+", "+sqlV(user.shipping_address)+");", (err, response)=>{
            if(err) throw err
        })

    }
    user.isOwner = !user.isOwner;
    res.status(200).redirect("/users/"+req.params.uid);  
}


//*User page
app.get("/users/:uid", auth, userPage)

function userPage (req, res, next){
    let user = req.session.user;
    user.isOwner = req.session.user.isOwner;
    client.query("select * from user_order where user_name ="+sqlV(req.session.username),(err, response)=>{
        if(err) throw err
        else{
            res.status(200).render("user", {user, orders:response.rows})
        }
    })
    
}

//*Home page
app.get("/home", goHome)


//*checkout complete:
app.post("/checkout", auth, checkOut)
function checkOut(req,res,next){
    let books = req.session.books;
    if(req.session.user.isOwner){
        client.query("update owner set billing_address="+sqlV(req.body.baddress)+", shipping_address ="+sqlV(req.body.address)+" where user_name="+sqlV(req.session.username)+";", (err, response)=>{
            if(err) throw err
        })
    }
    client.query("update customer set billing_address="+sqlV(req.body.baddress)+", shipping_address ="+sqlV(req.body.address)+" where user_name="+sqlV(req.session.username)+";", (err, response)=>{
        if(err) throw err
    })
    req.session.user.billing_address = req.body.baddress;
    req.session.user.shipping_address = req.body.address;
    for(let i=0; i<books.length; i++){
        let book = books[i];
        let sales = 0;
        let exp = 0;
        let share = 0;
        client.query("insert into user_order(user_name,order_date,Id,quantity,expected_date,current_location) values ("+sqlV(req.session.username)+", current_timestamp, "+book.id+","+book.toBuy+","+"current_timestamp + interval '72 hours'"+","+sqlV("default warehouse")+");", (err, response)=>{
            if(err) throw err
        });
        client.query("update book set in_stock = in_stock -"+book.toBuy+" where id ="+book.id,(err, response)=>{
            if(err) throw err
            else{
                share += book.toBuy * book.price *book.sales_percentage;
                sales += book.toBuy * book.price;
                exp += share;
                client.query("select in_stock from book where id="+book.id, (err1, response1)=>{
                    if(err1) throw err1
                    if(Number(response1.rows[0].in_stock) < 10){
                        client.query("select sum(quantity) from user_order where id ="+book.id+" and order_date < current_timestamp and order_date > current_timestamp - interval '720 hours'", (err2, response2)=>{
                            if(err2) throw err2
                            else{
                                let restock = 0;
                                if(response2.rowCount == 0){
                                    restock = 50;
                                }
                                restock = Math.max(10, response2.rows[0].sum);
                                exp += restock * book.cost;
                                share += restock * book.cost;
                                client.query("update book set in_stock = in_stock +"+restock+" where id ="+book.id,(err3, response3)=>{
                                    if(err3) throw err3
                                    else{
                                        console.log("Email has been sent and this book has been restock");
                                    }
                                })
                            }
                        })
                    }
                })
                client.query("select * from report where date=current_timestamp and genre="+sqlV(book.genre)+" and author_name="+sqlV(book.author_name)+";", (err1, response1)=>{
                    if(err1) throw err1
                    else{
                        if(response1.rowCount == 0){
                            client.query("insert into report values("+"current_timestamp"+","+sqlV(book.genre)+","+sqlV(book.author_name)+","+sales+","+exp+");", (err2, response2)=>{
                                if(err2) throw err2
                            })
                        }else{
                            client.query("update report set sales = sales+"+sales+","+"expenditures=expenditures+"+exp+" where date=current_timestamp and genre="+sqlV(book.genre)+" and author_name="+sqlV(book.author_name)+";", (err3, response3)=>{
                                if(err3) throw err3
                            })
                        }
                    }
                })
                client.query("select * from publisher where publisher_name="+sqlV(book.publisher_name)+";",(err1, response1)=>{
                    if(err1) throw err1
                    else{
                        console.log(share+"$ has been sent to bank account("+response1.rows[0].bank_account+") of publisher:"+book.publisher_name);
                    }
                })
            }
        })
    }
    req.session.books = [];

    res.status(200).redirect("/users/"+req.session.username);
}

//*checkOut page
app.get("/checkout/:uid", checkOutPage)

function checkOutPage(req,res,next){
    if(req.session.user != null){
        let books = req.session.books;
        res.status(200).render("checkout", {user:req.session.user, books});

    }else{
        let code = 404;
        let note = ["Must be logged in to check out!"];
        res.status(404).render("badReq", {code, note});
    }
    
    
}


//*add book to checkOut list
app.post("/checkout/books/:bid", appendCheckoutList, goHome)

function appendCheckoutList(req, res, next){
    client.query("select * from book where id = "+ sqlV(req.params.bid)+";", (err, response)=>{
        if(!err){
            let book = response.rows[0];
            if (response.rowCount == 0){
                let code = 404;
                let note = ["Unknown Book!"];
                res.status(404).render("badReq", {code, note});
            }else{
                book.toBuy = Number(req.body.quantity);
                if(req.session.books == null){
                    req.session.books = [book];
                }else{
                    let flag = false;
                    for(let i=0;i< req.session.books.length; i++){
                        if(req.session.books[i].book_name == book.book_name){
                            req.session.books[i].toBuy += Number(book.toBuy);
                            flag = true;
                        }
                    }
                    if(!flag){
                        req.session.books.push(book);
                    }
                }
                next()
            }
        }else{
            let code = 404;
            let note = ["Unknown Book!"];
            res.status(404).render("badReq", {code, note});
        }
    })
}

//*book page
app.get("/books/:bid",viewBook)
function viewBook(req,res,next){
    client.query("select * from book where id="+sqlV(req.params.bid)+";", (err, response)=>{
        if(!err){
            if(response.rows[0] != null){
                res.status(200).render("book", {book:response.rows[0]}); 
            }else{
                let code = 404;
                let note = ["Unknown Book!"];
                res.status(404).render("badReq", {code, note});
            }
        }else {
            throw err;
        }
    })
     
}


//*home page(bookstore page), provides search by sub string of book name, genre, author name and full string of isbn.
app.get("/books", queryParser, loadBooks, respondBooks)

function queryParser(req, res, next){
    const MAX_BOOKS = 50;
    let params = [];
    for(prop in req.query){
        if(prop == "page"){
            continue;
        }
        params.push(prop+"="+req.query[prop]);
    }
    req.qstring = params.join("&")
    try{
        if(!req.query.limit){
            req.query.limit = 5;
        }
        req.query.limit = Number(req.query.limit);
        if(req.query.limit > MAX_BOOKS){
            req.query.limit = MAX_BOOKS;
        }
    }catch{
        req.query.limit = 5;
    }
    try{
        if(!req.query.page){
            req.query.page = 1;
        }
        req.query.page = Number(req.query.page);
        if(req.query.page<1){
            req.query.page =1;
        }
    }catch{
        req.query.page =1;
    }
    if(!req.query.bookname){
        req.query.bookname = "*";
    }
    if(!req.query.genre){
        req.query.genre ="*";
    }
    if(!req.query.authorname){
        req.query.authorname = "*";
    }
    if(!req.query.isbn){
        req.query.isbn = "*";
    }
    if(!req.query.searchTerm){
        req.query.searchTerm = "*"
    }
    next();
}
function loadBooks(req,res,next){
    let results = [];
    let startIndex = (req.query.page-1)*Number(req.query.limit);
    let count = 0;
    client.query("select * from book;", (err, response)=>{
        if(!err){
            for (let i=0; i<response.rowCount; i++){
                if(bookMatch(response.rows[i], req.query)){
                    if(count >= startIndex){
                        results.push(response.rows[i]);
                    }
                    if(results.length >= 6){
                        break;
                    }
                    count++;
                }
            }
            res.books = results;
            next();
        }else{
            throw err;
        }
    })

    
}

function bookMatch(book, query){
    let nameCheck = false;
    let genreCheck = false;
    let authorCheck = false;
    let isbnCheck = false;
    let searchTermCheck = false;
    if(query.searchTerm == "*" || book.book_name.toLowerCase().indexOf(query.searchTerm.toLowerCase()) >= 0 || book.genre.toLowerCase().indexOf(query.searchTerm.toLowerCase()) >= 0 || book.isbn == query.searchTerm || book.author_name.toLowerCase().indexOf(query.searchTerm.toLowerCase()) >= 0){
        searchTermCheck = true;
    }
    if(query.bookname == "*" || book.book_name.toLowerCase().indexOf(query.bookname.toLowerCase()) >= 0){
        nameCheck = true;
    }
    if(query.genre == "*" || book.genre.toLowerCase().indexOf(query.genre.toLowerCase()) >= 0){
        genreCheck = true;
    }
    if(query.authorname == "*" || book.author_name.toLowerCase().indexOf(query.authorname.toLowerCase()) >=0){
        authorCheck = true;
    }
    if(query.isbn == "*" || book.isbn==query.isbn){
        isbnCheck = true;
    }
    return nameCheck && genreCheck && authorCheck && isbnCheck && searchTermCheck;
}

function respondBooks(req,res,next){
    // this user may need to get from database
    let user;
    req.session.loggedin ? user = req.session.user : user = null;
    res.render("bookstore", {user,qstring:req.qstring, current:req.query.page, books: res.books});
}


//*log out:
app.get("/logout",auth,logout)

function auth(req,res,next){
    if(!req.session.loggedin){
        let note = ["You must log in to view this"];
        let code = "400";
        res.status(403).render("badReq",{code,note});
        return;
    }
    next();
}

function logout(req,res,next){
    req.session.destroy();
    res.status(200).redirect('/');
}

//*sign up:
app.post("/users", signup)
 function signup(req,res,next){
    client.query("insert into customer values("+sqlV(req.body.username)+","+sqlV(req.body.password)+","+sqlV(req.body.email)+","+sqlV(req.body.payment)+","+sqlV(req.body.baddress)+","+sqlV(req.body.address)+");", (err, response)=>{
        if(err){
            let code = "406";
            let note = ["username already exists!"];
            res.status(406).render("badReq", {code,note});
        }else{
            res.status(200).redirect("/");
        }
    })
}
function sqlV(v){
    return "'"+v+"'";
}


//*sign in: 
app.post("/main", login, goHome)
function login(req,res,next){
    if(req.session.loggedin === true){
        let note = ["Already logged in"];
        let code = "406";
        res.status(406).render("badReq", {code,note});
    }
    else{
        client.query('select * from customer where user_name='+"'"+req.body.username+"'"+' and password='+"'"+req.body.password+"';", (err, response)=>{
            if(!err){
                if(response.rows.length == 0){
                    let note = ["User doesn't exists or invalid password"];
                    let code = "401";
                    res.status(401).render("badReq", {code,note});
                }else{
                    let user = response.rows[0];
                    user.isOwner = false;
                    req.session.user = user;
                    req.session.username = req.body.username;
                    req.session.loggedin = true;
                    client.query('select * from owner where user_name='+sqlV(req.body.username)+";",(err1, response1)=>{
                        if(err1) throw err1
                        else{
                            if(response.rowCount == 0){
                                req.session.user.isOwner = false;
                            }else{
                                req.session.user.isOwner = true;
                            }
                            next();
                        }
                    })
                }
            }
        })
    }
}

function goHome(req, res, next){
    res.redirect("/books");
} 

app.listen(3000,()=>console.log('listenging on port 3000'));