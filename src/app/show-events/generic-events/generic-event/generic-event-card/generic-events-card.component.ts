import { Component, OnInit, Input } from "@angular/core";
import { GenericEventsDetailComponent } from "../generic-event-detail/generic-events-detail.component";
import { MatDialog } from "@angular/material/dialog";
import { FirebaseBOService } from "../../../../firebase/valenciaybuenrollo/shared/firebase-bo.service";
import { ViewChild, ElementRef } from "@angular/core";
import { LocalDate } from "../../../../shared/localdate/model/localdate";
import { DateUtils } from "../../../../shared/localdate/date-utils";
import { environment } from "../../../../../environments/environment";
import { Dialogs } from "../../../../shared/dialogs/dialogs";
import { Event } from "../../../../shared/models/events/event/event";

import * as Firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

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

  isRetrievingData = false;

  @ViewChild("message", { static: false }) textAreaMessage: ElementRef;

  constructor(
    private firebase: FirebaseBOService,
    private details: MatDialog
  ) {}

  ngOnInit() {
    if (Firebase.apps.length === 0) {
      Firebase.initializeApp(environment.firebase);
    }
    const database = Firebase.database();
    Firebase.auth().signInAnonymously();
    this.initializeReading(database);
  }

  initializeReading(database) {
    let dataRead = database.ref(
      "tests/events/generic/" + this.event.id + "/message"
    );
    dataRead.on("value", async snapshot => {
      this.isRetrievingData = true;
      let uid = await database
        .ref("tests/events/generic/" + this.event.id + "/uid")
        .once("value");

      if (Firebase.auth().currentUser.uid !== uid.val()) {
        this.event.info.message = snapshot.val();
        this.textAreaMessage.nativeElement.value = this.event.info.message;
      }
      setTimeout(_ => { this.isRetrievingData = false; }, 1500);
    });
  }

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
      message,
      'message'
    );
    if (response) {
      this.communicationParticipantWithFireBase(response);
      const uidChange = this.firebase.events.generic.update.event(
        this.event.id,
        Firebase.auth().currentUser.uid,
        'uid'
      );
      uidChange.subscribe();
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

    const appGenericUrl = environment.appUrlBase + "%23/mensajes/";

    const whatsappUrl = "https://api.whatsapp.com/send?l=es&text=";
    const endline = "%0a";
    const sharedLink = appGenericUrl + this.event.id;
    const texto =
      "*" +
      this.event.info.name +
      "*" +
      endline +
      endline +
      "Accede para ver y editar el mensaje!" +
      endline +
      endline +
      sharedLink;

    window.open(whatsappUrl + texto);
  }
}
