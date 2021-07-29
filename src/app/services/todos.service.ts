import { Injectable } from '@angular/core';
import {DateService} from "./date.service";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
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

  private stream$: BehaviorSubject<TaskAppearance[]> = new BehaviorSubject<TaskAppearance[]>(this.tasks);

  private search$: BehaviorSubject<string> = new BehaviorSubject<string>('')


  constructor(private date: DateService,
              private http: HttpClient,
              private help: HelpService) {

    if(this.tasks.length == 0 && localStorage.getItem('basickElementOnce') == undefined){
      http.get<TaskAppearance[]>('https://jsonplaceholder.typicode.com/todos?_limit=3').subscribe( (v: any[]) => {
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

  nextSearch(v: string): void {
    this.search$.next(v)
  }

  returnSearch(): Observable<any> {
    return this.search$.asObservable()
  }

   returnStream(): Observable<any> {
    return this.stream$.asObservable()
  }

  createTask(obj: TaskAppearance): void {
    this.tasks.unshift(obj)
    this.stream$.next(this.tasks)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

  minusIndexTask(indElm: number): void {
    if(this.tasks[indElm].userId > 1){
      this.tasks[indElm].userId -= 1
    }
    this.stream$.next(this.tasks)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

  plusIndexTask(indElm: number): void {
    if(this.tasks[indElm].userId < 10){
      this.tasks[indElm].userId += 1
    }
    this.stream$.next(this.tasks)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

  deleteTask(indElm: number): void {
    this.tasks = this.help.remove(this.tasks, indElm)
    this.stream$.next(this.tasks)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

  completedTask(indElm: number): void {
    this.tasks[indElm].completed = !this.tasks[indElm].completed
    this.stream$.next(this.tasks)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

  rewriteTask(indElm: number, text: string): void {
    this.tasks[indElm].title = text
    this.stream$.next(this.tasks)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

  sortIndex(): void {
    if(this.tasks[0].userId < this.tasks[this.tasks.length-1].userId){
      this.tasks.sort( (a, b) => b.userId - a.userId)
    }else {
      this.tasks.sort( (a, b) => a.userId - b.userId)
    }
    this.stream$.next(this.tasks)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

  sortDate(): void {
    if(this.tasks[0].id.fullDate < this.tasks[this.tasks.length-1].id.fullDate){
      this.tasks.sort( (a, b)  => b.id.fullDate - a.id.fullDate)
    }else {
      this.tasks.sort( (a, b) => a.id.fullDate - b.id.fullDate)
    }
    this.stream$.next(this.tasks)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }
  sortCompleted(): void {
    if(this.tasks[0].completed < this.tasks[this.tasks.length-1].completed){
      this.tasks.sort((a, b) => Number(b.completed) - Number(a.completed))
    }else {
      this.tasks.sort((a, b) => Number(a.completed) - Number(b.completed))
    }
    this.stream$.next(this.tasks)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

}



