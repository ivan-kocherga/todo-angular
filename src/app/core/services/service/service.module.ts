import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateService } from '../date.service';
import { TodosService } from '../todos.service';
import { HelpService } from '../help.service';
import { EntryService } from '../entry.service';
import { IsAuthGuard } from '../is-auth.guard';
import { IsNotAuthGuard } from '../is-not-auth.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    DateService,
    TodosService,
    HelpService,
    EntryService,
    IsAuthGuard,
    IsNotAuthGuard,
  ],
})
export class ServiceModule {}
