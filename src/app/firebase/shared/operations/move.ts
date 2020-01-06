import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FireBaseRTDBApiRest } from '../firebase-rtdb-api-rest';
import { FireBaseRTDBPatchApiRest } from './patch';
import { FireBaseRTDBDeleteApiRest } from './delete';

class Patch extends FireBaseRTDBPatchApiRest {
  constructor(http: HttpClient, urlBase: string, token: string) {
    super(http, urlBase, token);
  }

  public this(obj: any, path: string): Observable<any> {
    return this.patch(obj, path);
  }
}

class Delete extends FireBaseRTDBDeleteApiRest {
  constructor(http: HttpClient, urlBase: string, token: string) {
    super(http, urlBase, token);
  }

  public this(path: string): Observable<any> {
    return this.delete(path);
  }
}

export class FireBaseRTDBMoveApiRest extends FireBaseRTDBApiRest {

  constructor(http: HttpClient, newUrl: string, oldUrl: string, token: string) {
    super(token);
    this.patch = new Patch(http, newUrl, token);
    this.delete = new Delete(http, oldUrl, token);
  }

  protected patch: Patch;
  protected delete: Delete;

  public this(id: string, obj: any): Observable<any> {
    return new Observable(subscriber => {
      this.patch.this(
        obj,
        id
      ).subscribe({
        next: () => {
          this.delete.this(
            id
          ).subscribe({
            next: () => {
              subscriber.next();
              subscriber.complete();
            },
            error: (err) => {
              subscriber.error(err);
            }
          });
        },
        error: (err) => {
          subscriber.error(err);
        }
      });
    });
  }
}
