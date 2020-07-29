import {Component, Input, OnInit} from '@angular/core';
import {TaskAppearance, TodosService} from "../../services/todos.service";

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {

  @Input() elem: TaskAppearance
  @Input() index: number

  inputRewriteValue

  show = {
    delete: false,
    rewrite: false,
    completed: false
  }

  constructor(private todos: TodosService) {
  }

  ngOnInit(): void {
    this.inputRewriteValue = this.elem.title
  }

  plusIndex(){
    this.todos.plusIndexTask(this.index)
  }
  minusIndex(){
    this.todos.minusIndexTask(this.index)
  }

  deleteQuestion(){
    this.show.delete = true
  }
  deleteQuestionYes(){
    this.todos.deleteTask(this.index)
  }
  deleteQuestionNo(){
    this.show.delete = false
  }

  completedQuestion(){
    this.show.completed = true
  }
  completedQuestionYes(){
    this.todos.completedTask(this.index)
    this.show.completed = false
  }
  completedQuestionNo(){
    this.show.completed = false
  }

  rewriteQuestion(){
    this.show.rewrite = true
  }
  rewriteQuestionYes(){
    this.todos.rewriteTask(this.index, this.inputRewriteValue)
    this.show.rewrite = false
  }
  rewriteQuestionNo(){
    this.show.rewrite = false
  }

}
