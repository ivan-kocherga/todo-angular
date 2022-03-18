import { Component, OnInit } from '@angular/core';
import { TaskAppearance, TodosService } from '../core/services/todos.service';
import { HelpService } from '../core/services/help.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  realTime: Date = new Date();
  tasks: TaskAppearance[];
  loadData: boolean = true;

  searchTasks: Array<TaskAppearance> = [];
  valueSearchInput: string = '';

  constructor(private todo: TodosService, private help: HelpService) {}

  ngOnInit(): void {
    setInterval(() => (this.realTime = new Date()), 1000);
    this.todo.returnStream().subscribe((v: TaskAppearance[]) => {
      this.loadData = false;
      this.tasks = v;
    });
    this.todo.returnSearch().subscribe((v: string) => {
      this.valueSearchInput = v;
      this.searchTasks = this.help.filterValues(v, this.tasks);
    });
  }
}
