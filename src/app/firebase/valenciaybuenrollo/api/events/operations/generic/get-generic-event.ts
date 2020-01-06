import { GetEventApiRest } from '../get-event';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class GetGenericEventApiRest extends GetEventApiRest {

  constructor(http: HttpClient, urlBase: string, token: string) {
    super(http, urlBase, token);
  }

  public imageThumbnail(idDay: number, idEvent: string): Observable<string> {
    return this.get(
      idDay + '/' + idEvent + '/thumbnail'
    );
  }
}
