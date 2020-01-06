import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss']
})
export class DialogInfoComponent {

  justify = false;

  constructor(
    public dialogRef: MatDialogRef<DialogInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {
      if (message.indexOf('\n') !== -1) {
        this.justify = true;
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
