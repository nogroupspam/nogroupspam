import { Injectable } from "@angular/core";
import { LocalDate } from "../../../shared/localdate/model/localdate";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class FirebaseUtils {
  constructor() {}

  public generateIdByName(name: string): string {
    name = name.replace(/[^a-zA-Z]/g, "");
    let id = name + Math.floor(Math.random() * (100 - 10)) + 10;

    return id;
  }

  public checkEventinTime(day: string, currentDate: number): boolean {
    let result = false;
    const daysToEvent = parseInt(day, 10) - currentDate;
    console.log("Resultado de fecha: " + currentDate);
    if (daysToEvent >= 0) {
      result = true;
    }
    return result;
  }
}
