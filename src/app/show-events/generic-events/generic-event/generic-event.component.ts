import { Component, OnInit } from "@angular/core";
import { STATE } from "../../../app-state";
import { FirebaseBOService } from "../../../firebase/valenciaybuenrollo/shared/firebase-bo.service";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs/operators";
import { EventInfo, Event } from "../../../shared/models/events/event/event";
import { Dialogs } from "../../../shared/dialogs/dialogs";

@Component({
  selector: "app-generic-event",
  templateUrl: "./generic-event.component.html",
  styleUrls: ["./generic-event.component.scss"]
})
export class GenericEventComponent implements OnInit {
  event: Event;
  id: string;

  constructor(
    // private route: ActivatedRouteSnapshot,
    private routeActivated: ActivatedRoute,
    private firebase: FirebaseBOService
  ) {
    const args = STATE.getArgs();
    if (args) {
      this.event = args.event;
    }
  }

  ngOnInit() {
    if (!this.event) {
      if (this.routeActivated.snapshot.paramMap.has("id")) {
        this.id = this.routeActivated.snapshot.params.id;
        this.firebase.events.generic.get
          .event(this.id)
          .pipe(take(1))
          .subscribe({
            next: (x: EventInfo) => {
              if (x) {
                this.event = { id: this.id, info: x };
                console.log(this.event);
              } else {
                Dialogs.showError(
                  "El evento que buscas ya no existe.",
                  "/eventos"
                );
              }
            }
          });
      }
    }
  }
}
