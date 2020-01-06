import { Observable } from 'rxjs';
import { GetEventApiRest } from '../../../../api/events/operations/get-event';

export class HasBOEvents {

  constructor(
    private get: GetEventApiRest,
  ) { }

  public freePlaces(idDay: number, idEvent: string) {
    return new Observable(subscriber => {
      this.get.event(idDay, idEvent).subscribe({
        // next: (x: GamingEventInfo) => {
        next: (x: any) => {
          let limit = -1;
          if (x.limit && x.limit > 0) {
            if (x.enrolled) {
              limit = x.limit - Object.keys(x.enrolled).length;
            } else {
              limit = x.limit;
            }
          }
          subscriber.next(limit);
          subscriber.complete();
        },
        error: (err) => {
          subscriber.error(err);
          subscriber.complete();
        }
      });
    });
  }
}
