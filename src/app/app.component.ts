import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HelpService} from "./services/help.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private help: HelpService){
  }
  ngOnInit(): void {
    this.help.dowload()
  }
}
