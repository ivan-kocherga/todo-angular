import { Component, OnInit } from '@angular/core';
import {TaskAppearance, TodosService} from "../services/todos.service";
import {HelpService} from "../services/help.service";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  realTime = new Date()

  tasks: TaskAppearance[]

  searchTasks
  valueSearchInput

  constructor(private todo: TodosService, private help: HelpService) {
    setInterval(() => this.realTime = new Date(), 1000)
    this.todo.returnStream().subscribe(v => {
      this.tasks = v
    })
    this.todo.returnSearch().subscribe(v => {
      this.valueSearchInput = v
      this.searchTasks = help.filterValues(v, this.tasks)
    })
  }

  ngOnInit(): void {}

}
