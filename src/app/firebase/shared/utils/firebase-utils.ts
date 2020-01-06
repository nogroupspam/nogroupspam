import { Injectable } from '@angular/core';
import { LocalDate } from '../../../shared/localdate/model/localdate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseUtils {
  constructor( ) { }

  public generateIdByDate(date: LocalDate): number {
    let id = '' + date.year;
    if (date.month < 10) {
      id += '0' + date.month;
    } else {
      id += date.month;
    }
    if (date.day < 10) {
      id += '0' + date.day;
    } else {
      id += date.day;
    }
    return parseInt(id, 10);
  }

  public checkEventinTime(day: string, currentDate: number): boolean {
    let result = false;
    const daysToEvent = parseInt(day, 10) - currentDate;
    console.log('Resultado de fecha: ' + currentDate);
    if (daysToEvent >= 0) {
      result = true;
    }
    return result;
  }
}
