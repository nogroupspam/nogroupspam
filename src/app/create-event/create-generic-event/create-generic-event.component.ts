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
import {
  GenericEvent,
  GenericEventInfo
} from "../../shared/models/events/event/generic/genericEvent";

@Component({
  selector: "app-create-generic-event",
  templateUrl: "./create-generic-event.component.html",
  styleUrls: ["./create-generic-event.component.scss"]
})
export class CreateGenericEventComponent implements OnInit {
  // Edit event
  editingGenericEvent: GenericEvent;
  editEvent = false;
  editingEvent = false;

  // Form Groups
  isLinear = true;
  selectDateFormGroup: FormGroup;
  searchGameFormGroup: FormGroup;
  informationFormGroup: FormGroup;
  imageFormGroup: FormGroup;
  participantsFormGroup: FormGroup;

  // Date
  minDate = new Date();

  // Places
  places: Place[] = Places.getAllPlaces();
  filteredPlaces: Observable<Place[]>;
  selectedPlace: Place = {} as Place;

  // Image
  selectedImage = "";
  selectedImageThumbnail = "";
  imageUrlHidden = false;

  // Participants
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  enrolled: string[] = [];
  limit = 0;
  errorsInLimit = false;
  selectable = true;
  removable = true;
  addOnBlur = true;

  constructor(
    private router: Router,
    private routeActivated: ActivatedRoute,
    private formGameBuilder: FormBuilder,
    private firebaseApi: FirebaseBOService
  ) {}

  ngOnInit() {
    // FormGoups
    this.selectDateFormGroup = this.formGameBuilder.group({
      date: ["", Validators.required],
      time: ["", Validators.required],
      timeEnd: [""]
    });
    this.searchGameFormGroup = this.formGameBuilder.group({
      searchName: [""]
    });
    this.informationFormGroup = this.formGameBuilder.group({
      eventName: ["", Validators.required],
      place: ["", Validators.required],
      limit: [""],
      description: [""]
    });
    this.imageFormGroup = this.formGameBuilder.group({
      imageType: [""],
      imageUrl: [""],
      imageUrlThumbnail: [""]
    });
    this.participantsFormGroup = this.formGameBuilder.group({
      organizer: ["", Validators.required]
    });

    this.filteredPlaces = this.informationFormGroup
      .get("place")
      .valueChanges.pipe(
        startWith(""),
        map(value => this.placesFilter(value))
      );

    this.informationFormGroup.get("limit").valueChanges.subscribe(result => {
      if (result === null || result === "") {
        this.limit = 0;
      } else {
        if (result < 0) {
          result = 0;
          this.informationFormGroup.get("limit").setValue(0);
        }
        this.limit = result;
      }
    });

    this.imageFormGroup.get("imageUrl").valueChanges.subscribe(result => {
      this.selectedImage = result;
    });

    this.imageFormGroup
      .get("imageUrlThumbnail")
      .valueChanges.subscribe(result => {
        this.selectedImageThumbnail = result;
      });

    this.imageFormGroup.get("imageType").valueChanges.subscribe(result => {
      switch (result) {
        case "edit":
          this.imageFormGroup.get("imageUrl").enable();
          this.imageFormGroup.get("imageUrl").setValue("");
          this.imageFormGroup.get("imageUrlThumbnail").setValue("");
          this.imageUrlHidden = false;
          break;
        case "logo":
          this.imageFormGroup.get("imageUrl").disable();
          this.imageFormGroup.get("imageUrl").setValue(Icons.logoGames);
          this.imageFormGroup
            .get("imageUrlThumbnail")
            .setValue(Icons.logoGamesThumbnail);
          this.imageUrlHidden = true;
          break;
        case "place":
          this.imageFormGroup.get("imageUrl").disable();
          this.imageFormGroup
            .get("imageUrl")
            .setValue(this.selectedPlace.image);
          this.imageFormGroup
            .get("imageUrlThumbnail")
            .setValue(this.selectedPlace.thumbnail);
          this.imageUrlHidden = true;
          break;
        case "before":
          this.imageFormGroup.get("imageUrl").disable();
          this.imageFormGroup
            .get("imageUrl")
            .setValue(this.editingGenericEvent.info.image);
          this.imageFormGroup
            .get("imageUrlThumbnail")
            .setValue(this.editingGenericEvent.info.thumbnail);
          this.imageUrlHidden = true;
      }
    });
    this.imageFormGroup.get("imageType").setValue("logo");

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
      const date: Date = new DateUtils().convertLocalDate(
        this.editingGenericEvent.info.date
      );
      this.selectDateFormGroup.get("date").setValue(date);
      this.selectDateFormGroup
        .get("time")
        .setValue(this.editingGenericEvent.info.time);
      this.selectDateFormGroup
        .get("timeEnd")
        .setValue(this.editingGenericEvent.info.timeEnd);
      this.informationFormGroup
        .get("eventName")
        .setValue(this.editingGenericEvent.info.name);
      this.informationFormGroup
        .get("place")
        .setValue(this.editingGenericEvent.info.place);
      this.places.forEach((place: Place) => {
        if (place.name === this.editingGenericEvent.info.place) {
          this.selectPlace(place);
        }
      });
      this.informationFormGroup
        .get("limit")
        .setValue(this.editingGenericEvent.info.limit);
      this.informationFormGroup
        .get("description")
        .setValue(this.editingGenericEvent.info.description);
      this.imageFormGroup.get("imageType").setValue("before");
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

  private placesFilter(value: string): Place[] {
    const filterValue = value.toLowerCase();

    return this.places.filter(option =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  selectPlace(place: Place) {
    this.selectedPlace = place;
    // console.log('SELECTING PLACE');
    // console.log(this.selectedGame);
    if (place && place.image !== "undefined") {
      // console.log('ENTRO EN CAMBIAR VALORES');
      this.imageFormGroup.get("imageUrl").setValue(place.image);
      this.imageFormGroup.get("imageType").setValue("place");
    }
  }

  addParticipant(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (this.limit) {
      if (this.limit > 0 && this.enrolled.length < this.limit - 1) {
        // Add our participant
        if ((value || "").trim()) {
          this.enrolled.push(value.trim());
        }
      } else {
        this.errorsInLimit = true;
      }
    } else {
      // Add our participant
      if ((value || "").trim()) {
        this.enrolled.push(value.trim());
      }
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  removeParticipant(participant: string): void {
    const index = this.enrolled.indexOf(participant);

    if (index >= 0) {
      this.enrolled.splice(index, 1);
    }
    this.errorsInLimit = false;
  }

  createEvent() {
    // const dateUtils: DateUtils = new DateUtils();
    const date: LocalDate = new DateUtils().convertStringDate(
      this.selectDateFormGroup.get("date").value
    );
    if (this.saveCheckLimits) {
      const participants: { [id: string]: string } = {};
      participants["--organizer"] = this.participantsFormGroup.get(
        "organizer"
      ).value;
      let i = 1;
      this.enrolled.forEach(participant => {
        participants["--p" + i] = participant;
        i++;
      });
      if (this.selectedImageThumbnail === "") {
        this.selectedImageThumbnail = this.imageFormGroup.get("imageUrl").value;
      }
      const event: GenericEventInfo = {
        date,
        time: this.selectDateFormGroup.get("time").value,
        timeEnd: this.selectDateFormGroup.get("timeEnd").value,
        name: this.informationFormGroup.get("eventName").value,
        image: this.selectedImage,
        thumbnail: this.selectedImageThumbnail,
        place: this.informationFormGroup.get("place").value,
        limit: this.limit,
        enrolled: participants,
        reserves: {},
        maybe: {},
        description: this.informationFormGroup.get("description").value,
        status: true
      };
      this.firebaseApi.events.generic.add.event(event).subscribe({
        next: x => {
          this.router.navigate(["eventos/" + x.id + "/" + x.info.name]);
        },
        error: err => {
          Dialogs.showError("La conexión con la base de datos ha fallado.", "");
        }
      });
    } else {
      Dialogs.showError("Limite incorrecto.", "");
    }
  }

  public statusEvent(status: boolean) {
    this.firebaseApi.events.generic.update
      .status(status, this.editingGenericEvent.info.date, this.editingGenericEvent.id)
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
    const date: LocalDate = new DateUtils().convertStringDate(
      this.selectDateFormGroup.get("date").value
    );
    if (this.selectedImageThumbnail === "") {
      this.selectedImageThumbnail = this.imageFormGroup.get("imageUrl").value;
    }
    const event: GenericEventInfo = {
      date,
      time: this.selectDateFormGroup.get("time").value,
      timeEnd: this.selectDateFormGroup.get("timeEnd").value,
      name: this.informationFormGroup.get("eventName").value,
      image: this.selectedImage,
      thumbnail: this.selectedImageThumbnail,
      place: this.informationFormGroup.get("place").value,
      limit: this.limit,
      description: this.informationFormGroup.get("description").value,
      status: true
    };
    this.firebaseApi.events.generic.update
      .event(this.editingGenericEvent.id, event, this.editingGenericEvent.info.date)
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

  private saveCheckLimits() {
    let checked = false;
    if (this.limit) {
      if (this.limit > 0 && this.enrolled.length < this.limit - 1) {
        checked = true;
      } else {
        this.errorsInLimit = true;
      }
    } else {
      checked = true;
    }
    return checked;
  }
}
