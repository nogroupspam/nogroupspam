import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EventInfo } from "../../../../../shared/models/events/event/event";
import { FireBaseRTDBPatchApiRest } from "../../../../shared/operations/patch";

export class PatchEventApiRest extends FireBaseRTDBPatchApiRest {
  constructor(http: HttpClient, urlBase: string, token: string) {
    super(http, urlBase, token);
  }

  public day(id: string, event: any): Observable<any> {
    return this.patch(event, id);
  }

  public event<Info extends EventInfo>(
    id: string,
    message: string
  ): Observable<any> {
    return this.patch(`{"message": "${message}"}`, id);
  }

  public status(status: boolean, id: string): Observable<any> {
    return this.patch({ status }, id);
  }

  public participant(id: string, key: string, name: string, type: string) {
    return this.patch({ [key]: name }, id + "/" + type);
  }
}
