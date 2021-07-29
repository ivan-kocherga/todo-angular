import { Injectable } from '@angular/core';

export interface IData {
  year: number,
  month: number | string,
  day: number | string,
  hour: number | string,
  minute: number | string,
  second: number | string,
  milisecond: number,
  fullDate: number
}

@Injectable({
  providedIn: 'root'
})

export class DateService {

  constructor() { }

  dateGenerate (a: Date): IData {
    let year = a.getFullYear();
    let month = a.getMonth() + 1;
    let day = a.getDate()
    let hour = a.getHours()
    let minute = a.getMinutes()
    let second = a.getSeconds()
    let milisecond = a.getMilliseconds()

    let date: IData = {
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
      second: second,
      milisecond: milisecond,
      fullDate: Number(`${year}${month}${day}${hour}${minute}${second}${milisecond}`)
    }

    for(let i in date){
      if (date[i] < 10) {
        date[i] = '0' + date[i];
      }
    }

    return date
  }
}
