import { Observable } from "rxjs";
import { PatchEventApiRest } from "../../../../api/events/operations/patch-event";
import { FirebaseUtils } from "../../../../../shared/utils/firebase-utils";
import { LocalDate } from "../../../../../../shared/localdate/model/localdate";
import { UtilsObservables } from "../../../../../../shared/utils/utils-observables";
import { GetEventApiRest } from "../../../../api/events/operations/get-event";
import { DeleteEventApiRest } from "../../../../api/events/operations/delete-event";
import { ParticipantTypes } from "../../../../../../shared/models/types/events/participants/participants-types";
import { retry } from "rxjs/operators";

export class UpdateBOEvents {
  constructor(
    private get: GetEventApiRest,
    private patch: PatchEventApiRest,
    private remove: DeleteEventApiRest,
    private firebaseUtils: FirebaseUtils,
    private utilsObservables: UtilsObservables
  ) {}

  public status(status: boolean, id: string) {
    return this.utilsObservables.addIdToNext(this.patch.status(status, id), id);
  }

  // public event(id: string, event: GamingEventInfo, oldDate: LocalDate) {
  public event(id: string, message: string) {
    return new Observable(subscriber => {
      this.patch.event(id, message).subscribe({
        next: info => {
          subscriber.next({
            id,
            info
          });
        },
        error: err => {
          subscriber.error(
            "Error al modificar el mensaje, Vuelva a intentarlo."
          );
        }
      });
    });
  }
}
