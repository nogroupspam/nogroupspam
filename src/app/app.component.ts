import { Component, ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { Dialogs } from './shared/dialogs/dialogs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Valencia y buen rollo';
  fillerNav = ['Eventos', 'Crear Evento'];

  constructor(public dialog: MatDialog) {
    Dialogs.setDialog(this.dialog);
  }
}
