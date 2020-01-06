import { MatDialog } from '@angular/material/dialog';
import { DialogErrorReloadComponent } from './dialog-error-reload/dialog-error-reload.component';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';
import { DialogMatChipListComponent } from './dialog-mat-chip-list/dialog-mat-chip-list.component';
import { Observable } from 'rxjs';
import { DialogMatInputComponent } from './dialog-mat-input/dialog-mat-input.component';
import { DialogVerificateActionComponent } from './dialog-verificate-action/dialog-verificate-action.component';

export class Dialogs {
  private static dialog: MatDialog;

  public static setDialog(dialog: MatDialog) {
    this.dialog = dialog;
  }

  public static showError(message: string, navigateTo: string): void {
    const errorRef = this.dialog.open(DialogErrorReloadComponent, {
      width: '90%',
      data: {
        message,
        navigateTo
      }
    });

    errorRef.afterClosed().subscribe().unsubscribe();
  }

  public static showInfo(message: string): void {
    const errorRef = this.dialog.open(DialogInfoComponent, {
      width: '90%',
      data: message
    });

    errorRef.afterClosed().subscribe().unsubscribe();
  }

  public static matChipList(limit: number, type: string): Observable<any> {
    const detailsAddParticipant = this.dialog.open(DialogMatChipListComponent, {
      width: '90%',
      data: limit
    });
    return detailsAddParticipant.afterClosed();
  }

  public static matInput(key: string, value: string, type: string, placeholder: string): Observable<any> {
    const detailsAddParticipant = this.dialog.open(DialogMatInputComponent, {
      width: '90%',
      data: {
        value,
        placeholder
      }
    });
    return detailsAddParticipant.afterClosed();
  }

  public static verificateAction(type: string, key: string, text: string): Observable<any> {
    const detailsDeleteParticipant = this.dialog.open(DialogVerificateActionComponent, {
      width: '90%',
      data: text
    });
    return detailsDeleteParticipant.afterClosed();
  }
}
