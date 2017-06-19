import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { Task } from "../../../view_model/Task";

@Component({
  moduleId: module.id,
  selector: "tasks",
  templateUrl: "tasks.component.html"
})

export class TasksComponent implements OnInit {
  tasks : Task[];
  title : string;

  constructor(private taskService : TaskService) {  }

  ngOnInit(): void {
    this.taskService.getTasks()
      .subscribe(tasks => {
          this.tasks = tasks;
      });
  }

  // tslint:disable-next-line:comment-format
  // Adds a new Task
  addTask(event: any): void {
    event.preventDefault();
    // tslint:disable-next-line:typedef
    var newTask = {
      title: this.title,
      isDone: false
    };

    this.taskService.addTask(newTask).subscribe(task => {
      this.tasks.push(task);
      this.title="";
    });
  }

  // tslint:disable-next-line:comment-format
  // Deletes a selected Task given its id
  deleteTask(id: any): void {
    var tasks: Task[] = this.tasks;

    this.taskService.deleteTask(id).subscribe(deletedTask => {
      if(deletedTask.n === 1) {
        // tslint:disable-next-line:typedef
        for(var i=0; i < tasks.length; i++) {
          if(tasks[i]._id === id) {
            tasks.splice(i, 1);
          }
        }
      }
    });
  }

  // updates the Task's isDone status
  updateTaskStatus(task: Task): void {
    var updatedTaskData: Task = {
      _id : task._id,
      title : task.title,
      isDone : !task.isDone
    };
    this.taskService.updateTaskStatus(updatedTaskData).subscribe(data => {
      task.isDone = !task.isDone;
    });
  }
}

