import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FireBaseRTDBApiRest } from '../firebase-rtdb-api-rest';

export abstract class FireBaseRTDBPatchApiRest extends FireBaseRTDBApiRest {

  constructor(private http: HttpClient, private urlBase: string, token: string) {
    super(token);
  }

  protected patch(obj: any, path: string): Observable<any> {
    return this.http.patch(
      this.urlBase + path + this.getExtension() + this.getToken(),
      obj,
      { headers: { 'content-type': 'application/json' }}
    );
  }
}
