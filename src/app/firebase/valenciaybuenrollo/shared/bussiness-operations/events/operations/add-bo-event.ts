import { PostEventApiRest } from '../../../../api/events/operations/post-events';
import { FirebaseUtils } from '../../../../../shared/utils/firebase-utils';
import { Observable } from 'rxjs';
import { UtilsObservables } from '../../../../../../shared/utils/utils-observables';
import { ParticipantTypes } from '../../../../../../shared/models/types/events/participants/participants-types';
import { HasBOEvents } from './has-bo-events';

export class AddBOEvents {

  constructor(
    private has: HasBOEvents,
    private post: PostEventApiRest,
    private firebaseUtils: FirebaseUtils,
    private utilsObservables: UtilsObservables
  ) { }

  public event(event: any): Observable<any> {
  // public Event(event: GamingEventInfo): Observable<any> {
    const idDay: number = this.firebaseUtils.generateIdByDate(event.date);
    return this.utilsObservables.addIdToNext(
      this.post.event(idDay, event),
      idDay
    );
  }

  public participants(event: any, names: string[], type: string): Observable<any> {
    if (type === new ParticipantTypes().enrolled) {
      const idDay = this.firebaseUtils.generateIdByDate(event.info.date);
      const idEvent = event.id;
      const continuar = new Observable(subscriber => {
        this.has.freePlaces(idDay, idEvent).subscribe({
          next: (x) => {
            if (x >= 0 && x < names.length) {
              subscriber.error('There are not enough spot left');
              subscriber.complete();
            } else {
              subscriber.next();
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
        continuar.subscribe({
          next: () => {
            this.utilsObservables.dispatchResponse(
              this.postParticipants(
                idDay,
                idEvent,
                names,
                type
              ),
              subscriber,
            );
          },
          error: (err) => {
            subscriber.error(err);
            subscriber.complete();
          }
        });
      });
    } else {
      return this.postParticipants(
        this.firebaseUtils.generateIdByDate(event.info.date),
        event.id,
        names,
        type
      );
    }
  }

  private postParticipants(idDay: number, idEvent: string, names: string[], type: string) {
    return new Observable(subscriber => {
      let count = 0; // used to count the number of games fixed.
      const finish = names.length; // used to know the amount of games to fix.
      let errors = 0;
      names.forEach(name => {
        name = '"' + name + '"';
        this.post.participant(idDay, idEvent, name, type).subscribe({
          next: () => {
            count++;
            this.utilsObservables.checkIfSubscriberIsFinished(
              subscriber,
              count,
              finish,
              errors,
              'Error adding ' + errors + ' ' + type + '.'
            );
          },
          error: () => {
            count++;
            errors++;
            this.utilsObservables.checkIfSubscriberIsFinished(
              subscriber,
              count,
              finish,
              errors,
              'Error adding ' + errors + ' ' + type + '.'
            );
          }
        });
      });
    });
  }
}
