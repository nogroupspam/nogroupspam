import { Component, OnInit, Input } from '@angular/core';
import { GenericEventsDetailComponent } from '../generic-event-detail/generic-events-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseBOService } from '../../../../firebase/valenciaybuenrollo/shared/firebase-bo.service';
import { Observable } from 'rxjs';
import { LocalDate } from '../../../../shared/localdate/model/localdate';
import { DateUtils } from '../../../../shared/localdate/date-utils';
import { environment } from '../../../../../environments/environment';
import { Dialogs } from '../../../../shared/dialogs/dialogs';
import { GenericEvent } from '../../../../shared/models/events/event/generic/genericEvent';

@Component({
  selector: 'app-generic-events-card',
  templateUrl: './generic-events-card.component.html',
  styleUrls: ['./generic-events-card.component.scss']
})
export class GenericEventsCardComponent implements OnInit {
  @Input()
  idDay: string;
  @Input()
  event: GenericEvent;

  constructor(
    private firebase: FirebaseBOService,
    private details: MatDialog,
  ) { }

  ngOnInit() {
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
      width: '90%',
      data: Object.assign({}, this.event)
    });

    detailsRef.afterClosed().subscribe().unsubscribe();
  }

  enroll(): void {
    let freePlaces = -1;
    if (this.event.info.limit) {
      freePlaces = this.event.info.limit - this.length(this.event.info.enrolled);
    }
    this.addParticipant(freePlaces, 'enrolled');
  }

  reserve(): void {
    this.addParticipant(-1, 'reserves');
  }

  maybe(): void {
    this.addParticipant(-1, 'maybe');
  }

  private addParticipant(limit: number, type: string) {
    Dialogs.matChipList(limit, type).subscribe(result => {
      if ( result && result.length > 0 ) {
        const comunication = this.firebase.events.generic.add.participants(this.event, result, type);
        if (comunication) {
          this.communicationParticipantWithFireBase(comunication, type);
        }
      }
    });
  }

  private communicationParticipantWithFireBase(comunication: any, type: string) {
    const errorMessage = 'No ha sido posible realizar tu petición. Esto puede ser debido a:\n\n' +
                         ' · Problemas de conexión con la base de datos.\n' +
                         ' · Porque los datos sobre la quedada han sido modificados por otro participante.\n\n' +
                         'Recarga la página y vuelve a intentarlo.';
    comunication.subscribe({
      next: (x: any) => {
        this.firebase.events.generic.get.participants(this.event, type).subscribe({
          next: (result: any) => {
            this.event.info[type] = result;
          },
          error: (err: any) => {
            Dialogs.showError(errorMessage, 'eventos/' + this.event.id);
          }
        });
      },
      error: (err: any) => {
        Dialogs.showError(errorMessage, 'eventos/' + this.event.id);
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

    const appGenericUrl = environment.appUrlBase + '%23/eventos/';

    const whatsappUrl = 'https://api.whatsapp.com/send?l=es&text=';
    const endline = '%0a';
    const sharedLink = appGenericUrl + this.idDay + '/' + this.event.id;
    const texto = '*' + this.showDate(this.event.info.date) + '*' + endline +
                  this.event.info.name + endline +
                  this.event.info.place + ' a las ' + this.event.info.time + endline +
                  sharedLink;

    window.open(whatsappUrl + texto);
  }
}
