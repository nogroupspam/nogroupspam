import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-dialog-mat-chip-list',
  templateUrl: './dialog-mat-chip-list.component.html',
  styleUrls: ['./dialog-mat-chip-list.component.scss']
})
export class DialogMatChipListComponent {
  // Participants
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  enrolled: string[] = [];
  errorsInLimit = false;
  selectable = true;
  removable = true;
  addOnBlur = true;

  constructor(
    public dialogRef: MatDialogRef<DialogMatChipListComponent>,
    @Inject(MAT_DIALOG_DATA) public limit: number
  ) { }

  onSave() {
    this.dialogRef.close(this.enrolled);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addParticipant(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (this.limit) {
      if ( this.limit < 0 || this.enrolled.length < (this.limit) ) {
        // Add our participant
        if ((value || '').trim()) {
          this.enrolled.push(value.trim());
        }
      } else {
        this.errorsInLimit = true;
      }
    } else {
      // Add our participant
      if ((value || '').trim()) {
        this.enrolled.push(value.trim());
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeParticipant(participant: string): void {
    const index = this.enrolled.indexOf(participant);
    if (index >= 0) {
      this.enrolled.splice(index, 1);
    }
    this.errorsInLimit = false;
  }
}
