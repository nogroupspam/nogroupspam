import { NgModule } from '@angular/core';
import { DialogMatChipListComponent } from './dialog-mat-chip-list/dialog-mat-chip-list.component';
import { DialogMatInputComponent } from './dialog-mat-input/dialog-mat-input.component';
import { DialogVerificateActionComponent } from './dialog-verificate-action/dialog-verificate-action.component';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';
import { DialogErrorReloadComponent } from './dialog-error-reload/dialog-error-reload.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material-module';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
  declarations: [
    DialogMatChipListComponent,
    DialogMatInputComponent,
    DialogVerificateActionComponent,
    DialogInfoComponent,
    DialogErrorReloadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  entryComponents: [
    DialogMatChipListComponent,
    DialogMatInputComponent,
    DialogVerificateActionComponent,
    DialogInfoComponent,
    DialogErrorReloadComponent
  ]
})
export class DialogsModule { }
