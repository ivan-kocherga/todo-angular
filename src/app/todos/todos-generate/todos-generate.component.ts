import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HelpService} from "../../services/help.service";
import {TaskAppearance, TodosService} from "../../services/todos.service";
import {DateService} from "../../services/date.service";

@Component({
  selector: 'app-todos-generate',
  templateUrl: './todos-generate.component.html',
  styleUrls: ['./todos-generate.component.css']
})
export class TodosGenerateComponent implements OnInit {

  @ViewChild('input') input: ElementRef

  constructor(private help: HelpService,private todos: TodosService, private date: DateService) { }

  ngOnInit(): void {
  }

  async generateTask(): Promise<void>{
    if(this.input.nativeElement.value.trim()){
      const newElem: TaskAppearance = {
        userId: 1,
        id: this.date.dateGenerate(new Date()),
        title: this.input.nativeElement.value,
        completed: false,
        basick : false
      }
      this.input.nativeElement.value = ''
      this.todos.createTask(newElem)
    }else{
      this.input.nativeElement.style.border = '1px red solid'
      await this.help.sleep(1000)
      this.input.nativeElement.style.border = ''
    }
  }

}
