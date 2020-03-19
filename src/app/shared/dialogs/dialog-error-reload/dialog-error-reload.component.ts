import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";

interface DialogMatInputData {
  message: string;
  navigateTo: string;
}

@Component({
  selector: "app-dialog-error-reload",
  templateUrl: "./dialog-error-reload.component.html",
  styleUrls: ["./dialog-error-reload.component.scss"]
})
export class DialogErrorReloadComponent {
  justify = false;

  constructor(
    public dialogRef: MatDialogRef<DialogErrorReloadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogMatInputData
  ) {
    if (data.message.indexOf("\n") !== -1) {
      this.justify = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
