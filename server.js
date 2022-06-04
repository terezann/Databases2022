const express = require("express")
const server = express()                    //By calling express func we create an app wich allows us
                                            //to set up our entire server

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
require('custom-env').env('localhost');     // Use as enviroment file the .env.localhost

const session = require('express-session');
const flash = require('connect-flash');
// import routes
const tables = require('./routes/tables');
const projects = require('./routes/projects');
const programs = require('./routes/programs');
const sci_field = require('./routes/sci_field');
const organizations = require('./routes/organizations');
const exec = require('./routes/exec');
const { json } = require("express/lib/response");


server.set('view engine', 'ejs'); 
server.use(express.static('public'));       // static files are in public (CSS,html)
                                            // CSS for the layout of the html
server.use(flash());

server.use(session({
    secret: "ThisShouldBeSecret",
    resave: false,
    saveUninitialized: false
}));



//GET https://localhost:3000/
server.get("/" , (req,res) => {
    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length == 0) messages = [];

    res.render ("index", { pageTitle: 'Home',messages})
})    

server.post('/update', (req, res) => {
    var table_name = req.body.table;
    var json_string = req.body.object;
    var tuple = JSON.parse(json_string)
    res.send(tuple);
    console.log(table_name);
    console.log(tuple);
})

server.post('/delete', (req, res) => {
    var table_name = req.body.table;
    var json_string = req.body.object;
    var tuple = JSON.parse(json_string)
    res.send(tuple);
    console.log(table_name);
    console.log(tuple);

    if (table_name == 'executive'){ //auto gia ola
        console.log(tuple.executive_id);
    }
})

server.use('/tables', tables)

server.use('/projects',projects)            // for all the requests (to /projects) use projects  

server.use('/programs',programs)            // for all the requests (to /projects) use projects  

server.use('/sci_field',sci_field)

server.use('/organizations', organizations) // for all the requests (to /organizations) to use organizations

server.use('/exec',exec) 


server.use(function (req,res,next){
	res.render ("404", { pageTitle: '404' }) // in the parameter page title at the 404.ejs put 404
});

server.listen(3000)                            //To make our server actually run (3000 = port)


