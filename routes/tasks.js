// Bring in Express
var express = require('express');
// Define and set reference to a router object from express
var router = express.Router();
// bring in mongojs
var mongojs = require('mongojs');
// create a reference to the db using mongojs and specifying the database connection driver and parameters,
// including an array of the collections we want to access
var db = mongojs('mongodb://meantasklistdbuser:meantasklistdbuser@ds117348.mlab.com:17348/meantasklistdb', ['tasks']);

// Now, configure the router to handle an http get request to the tasks url, with "/tasks" to send a response with the tasks
// Gets all tasks in the collection
router.get('/tasks', function(request, response, next){
    db.tasks.find(function(err, tasks){
       if(err){
           response.send(err);
       }
       response.json(tasks);
        // if(!err){
        //     response.json(tasks);
        // }else{
        //     response.send(err);
        // }
        
    })
});

// Gets a single task given its id
router.get('/task/:id', function(request, response, next){
    db.tasks.findOne({_id:mongojs.ObjectId(request.params.id)}, function(err, task){
       if(err){
           response.send(err);
       }
       response.json(task);
    })
});

// Save a new task
router.post('/task', function(request, response, next){
    // read the json data from the request object 
    var task = request.body;
    // validate by checking that the data is at least present
    if(!task.title || !(task.isDone + '')){
        response.status(400);
        response.json({
            "error":"Bad data. Missing something"
        });
    } else {
        db.tasks.save(task, function(err, task){
            if(err){
                response.send(err);
            }
            response.json(task);            
        })
    }
});

// Deletes a single task given its id
router.delete('/task/:id', function(request, response, next){
    db.tasks.remove({_id:mongojs.ObjectId(request.params.id)}, function(err, task){
       if(err){
           response.send(err);
       }
       response.json(task);
    })
});

// Updates a single task given its id
router.put('/task/:id', function(request, response, next){
    var task = request.body;
    var updatedTask = {};
    // Validate the updated task data by simply checking that the parts exist/are present
    if(task.isDone){
        updatedTask.isDone = task.isDone;
    } else {
        updatedTask.isDone = false;
    }
    if(task.title){
        updatedTask.title = task.title;
    }    
    // Validate further more by checking that the updatedTask object exists
    if(!updatedTask){
        response.status(400);
        response.json({
            "error":"Bad data"
        });
    } else {
        db.tasks.update({_id:mongojs.ObjectId(request.params.id)}, updatedTask, {}, function(err, task){
        if(err){
            response.send(err);
        }
        response.json(task);
        })
    }
});
// End of Backend Data Access code (or data service layer)

// Add the router to the exported modules collection
module.exports = router;
