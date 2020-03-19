import { PutEventApiRest } from "../../../../api/events/operations/put-events";
import { Observable } from "rxjs";
import { UtilsObservables } from "../../../../../../shared/utils/utils-observables";
import { Event } from "../../../../../../shared/models/events/event/event";

export class AddBOEvents {
  constructor(
    private put: PutEventApiRest,
    private utilsObservables: UtilsObservables
  ) {}

  public event(event: Event): Observable<any> {
    // public Event(event: GamingEventInfo): Observable<any> {
    return this.utilsObservables.addIdToNext(
      this.put.event(event.id, event.info),
      event.id
    );
  }
}
