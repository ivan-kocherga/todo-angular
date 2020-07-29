import { Injectable } from '@angular/core';
import {DateService} from "./date.service";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Subject} from "rxjs";
import {HelpService} from "./help.service";

export interface TaskAppearance {
  userId: number,
  id: any,
  title: string,
  completed: boolean,
  basick : boolean
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private tasks: TaskAppearance[] = (localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : []

  private stream$ = new BehaviorSubject(this.tasks);

  private search$ = new BehaviorSubject('')


  constructor(private date: DateService,private http: HttpClient, private help: HelpService) {
    if(this.tasks.length == 0 && localStorage.getItem('basickElementOnce') == undefined){
      http.get<TaskAppearance[]>('https://jsonplaceholder.typicode.com/todos?_limit=3').subscribe( v => {

        for(let i of v){
          i.id = date.dateGenerate(new Date())
          i.basick = true
        }

        this.tasks = v

        this.stream$.next(this.tasks)

        localStorage.setItem('basickElementOnce', "true")
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
      })
    }
  }

  nextSearch = (v) => {
    this.search$.next(v)
  }

  returnSearch = () => {
    return this.search$.asObservable()
  }

   returnStream = () => {
    return this.stream$.asObservable()
  }

  createTask(obj){
    this.tasks.unshift(obj)
    this.stream$.next(this.tasks)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

  minusIndexTask(indElm){
    if(this.tasks[indElm].userId > 1){
      this.tasks[indElm].userId -= 1
    }
    this.stream$.next(this.tasks)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }
  plusIndexTask(indElm){
    if(this.tasks[indElm].userId < 10){
      this.tasks[indElm].userId += 1
    }
    this.stream$.next(this.tasks)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

  deleteTask(indElm){
    this.tasks = this.help.remove(this.tasks, indElm)
    this.stream$.next(this.tasks)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }
  completedTask(indElm){
    this.tasks[indElm].completed = !this.tasks[indElm].completed
    this.stream$.next(this.tasks)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }
  rewriteTask(indElm, text){
    this.tasks[indElm].title = text
    this.stream$.next(this.tasks)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

  sortIndex(){
    if(this.tasks[0].userId < this.tasks[this.tasks.length-1].userId){
      this.tasks.sort(function (a, b) {return b.userId - a.userId})
    }else {
      this.tasks.sort(function (a, b) {return a.userId - b.userId})
    }
    this.stream$.next(this.tasks)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }
  sortDate(){
    if(this.tasks[0].id.fullDate < this.tasks[this.tasks.length-1].id.fullDate){
      this.tasks.sort(function (a, b) {return b.id.fullDate - a.id.fullDate})
    }else {
      this.tasks.sort(function (a, b) {return a.id.fullDate - b.id.fullDate})
    }
    this.stream$.next(this.tasks)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }
  sortCompleted(){
    if(this.tasks[0].completed < this.tasks[this.tasks.length-1].completed){
      this.tasks.sort(function (a, b) {return Number(b.completed) - Number(a.completed)})
    }else {
      this.tasks.sort(function (a, b) {return Number(a.completed) - Number(b.completed)})
    }
    this.stream$.next(this.tasks)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

}



