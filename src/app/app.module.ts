import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryComponent } from './entry/entry.component';
import { TodosComponent } from './todos/todos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceModule } from './core/services/service/service.module';
import { RegisterComponent } from './entry/register/register.component';
import { LoginComponent } from './entry/login/login.component';
import { TodosListComponent } from './todos/todos-list/todos-list.component';
import { TodosGenerateComponent } from './todos/todos-generate/todos-generate.component';
import { TodosSortSearchComponent } from './todos/todos-sort-search/todos-sort-search.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    TodosComponent,
    RegisterComponent,
    LoginComponent,
    TodosListComponent,
    TodosGenerateComponent,
    TodosSortSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ServiceModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
