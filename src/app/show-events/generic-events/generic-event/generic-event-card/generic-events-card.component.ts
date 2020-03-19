import { Component, OnInit, Input } from "@angular/core";
import { GenericEventsDetailComponent } from "../generic-event-detail/generic-events-detail.component";
import { MatDialog } from "@angular/material/dialog";
import { FirebaseBOService } from "../../../../firebase/valenciaybuenrollo/shared/firebase-bo.service";
import { Observable } from "rxjs";
import { LocalDate } from "../../../../shared/localdate/model/localdate";
import { DateUtils } from "../../../../shared/localdate/date-utils";
import { environment } from "../../../../../environments/environment";
import { Dialogs } from "../../../../shared/dialogs/dialogs";
import { Event } from "../../../../shared/models/events/event/event";

@Component({
  selector: "app-generic-events-card",
  templateUrl: "./generic-events-card.component.html",
  styleUrls: ["./generic-events-card.component.scss"]
})
export class GenericEventsCardComponent implements OnInit {
  @Input()
  idDay: string;
  @Input()
  event: Event;

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

  openDetails(): void {
    const detailsRef = this.details.open(GenericEventsDetailComponent, {
      width: "90%",
      data: Object.assign({}, this.event)
    });

    detailsRef
      .afterClosed()
      .subscribe()
      .unsubscribe();
  }

  saveMessage(message) {
    const response = this.firebase.events.generic.update.event(
      this.event.id,
      message
    );
    if (response) {
      this.communicationParticipantWithFireBase(response);
    }
  }

  private communicationParticipantWithFireBase(comunication: any) {
    const errorMessage =
      "No ha sido posible realizar tu petición. Esto puede ser debido a:\n\n" +
      " 1) Problemas de conexión con la base de datos.\n\n" +
      "Recarga la página y vuelve a intentarlo.";
    comunication.subscribe({
      next: (x: any) => {
        this.firebase.events.generic.get.event(this.event.id).subscribe({
          next: (result: any) => {
            this.event.info.message = result.message;
          },
          error: (err: any) => {
            Dialogs.showError(errorMessage, "mensajes/" + this.event.id);
          }
        });
      },
      error: (err: any) => {
        Dialogs.showError(errorMessage, "mensajes/" + this.event.id);
      }
    });
  }

  // TODO: Extrat to utils
  public whatsappShare() {
    /**************************************************************************/
    /* UTIL DE CARACTERES: https://www.degraeve.com/reference/urlencoding.php */
    /**************************************************************************/

    // https://api.whatsapp.com/send?l=es&phone=34696511967&text=Hola%20quiero%20info
    // https://api.whatsapp.com/send?l=es&text=Hola%20quiero%20info

    const appGenericUrl = environment.appUrlBase + "%23/eventos/";

    const whatsappUrl = "https://api.whatsapp.com/send?l=es&text=";
    const endline = "%0a";
    const sharedLink = appGenericUrl + this.idDay + "/" + this.event.id;
    const texto =
      "*" +
      this.event.info.name +
      "*" +
      endline +
      this.event.info.message +
      endline +
      sharedLink;

    window.open(whatsappUrl + texto);
  }
}
