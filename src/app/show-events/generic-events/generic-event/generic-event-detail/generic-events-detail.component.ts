import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Dialogs } from "../../../../shared/dialogs/dialogs";
import { FirebaseBOService } from "../../../../firebase/valenciaybuenrollo/shared/firebase-bo.service";
import { Event } from "../../../../shared/models/events/event/event";
import { ParticipantTypes } from "../../../../shared/models/types/events/participants/participants-types";

@Component({
  selector: "app-generic-events-detail",
  templateUrl: "./generic-events-detail.component.html",
  styleUrls: ["./generic-events-detail.component.scss"]
})
export class GenericEventsDetailComponent {
  enrolledKeys: string[] = [];
  reservesKeys: string[] = [];
  maybeKeys: string[] = [];
  promoteReserve = false;
  limit = 0;
  participantsType = new ParticipantTypes();

  constructor(
    private firebase: FirebaseBOService,
    private router: Router,
    public dialogRef: MatDialogRef<GenericEventsDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public event: Event
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  editGenericEvent(): void {
    this.dialogRef.close();
    this.router.navigate(["editarevento/generico", JSON.stringify(this.event)]);
  }

  length(object: object): number {
    if (object) {
      return Object.keys(object).length;
    } else {
      return 0;
    }
  }

  getKeys(object: object): string[] {
    if (object) {
      return Object.keys(object);
    } else {
      return [] as string[];
    }
  }
}
