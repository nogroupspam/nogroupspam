import { Injectable } from '@angular/core';
import { LocalDate } from './model/localdate';

@Injectable({
  providedIn: 'root'
})
export class DateUtils {
  /**
   * Return the actual date in localDate format.
   */
  public currentDate(): LocalDate {
    return this.convertDate(new Date());
  }

  public currentDateChangeAtSpainHour(hour: number): LocalDate {
    const timeZone = new Date().toLocaleString('en-US', {timeZone: 'Europe/Madrid'});
    const date = new Date(timeZone);
    if (date.getHours() < hour) {
      date.setDate(date.getDate() - 1);
    }
    return this.convertDate(date);
  }

  /**
   * Convert a date into localDate
   *
   * @param date date to convert
   */
  public convertDate(date: Date): LocalDate {
    return {
      day: date.getDate(),
      dayName: this.getDayName(date.getDay()),
      month: date.getMonth() + 1,
      monthName: this.getMonthName(date.getMonth()),
      year: date.getFullYear(),
    };
  }

  /**
   * Convert a string date into a localDate
   *
   * @param date String Date to convert
   */
  public convertStringDate(date: string): LocalDate {
    return this.convertDate(new Date(date));
  }

  /**
   * Convert LocalDate class into Date
   *
   * @param date localDate class to convert into Date
   */
  public convertLocalDate(date: LocalDate): Date {
    const time: string = '' + date.month + '/' + date.day + '/' + date.year;
    return new Date(time);
  }

  /**
   * Obtain the name for the dayOftheWeek number
   *
   * @param day number of the week
   */
  public getDayName(day: number): string {
    switch (day) {
      case 0:
        return 'Domingo';
      case 1:
        return 'Lunes';
      case 2:
        return 'Martes';
      case 3:
        return 'Miercoles';
      case 4:
        return 'Jueves';
      case 5:
        return 'Viernes';
      case 6:
        return 'Sabado';
    }
    return '';
  }

  /**
   * Obtain the name for the month number
   *
   * @param day number of the month
   */
  public getMonthName(day: number): string {
    switch (day) {
      case 0:
        return 'Enero';
      case 1:
        return 'Febrero';
      case 2:
        return 'Marzo';
      case 3:
        return 'Abril';
      case 4:
        return 'Mayo';
      case 5:
        return 'Junio';
      case 6:
        return 'Julio';
      case 7:
        return 'Agosto';
      case 8:
        return 'Septiembre';
      case 9:
        return 'Octubre';
      case 10:
        return 'Noviembre';
      case 11:
        return 'Diciembre';
    }
    return '';
  }

  public showDate(dateInput: (LocalDate | string)): string {
    let date: LocalDate;
    if (typeof dateInput === 'string') {
      if (dateInput.indexOf('/') === -1) {
        dateInput = [dateInput.slice(0, 4), '/', dateInput.slice(4, 6), '/', dateInput.slice(6)].join('');
      }
      date = this.convertStringDate(dateInput);
    } else {
      date = dateInput as LocalDate;
    }
    let result = '' + date.dayName + ' ';
    if (date.day < 10) {
      result += '0' + date.day + '/';
    } else {
      result += date.day + '/';
    }
    if (date.month < 10) {
      result += '0' + date.month;
    } else {
      result += date.month;
    }
    result += '/' + date.year.toString().slice(2,4);
    return result;
  }
}
