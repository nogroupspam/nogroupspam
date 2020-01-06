import { HttpClient } from '@angular/common/http';
import { EventInfo } from '../../../../../shared/models/events/event/event';
import { Observable } from 'rxjs';
import { FireBaseRTDBPostApiRest } from '../../../../shared/operations/post';

export class PostEventApiRest extends FireBaseRTDBPostApiRest {

  constructor(http: HttpClient, urlBase: string, token: string) {
    super(http, urlBase, token);
  }

  public event<Info extends EventInfo>(idDay: number, event: Info): Observable<any> {
    return this.post(
      event,
      idDay.toString()
    );
  }

  public participant(idDay: number, id: string, name: string, type: string): Observable<any> {
    return this.post(
      name,
      idDay + '/' + id + '/' + type
    );
  }
}
