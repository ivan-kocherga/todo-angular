import { Component, OnInit } from '@angular/core';
import {TaskAppearance, TodosService} from "../../services/todos.service";

@Component({
  selector: 'app-todos-sort-search',
  templateUrl: './todos-sort-search.component.html',
  styleUrls: ['./todos-sort-search.component.css']
})
export class TodosSortSearchComponent implements OnInit {

  tasks: TaskAppearance[]


  disable: string = ''

  constructor(private todos: TodosService) {
  }

  ngOnInit(): void {
    this.todos.returnStream().subscribe(v => {
      this.tasks = v
      if(v.length < 2){
        this.disable='disable'
      }
      if(v.length > 1){
        this.disable=''
      }
    })
  }

  sortIndex(): void{
    this.todos.sortIndex()
  }
  sortDate(): void{
    this.todos.sortDate()
  }
  sortCompleted(): void{
    this.todos.sortCompleted()
  }

  searchTask(e: any): void {
    this.todos.nextSearch(e.target.value)
  }

}
