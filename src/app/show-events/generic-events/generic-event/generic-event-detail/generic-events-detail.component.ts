import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Dialogs } from '../../../../shared/dialogs/dialogs';
import { FirebaseBOService } from '../../../../firebase/valenciaybuenrollo/shared/firebase-bo.service';
import { GenericEvent } from '../../../../shared/models/events/event/generic/genericEvent';
import { ParticipantTypes } from '../../../../shared/models/types/events/participants/participants-types';


@Component({
  selector: 'app-generic-events-detail',
  templateUrl: './generic-events-detail.component.html',
  styleUrls: ['./generic-events-detail.component.scss']
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
    @Inject(MAT_DIALOG_DATA) public event: GenericEvent
  ) {
    if (event.info.enrolled) {
      this.enrolledKeys = this.getKeys(event.info.enrolled);
    }
    if (event.info.reserves) {
      this.reservesKeys = this.getKeys(event.info.reserves);
    }
    if (event.info.maybe) {
      this.maybeKeys = this.getKeys(event.info.maybe);
    }
    if (event.info.limit) {
      this.limit = event.info.limit;
    }
    this.promoteReserve = this.checkFreePlaces();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editGenericEvent(): void {
    this.dialogRef.close();
    this.router.navigate(['editarevento/generico', JSON.stringify(this.event)]);
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

  checkFreePlaces(): boolean {
    return this.limit <= 0 || this.enrolledKeys.length < this.limit;
  }

  editEnrolled(key: string, value: string) {
    this.editParticipant(key, value, this.participantsType.enrolled);
  }

  editReserves(key: string, value: string) {
    this.editParticipant(key, value, this.participantsType.reserves);
  }

  editMaybe(key: string, value: string) {
    this.editParticipant(key, value, this.participantsType.maybe);
  }

  deleteEnrolled(key: string) {
    this.deleteParticipant(this.participantsType.enrolled, key);
  }

  deleteReserves(key: string) {
    this.deleteParticipant(this.participantsType.reserves, key);
  }

  deleteMaybe(key: string) {
    this.deleteParticipant(this.participantsType.maybe, key);
  }

  editParticipant(key: string, value: string, type: string) {
    Dialogs.matInput(key, value, type, 'Modificar nombre').subscribe(result => {
      if ( result && result.length > 0 ) {
        this.firebase.events.generic.update.participant(this.event, key, result, type).subscribe({
          next: (x) => {
            this.event.info[type][key] = result;
            // TODO: ¿Compartir por whatsapp?
            // TODO: Redirigir a la tarjeta adecuada.
          },
          error: (err: any) => {
            Dialogs.showError(
              'No ha sido posible realizar tu petición. Esto puede ser debido a:\n\n' +
                ' · Problemas de conexión con la base de datos.\n' +
                ' · Porque los datos sobre la quedada han sido modificados por otro participante.\n\n' +
                'Recarga la página y vuelve a intentarlo.',
              'eventos/' + this.event.id
            );
          }
        });
      }
    });
  }

  private deleteParticipant(type: string, key: string) {
    Dialogs.verificateAction(type, key, 'Eliminar a ' + this.event.info[type][key]).subscribe(result => {
      if ( result ) {
        this.firebase.events.generic.delete.participant(this.event, type, key).subscribe({
          next: (x) => {
            delete this.event.info[type][key];
            switch (type) {
              case 'enrolled':
                this.removeParticipantFromKeyList(this.enrolledKeys, key);
                break;
              case 'reserves':
                this.removeParticipantFromKeyList(this.reservesKeys, key);
                break;
              case 'maybe':
                this.removeParticipantFromKeyList(this.maybeKeys, key);
                break;
            }
            // TODO: Redirigir a la tarjeta adecuada.
          },
          error: (err: any) => {
            Dialogs.showError(
              'No ha sido posible realizar tu petición. Esto puede ser debido a:\n\n' +
                ' · Problemas de conexión con la base de datos.\n' +
                ' · Porque los datos sobre la quedada han sido modificados por otro participante.\n\n' +
                'Recarga la página y vuelve a intentarlo.',
              'eventos/' + this.event.id
            );
          }
        });
      }
    });
  }

  private removeParticipantFromKeyList(arr: string[], key: string) {
    for (let i = 0; i < arr.length; i++) {
      if ( arr[i] === key) {
        arr.splice(i, 1);
        i = arr.length + 1;
      }
    }
  }
}
