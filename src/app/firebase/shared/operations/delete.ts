import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FireBaseRTDBApiRest } from '../firebase-rtdb-api-rest';

export abstract class FireBaseRTDBDeleteApiRest extends FireBaseRTDBApiRest {

  constructor(private http: HttpClient, private urlBase: string, token: string) {
    super(token);
  }

  protected delete(path: string): Observable<any> {
    return this.http.delete(
      this.urlBase + path + this.getExtension() + this.getToken()
    );
  }
}
