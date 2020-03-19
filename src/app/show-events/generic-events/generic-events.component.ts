import { Component, OnInit } from "@angular/core";
import { GenericEventsDetailComponent } from "./generic-event/generic-event-detail/generic-events-detail.component";
import { MatDialog } from "@angular/material/dialog";
import { FirebaseBOService } from "../../firebase/valenciaybuenrollo/shared/firebase-bo.service";
import { LocalDate } from "../../shared/localdate/model/localdate";
import { DateUtils } from "../../shared/localdate/date-utils";
import { take } from "rxjs/operators";
import { Dialogs } from "../../shared/dialogs/dialogs";
import { Event } from "../../shared/models/events/event/event";

@Component({
  selector: "app-generic-events",
  templateUrl: "./generic-events.component.html",
  styleUrls: ["./generic-events.component.scss"]
})
export class GenericEventsComponent implements OnInit {
  selectedEvent: Event;
  index = "0";

  constructor(
    private firebase: FirebaseBOService,
    private details: MatDialog
  ) {}

  ngOnInit() {}

  length(object: object): number {
    if (object) {
      return Object.keys(object).length;
    } else {
      return 0;
    }
  }

  showDate(date: LocalDate): string {
    return new DateUtils().showDate(date);
  }

  openDetails(event: Event): void {
    this.selectedEvent = event;
    // eventAux = Object.assign({}, this.selectedEvent)
    const detailsRef = this.details.open(GenericEventsDetailComponent, {
      width: "90%",
      data: Object.assign({}, this.selectedEvent)
      // data: this.selectedEvent
    });

    detailsRef
      .afterClosed()
      .subscribe()
      .unsubscribe();
  }
}
