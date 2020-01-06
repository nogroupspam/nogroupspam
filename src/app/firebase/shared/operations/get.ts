import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FireBaseRTDBApiRest } from '../firebase-rtdb-api-rest';

export abstract class FireBaseRTDBGetApiRest extends FireBaseRTDBApiRest {

  constructor(private http: HttpClient, private urlBase: string, token: string) {
    super(token);
  }

  protected get(path: string): Observable<any> {
    return this.http.get(
      this.urlBase + path + this.getExtension() + this.getToken(),
      { responseType: 'json' }
    );
  }
}