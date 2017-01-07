import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../view_model/Task';

@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: 'tasks.component.html'
})

export class TasksComponent { 
  tasks : Task[];
  title : string;

  constructor(private taskService : TaskService){
    this.taskService.getTasks()
      .subscribe(tasks => {
          this.tasks = tasks;
      });
  }

  // Adds a new Task
  addTask(event){
    event.preventDefault();
    var newTask = {
      title: this.title,
      isDone: false
    }
    this.taskService.addTask(newTask).subscribe(task => {
      this.tasks.push(task);
      this.title='';
    });
  }

  // Deletes a selected Task given its id
  deleteTask(id){
    var tasks = this.tasks;

    this.taskService.deleteTask(id).subscribe(deletedTask => {
      if(deletedTask.n == 1){
        for(var i=0; i < tasks.length; i++){
          if(tasks[i]._id == id){
            tasks.splice(i, 1);
          }
        }
      }
    });
  }

  // Updates the Task's isDone status
  updateTaskStatus(task){
    var updatedTaskData = {
      _id : task._id,
      title : task.title,
      isDone : !task.isDone
    };
    this.taskService.updateTaskStatus(updatedTaskData).subscribe(data => {
      task.isDone = !task.isDone;
    });
  }
}

