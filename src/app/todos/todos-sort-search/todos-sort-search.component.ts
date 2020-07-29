import { Component, OnInit } from '@angular/core';
import {TaskAppearance, TodosService} from "../../services/todos.service";

@Component({
  selector: 'app-todos-sort-search',
  templateUrl: './todos-sort-search.component.html',
  styleUrls: ['./todos-sort-search.component.css']
})
export class TodosSortSearchComponent implements OnInit {

  tasks: TaskAppearance[]


  disable=''

  constructor(private todos: TodosService) {
    todos.returnStream().subscribe(v => {
      this.tasks = v
      if(v.length < 2){
        this.disable='disable'
      }
      if(v.length > 1){
        this.disable=''
      }
    })
  }

  ngOnInit(): void {
  }

  sortIndex(){
    this.todos.sortIndex()
  }
  sortDate(){
    this.todos.sortDate()
  }
  sortCompleted(){
    this.todos.sortCompleted()
  }

  searchTask(e){
    this.todos.nextSearch(e.target.value)
  }

}
