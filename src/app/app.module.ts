import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { MaterialModule } from "./material-module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// App Modules
import { CreateGenericEventModule } from "./create-event/create-generic-event/create-generic-event.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GenericEventsModule } from "./show-events/generic-events/generic-events.module";
import { DialogsModule } from "./shared/dialogs/dialogs.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    GenericEventsModule,
    CreateGenericEventModule,
    DialogsModule
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
