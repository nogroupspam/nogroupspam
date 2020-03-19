import { Component, ChangeDetectorRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Dialogs } from "./shared/dialogs/dialogs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "No Group Spam";
  fillerNav = ["Crear Mensaje"];

  constructor(public dialog: MatDialog) {
    Dialogs.setDialog(this.dialog);
  }
}
