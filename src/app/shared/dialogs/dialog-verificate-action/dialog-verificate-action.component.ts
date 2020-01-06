import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-verificate-action',
  templateUrl: './dialog-verificate-action.component.html',
  styleUrls: ['./dialog-verificate-action.component.scss']
})
export class DialogVerificateActionComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogVerificateActionComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) { }


  onSave() {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
