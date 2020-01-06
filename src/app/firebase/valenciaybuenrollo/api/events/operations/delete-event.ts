import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FireBaseRTDBDeleteApiRest } from '../../../../shared/operations/delete';

export class DeleteEventApiRest extends FireBaseRTDBDeleteApiRest {

  constructor(http: HttpClient, urlBase: string, token: string) {
    super(http, urlBase, token);
  }

  public day(id: string): Observable<any> {
    return this.delete(
      id
    );
  }

  public event(idDay: number, id: string): Observable<any> {
    return this.delete(
      idDay + '/' + id
    );
  }

  public participant(idDay: number, id: string, type: string, key: string): Observable<any> {
    return this.delete(
      idDay + '/' + id + '/' + type + '/' + key
    );
  }
}
