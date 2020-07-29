import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EntryComponent} from "./entry/entry.component";
import {TodosComponent} from "./todos/todos.component";
import {AppComponent} from "./app.component";


const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'todos', component: TodosComponent},
  {path: 'entry', component: EntryComponent},
  {path: '**', redirectTo: '/'}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
