import { Observable } from 'rxjs';
import { PatchEventApiRest } from '../../../../api/events/operations/patch-event';
import { FirebaseUtils } from '../../../../../shared/utils/firebase-utils';
import { LocalDate } from '../../../../../../shared/localdate/model/localdate';
import { UtilsObservables } from '../../../../../../shared/utils/utils-observables';
import { GetEventApiRest } from '../../../../api/events/operations/get-event';
import { DeleteEventApiRest } from '../../../../api/events/operations/delete-event';
import { ParticipantTypes } from '../../../../../../shared/models/types/events/participants/participants-types';
import { retry } from 'rxjs/operators';

export class UpdateBOEvents {

  constructor(
    private get: GetEventApiRest,
    private patch: PatchEventApiRest,
    private remove: DeleteEventApiRest,
    private firebaseUtils: FirebaseUtils,
    private utilsObservables: UtilsObservables
  ) { }

  public status(status: boolean, date: LocalDate, id: string) {
    const idDay: number = this.firebaseUtils.generateIdByDate(date);
    return this.utilsObservables.addIdToNext(
      this.patch.status(status, idDay, id),
      idDay
    );
  }

  // public event(id: string, event: GamingEventInfo, oldDate: LocalDate) {
  public event(id: string, event: any, oldDate: LocalDate) {
    return new Observable(subscriber => {
      const idDay: number = this.firebaseUtils.generateIdByDate(event.date);
      const oldDay: number = this.firebaseUtils.generateIdByDate(oldDate);
      // if date is diferent we need to move participants too and delete old event.
      if (idDay !== oldDay) {
        const types = new ParticipantTypes().getTypes();
        let i = 0;
        const end = types.length;
        types.forEach(type => {
          this.get.allParticipants(oldDay, id, type).subscribe({
            next: (particpants: { [id: string]: string } ) => {
              i++;
              event[type] = particpants;
              if (i === end) {
                this.patch.event(idDay, id, event).subscribe({
                  next: (x) => {
                    this.remove.event(oldDay, id).pipe(
                      retry(5)
                    ).subscribe({
                      next: (info) => {
                        subscriber.next({
                          id: idDay,
                          info
                        });
                      }, error: (err) => {
                        subscriber.error('No se ha podido borrar la quedada del ' +
                          oldDate.day + '/' + oldDate.month + ' por lo que ahora hay dos quedas.'
                        );
                      }
                    });
                  },
                  error: (err) => {
                    subscriber.error('Error al modificar la quedada, Vuelva a intentarlo.');
                  }
                });
              }
            },
            error: (err) => {
              subscriber.error('Error obteniendo los participantes de la quedada. Vuelva a intentarlo.') ;
            }
          });
        });
      } else {
        this.patch.event(idDay, id, event).subscribe({
          next: (info) => {
            subscriber.next({
              id: idDay,
              info
            });
          }, error: (err) => {
            subscriber.error('Error al modificar la quedada, Vuelva a intentarlo.');
          }
        });
      }
    });
  }

  // public Participant(event: GamingEvent, key: string, value: string, type: string) {
  public participant(event: any, key: string, value: string, type: string) {
    const idDay = this.firebaseUtils.generateIdByDate(event.info.date);
    const idEvent = event.id;

    const check = new Observable(subscriber => {
      this.get.participant(idDay, idEvent, type, key).subscribe({
        next: (x) => {
          if (x !== null) {
            subscriber.next();
            subscriber.complete();
          } else {
            subscriber.error('Partifipant ' + key + ' not found in ' + type + ' list.');
            subscriber.complete();
          }
        },
        error: (err) => {
          subscriber.error(err);
          subscriber.complete();
        }
      });
    });

    return new Observable(subscriber => {
      check.subscribe({
        next: (x) => {
          const patch = this.patch.participant(
            this.firebaseUtils.generateIdByDate(event.info.date),
            event.id,
            key,
            value,
            type
          );
          this.utilsObservables.dispatchResponse(patch, subscriber);
        }, error: (err) => {
          subscriber.error(err);
          subscriber.complete();
        }
      });
    });
  }
}
