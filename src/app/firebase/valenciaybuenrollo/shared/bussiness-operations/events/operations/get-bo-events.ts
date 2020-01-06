import { Observable } from 'rxjs';
import { DateUtils } from '../../../../../../shared/localdate/date-utils';
import { FireBaseRTDBMoveApiRest } from '../../../../../shared/operations/move';
import { FirebaseUtils } from '../../../../../shared/utils/firebase-utils';
import { GetEventApiRest } from '../../../../api/events/operations/get-event';

export class GetBOEvents {

  constructor(
    protected get: GetEventApiRest,
    private move: FireBaseRTDBMoveApiRest,
    private firebaseUtils: FirebaseUtils
  ) { }

  /**
   * Returns all events.
   */
  public all(): Observable<any> {
    return new Observable(subscriber => {
      this.get.all().subscribe({
      // this.events[type].get.all().subscribe({
        next: (x: any) => {
          // const eventsList: GamingEventsDay[] = [];
          const eventsList: any[] = [];
          if (x === null) {
            subscriber.error([]);
            subscriber.complete();
          } else {
            const dayKeys = Object.keys(x);
            const currentDate = this.firebaseUtils.generateIdByDate(
              new DateUtils().currentDateChangeAtSpainHour(5)
            );
            dayKeys.forEach(day => {
              if (this.firebaseUtils.checkEventinTime(day, currentDate)) {
                // const eventsDay: GamingEventsDay = {
                const eventsDay: any = {
                  idDay: day,
                  events: []
                };
                const eventskeys = Object.keys(x[day]);
                eventskeys.forEach(id => {
                  // const event: GamingEvent = {
                  const event: any = {
                    id, info: x[day][id]
                  };
                  eventsDay.events.push(event);
                });
                eventsList.push(eventsDay);
              } else {
                this.move.this(day, x[day]);
              }
            });
            subscriber.next(eventsList);
            subscriber.complete();
          }
        },
        error: (err) => {
          subscriber.error([]);
          subscriber.complete();
        }
      });
    });
  }

  /**
   * Return one of the Events of one day.
   * @param idDay the id of the day with events.
   * @param id the id of the Event for that day.
   */
  public event(idDay: number, id: string): Observable<any> {
    return this.get.event(idDay, id);
  }

  // public participants(event: GamingEvent, type: string) {
  public participants(event: any, type: string): Observable<any> {
    const idDay = this.firebaseUtils.generateIdByDate(event.info.date);
    const idEvent = event.id;

    return this.get.allParticipants(idDay, idEvent, type);
  }

  /*
  // public getGameEventsOld(): Observable<GamingEvent[]> {
  public getGameEventsOld(): Observable<any[]> {
    return new Observable(subscriber => {
      this.get.all().subscribe({
        next: (x) => {
          const eventsList: any[] = [];
          if (x === null) {
            subscriber.error([]);
            subscriber.complete();
          } else {
            const dayKeys = Object.keys(x);
            const currentDate = this.firebaseUtils.generateIdByDate(
              new DateUtils().currentDateChangeAtSpainHour(5)
            );
            dayKeys.forEach(day => {
              if (this.firebaseUtils.checkEventinTime(day, currentDate)) {
                const eventskeys = Object.keys(x[day]);
                eventskeys.forEach(id => {
                  const event: any = {
                    id, info: x[day][id]
                  };
                  eventsList.push(event);
                });
              } else {
                this.move.this(day, x[day]);
              }
            });
            subscriber.next(eventsList);
            subscriber.complete();
          }
        },
        error: (err) => {
          subscriber.error([]);
          subscriber.complete();
        }
      });
    });
  }
  */
}
