import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable, timer } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { startWith, map } from "rxjs/operators";
import { Place, Places } from "../../shared/models/places";
import { FirebaseBOService } from "../../firebase/valenciaybuenrollo/shared/firebase-bo.service";
import { Icons } from "../../shared/models/icons";
import { DateUtils } from "../../shared/localdate/date-utils";
import { LocalDate } from "../../shared/localdate/model/localdate";
import { Dialogs } from "../../shared/dialogs/dialogs";
import { Event, EventInfo } from "../../shared/models/events/event/event";

@Component({
  selector: "app-create-generic-event",
  templateUrl: "./create-generic-event.component.html",
  styleUrls: ["./create-generic-event.component.scss"]
})
export class CreateGenericEventComponent implements OnInit {
  // Edit event
  editingGenericEvent: Event;
  editEvent = false;
  editingEvent = false;

  // Form Groups
  isLinear = true;
  informationFormGroup: FormGroup;

  constructor(
    private router: Router,
    private routeActivated: ActivatedRoute,
    private formGameBuilder: FormBuilder,
    private firebaseApi: FirebaseBOService
  ) {}

  ngOnInit() {
    // FormGoups
    this.informationFormGroup = this.formGameBuilder.group({
      eventName: ["", Validators.required],
      message: ["", Validators.required]
    });

    /** *
     * Map data for edit event.
     */
    if (this.routeActivated.snapshot.paramMap.has("event")) {
      this.editingGenericEvent = JSON.parse(
        this.routeActivated.snapshot.params.event
      );
    }
    if (this.editingGenericEvent) {
      this.editEvent = true;
      console.log(this.editingGenericEvent);
      this.informationFormGroup
        .get("message")
        .setValue(this.editingGenericEvent.info.message);
      this.informationFormGroup
        .get("eventName")
        .setValue(this.editingGenericEvent.info.name);
    } else {
      console.log("No hago nada, no estoy editando.");
    }
  }

  public checkNumber(e: KeyboardEvent) {
    const validNumbers: string[] = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9"
    ];
    const validKeys: string[] = [
      "Delete",
      "Backspace",
      "Tab",
      "Enter",
      "Escape",
      "Home",
      "End",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown"
    ];
    const validCommands: string[] = ["KeyC", "KeyX", "KeyA"]; // this are codes not keys. No paste 'KeyV'

    // Ensure that it is a number or validKey or validCommand and stop the keypress
    if (
      validNumbers.indexOf(e.key) === -1 &&
      validKeys.indexOf(e.key) === -1 &&
      (!(e.ctrlKey === true || e.metaKey === true) ||
        validCommands.indexOf(e.code) === -1) // meta is Cmd (Mac)
    ) {
      e.preventDefault();
    }
  }

  advance2steps(stepper: MatStepper) {
    stepper.next();
    stepper.next();
  }

  createEvent() {
    const eventInfo: EventInfo = {
      name: this.informationFormGroup.get("eventName").value,
      message: this.informationFormGroup.get("message").value,
      status: true
    };
    const id = this.generateIdFromName(eventInfo.name);
    const event: Event = {
      id: id,
      info: eventInfo
    };
    this.firebaseApi.events.generic.add.event(event).subscribe({
      next: x => {
        this.router.navigate(["mensajes/" + x.id]);
      },
      error: err => {
        Dialogs.showError("La conexión con la base de datos ha fallado.", "");
      }
    });
  }

  generateIdFromName(name: string): string {
    name = name.replace(/[^a-zA-Z]/g, "");
    const id = name + Math.floor(Math.random() * (9999 - 10 + 1) + 10);
    return id.toLowerCase();
  }

  public statusEvent(status: boolean) {
    this.firebaseApi.events.generic.update
      .status(status, this.editingGenericEvent.id)
      .subscribe({
        next: (x: any) => {
          this.router.navigate([
            "eventos/" + x.id + "/" + this.editingGenericEvent.id
          ]);
        },
        error: (err: any) => {
          Dialogs.showError("La conexión con la base de datos ha fallado.", "");
        }
      });
  }

  public updateEvent() {
    const event: EventInfo = {
      name: this.informationFormGroup.get("eventName").value,
      message: this.informationFormGroup.get("message").value,
      status: true
    };
    this.firebaseApi.events.generic.update
      .event(this.editingGenericEvent.id, event.message)
      .subscribe({
        next: (x: any) => {
          this.router.navigate([
            "eventos/" + x.id + "/" + this.editingGenericEvent.id
          ]);
        },
        error: (err: any) => {
          Dialogs.showError("La conexión con la base de datos ha fallado.", "");
        }
      });
  }

  public editingEventStart(stepper: MatStepper) {
    this.editingEvent = true;
    timer(1000).subscribe({
      complete: () => {
        stepper.next();
      }
    });
  }
}
