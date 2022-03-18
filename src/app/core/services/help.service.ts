import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TaskAppearance } from './todos.service';

@Injectable({
  providedIn: 'root',
})
export class HelpService {
  constructor(private router: Router) {}

  sleep(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  remove(arr: Array<TaskAppearance>, indexes: number): Array<TaskAppearance> {
    let arrayOfIndexes = [].slice.call(arguments, 1);
    return arr.filter((item, index) => arrayOfIndexes.indexOf(index) == -1);
  }

  filterValues(
    name: string,
    arr: Array<TaskAppearance>
  ): Array<TaskAppearance> {
    return arr.filter(
      (data) => data.title.toLowerCase().indexOf(name.toLowerCase()) > -1
    );
  }

  dowload(): void {
    if (localStorage.getItem('isUserFirstTime') === '1') {
      localStorage.setItem('isUserFirstTime', '0');
    }
  }
}
