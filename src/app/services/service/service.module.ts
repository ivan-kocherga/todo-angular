import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DateService} from "../date.service";
import {TodosService} from "../todos.service";
import {HelpService} from "../help.service";
import {EntryService} from "../entry.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    DateService,
    TodosService,
    HelpService,
    EntryService
  ]
})
export class ServiceModule { }
