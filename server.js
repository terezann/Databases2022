const express = require("express")
const server = express()                    //By calling express func we create an app wich allows us
                                            //to set up our entire server

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
require('custom-env').env('localhost');     // Use as enviroment file the .env.localhost

// import routes
const tables = require('./routes/tables');
const projects = require('./routes/projects');
const programs = require('./routes/programs');
const sci_field = require('./routes/sci_field');
const organizations = require('./routes/organizations');
const exec = require('./routes/exec');

server.set('view engine', 'ejs'); 
server.use(express.static('public'));       // static files are in public (CSS,html)
                                            // CSS for the layout of the html




//GET https://localhost:3000/
server.get("/" , (req,res) => {
    
    res.render ("index", { pageTitle: 'Home' })
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


