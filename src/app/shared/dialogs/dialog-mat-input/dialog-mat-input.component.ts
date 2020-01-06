import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';


interface DialogMatInputData {
  value: string;
  placeholder: string;
}

@Component({
  selector: 'app-dialog-mat-input',
  templateUrl: './dialog-mat-input.component.html',
  styleUrls: ['./dialog-mat-input.component.scss']
})
export class DialogMatInputComponent {

  inputFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogMatInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogMatInputData
  ) {
    this.inputFormGroup = this.formBuilder.group({
      value: ['', Validators.required],
    });

    this.inputFormGroup.get('value').setValue(data.value);
  }


  onSave() {
    this.dialogRef.close(this.inputFormGroup.get('value').value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
