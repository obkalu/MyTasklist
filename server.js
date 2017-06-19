// Load modules/libraries and assign them to specific references to be used later
var express = require('express');
var path = require('path'); // to enable processing & manipulation of filesystem paths
var bodyParser = require('body-parser');

// Create and set variables to constitute urls that will exist in the app
// These point to folders and files that will exist within the app
// Therefore, we create in our project folder, a folder named, routes.
// And inside the routes folder, we create the 2 new files named, index.js and tasks.js
var index = require('./routes/index'); // points to ./routes/index.js
var tasks = require('./routes/tasks'); // points to ./routes/tasks.js
// See ./routes/index.js for the code that is needed in it
// See ./routes/tasks.js for the code that is needed in it

// Define and set variable for the hostname and port number our node.js server app will be running/listening on
var hostname = 'localhost';
var port = 3000;

// Create and set a variable reference to the app itself, which is an instance of express
// var express: () => Express. Note: the function express() creates an Express application. 
// The express() function is a top-level function exported by the express module.
var app = express(); 

// Setup the View Engine
// First, tell the app where the view files will be located
app.set('views', path.join(__dirname, 'views'));
// We then create a new folder named, views, inside our project folder.
// And also, create a new file named, index.html inside the views folder.
// Now, we specify the type of the view Engine
app.set('view engine', 'ejs');
// Tell the app that the view engine should also render static files of type html
app.engine('html', require('ejs').renderFile);

// Set the app to use a static folder to contain all the client-side angularJS resources
app.use(express.static(path.join(__dirname, 'client')));

// Next, we setup the bodyParser middleware
// Note: These lines of code here are just standard and obtained from the body-parser module's documentation
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Setup the routes
app.use('/', index); // the app's root url should point to the index variable route we've defined above (line 10)
app.use('/api', tasks); // any url prefixed with /api should go to the tasks variable route, also def above (line 11)

// Set the app to begin listening on the defined port and with a callback function to invoke when it starts
app.listen(port, hostname, function(){
    console.log('NodeJS Server for MyTasklist webapp has started on port: ' + port);
});


