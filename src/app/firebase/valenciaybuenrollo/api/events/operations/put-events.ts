import { HttpClient } from "@angular/common/http";
import { EventInfo } from "../../../../../shared/models/events/event/event";
import { Observable } from "rxjs";
import { FireBaseRTDBPutApiRest } from "../../../../shared/operations/put";

export class PutEventApiRest extends FireBaseRTDBPutApiRest {
  constructor(http: HttpClient, urlBase: string, token: string) {
    super(http, urlBase, token);
  }

  public event<Info extends EventInfo>(
    id: string,
    event: Info
  ): Observable<any> {
    return this.put(event, id);
  }

  public participant(id: string, name: string, type: string): Observable<any> {
    return this.put(name, id + "/" + type);
  }
}
