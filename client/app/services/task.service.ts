import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService{
    constructor(private http : Http){
        console.log('Task service is initialized!... ');
    }

    // Retrieves all tasks
    getTasks(){
        return this.http.get('/api/tasks').map(res => res.json());
    }

    // Adds a new Task
    addTask(newTask){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/task', JSON.stringify(newTask), {headers:headers})
            .map(res => res.json());
    }

    // Deletes a selected task given its id
    deleteTask(id){
        return this.http.delete('/api/task/'+id).map(res => res.json());
    }

    updateTaskStatus(updatedTask){
        console.log(updatedTask);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/task/'+updatedTask._id, JSON.stringify(updatedTask), {headers:headers})
            .map(res => res.json());
    }
}