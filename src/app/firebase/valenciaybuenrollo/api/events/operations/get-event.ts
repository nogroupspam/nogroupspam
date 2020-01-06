import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParticipantTypes } from '../../../../../shared/models/types/events/participants/participants-types';
import { FireBaseRTDBGetApiRest } from '../../../../shared/operations/get';

export class GetEventApiRest extends FireBaseRTDBGetApiRest {

  constructor(http: HttpClient, urlBase: string, token: string) {
    super(http, urlBase, token);
  }

  /**
   * Return all Events.
   */
  public all(): Observable<any> {
    return this.get('');
  }

  /**
   * Return all of Events of one day
   * @param id the id of the day with events.
   */
  public day(id: number): Observable<any> {
    return this.get(
      id.toString()
    );
  }

  /**
   * Return one of the Events of one day.
   * @param idDay the id of the day with events.
   * @param id the id of the Event for that day.
   */
  public event(idDay: number, id: string): Observable<any> {
    return this.get(
      idDay + '/' + id
    );
  }

  /**
   * Return the limit of participants of the event
   * @param idDay the id of the day with events.
   * @param id the id of the Event for that day.
   */
  public limit(idDay: number, id: string): Observable<any> {
    return this.get(
      idDay + '/' + id + 'limit'
    );
  }

  /**
   * Return all participants of one type. The type must be a valid type from class ParticipantTypes.
   * @param idDay the id of the day with events.
   * @param id the id of the Event for that day.
   * @param type the type of participant. Must be a valid from class ParticipantTypes.
   */
  public allParticipants(idDay: number, id: string, type: string): Observable<any> {
    if (new ParticipantTypes().isValid(type)) {
      return this.get(
        idDay + '/' + id + '/' + type
      );
    } else {
      return new Observable(subscriber => {
        subscriber.error('Type is not valid');
      });
    }
  }

  /**
   * Return one participant of one type. The type must be a valid type from class ParticipantTypes.
   * @param idDay the id of the day with events.
   * @param id the id of the Event for that day.
   * @param type the type of participant. Must be a valid from class ParticipantTypes.
   * @param key the key id of participant.
   */
  public participant(idDay: number, id: string, type: string, key: string): Observable<any> {
    if (new ParticipantTypes().isValid(type)) {
      return this.get(
        idDay + '/' + id + '/' + type + '/' + key
      );
    } else {
      return new Observable(subscriber => {
        subscriber.error('Type is not valid');
      });
    }
  }
}
