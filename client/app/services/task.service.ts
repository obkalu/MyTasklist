import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Task } from "../../view_model/Task";

@Injectable()
export class TaskService {
    constructor(private http : Http) {
        console.log("Task service is initialized and Http object injected! ... ");
    }

    // retrieves all tasks
    getTasks(): Observable<Task[]> {
        return this.http.get("/api/tasks").map(res => res.json());
    }

    // adds a new Task
    addTask(newTask: Task): Observable<Task> {
        var headers: Headers = new Headers();
        headers.append("Content-Type", "application/json");
        return this.http.post("/api/task", JSON.stringify(newTask), {headers:headers})
            .map(res => res.json());
    }

    // deletes a selected task given its id
    deleteTask(id: string): Observable<any> {
        return this.http.delete("/api/task/"+id).map(res => res.json());
    }

    // updates the given task
    updateTaskStatus(updatedTask: Task): Observable<any> {
        console.log(updatedTask);
        var headers: Headers = new Headers();
        headers.append("Content-Type", "application/json");
        return this.http.put("/api/task/"+updatedTask._id, JSON.stringify(updatedTask), {headers:headers})
            .map(res => res.json());
    }
}