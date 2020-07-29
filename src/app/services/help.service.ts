import { Injectable } from '@angular/core';
import { Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor(private router: Router) { }

  sleep = function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  remove= function (arr, indexes) {
    var arrayOfIndexes = [].slice.call(arguments, 1);  // (1)
    return arr.filter(function (item, index) {         // (2)
      return arrayOfIndexes.indexOf(index) == -1;      // (3)
    });
  }

  filterValues =  function(name, arr) {
    return arr.filter(data => {
      return data.title.toLowerCase().indexOf(name.toLowerCase()) > -1;
    });
  };

  dowload(){
    if(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).autoEntrance ){
      this.router.navigate(['/todos'])
    }else{
      this.router.navigate(['/entry'])
    }
  }

}
