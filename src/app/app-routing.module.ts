import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EntryComponent} from "./entry/entry.component";
import {TodosComponent} from "./todos/todos.component";
import {IsAuthGuard} from "./services/is-auth.guard";
import {IsNotAuthGuard} from "./services/is-not-auth.guard";


const routes: Routes = [
  {path: '', component: TodosComponent, canActivate: [IsAuthGuard]},
  {path: 'entry', component: EntryComponent, canActivate: [IsNotAuthGuard]},
  {path: '**', redirectTo: '/'}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
