import {Component, Input, OnInit} from '@angular/core';
import {TaskAppearance, TodosService} from "../../services/todos.service";

export interface IShow{
  delete: boolean,
  rewrite: boolean,
  completed: boolean
}

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})

export class TodosListComponent implements OnInit {

  @Input() elem: TaskAppearance
  @Input() index: number

  inputRewriteValue: string = ''

  show: IShow = {
    delete: false,
    rewrite: false,
    completed: false
  }

  constructor(private todos: TodosService) {
  }

  ngOnInit(): void {
    this.inputRewriteValue = this.elem.title
  }

  plusIndex(): void {
    this.todos.plusIndexTask(this.index)
  }
  minusIndex(): void {
    this.todos.minusIndexTask(this.index)
  }

  deleteQuestion(): void {
    this.show.delete = true
  }
  deleteQuestionYes(): void {
    this.todos.deleteTask(this.index)
  }
  deleteQuestionNo(): void {
    this.show.delete = false
  }

  completedQuestion(): void {
    this.show.completed = true
  }
  completedQuestionYes(): void {
    this.todos.completedTask(this.index)
    this.show.completed = false
  }
  completedQuestionNo(): void {
    this.show.completed = false
  }

  rewriteQuestion(): void {
    this.show.rewrite = true
  }
  rewriteQuestionYes(): void {
    this.todos.rewriteTask(this.index, this.inputRewriteValue)
    this.show.rewrite = false
  }
  rewriteQuestionNo(): void {
    this.show.rewrite = false
  }

}
