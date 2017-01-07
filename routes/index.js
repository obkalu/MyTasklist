// Bring in Express
var express = require('express');
// Define and set reference to a router object from express
var router = express.Router();

// Now, configure the router to handle an http get request to the index (homepage) url, with "/" to send a response with the index page
router.get('/', function(request, response, next){
    response.render('index.html');
});

// Add the router to the exported modules collection
module.exports = router;
