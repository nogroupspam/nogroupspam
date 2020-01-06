import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../material-module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";

// modules
import { CreateGenericEventComponent } from "./create-generic-event.component";

@NgModule({
  declarations: [CreateGenericEventComponent],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxMaterialTimepickerModule,
    HttpClientModule
  ],
  entryComponents: [CreateGenericEventComponent],
  exports: [CreateGenericEventComponent]
})
export class CreateGenericEventModule {}
