import { Observable } from "rxjs";
import { DateUtils } from "../../../../../../shared/localdate/date-utils";
import { FireBaseRTDBMoveApiRest } from "../../../../../shared/operations/move";
import { FirebaseUtils } from "../../../../../shared/utils/firebase-utils";
import { GetEventApiRest } from "../../../../api/events/operations/get-event";

export class GetBOEvents {
  constructor(
    protected get: GetEventApiRest,
    private move: FireBaseRTDBMoveApiRest,
    private firebaseUtils: FirebaseUtils
  ) {}

  /**
   * Return one of the Events of one day.
   * @param idDay the id of the day with events.
   * @param id the id of the Event for that day.
   */
  public event(id: string): Observable<any> {
    return this.get.event(id);
  }
}
