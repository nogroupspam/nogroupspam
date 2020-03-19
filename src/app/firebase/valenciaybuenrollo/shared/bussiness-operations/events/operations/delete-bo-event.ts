import { DeleteEventApiRest } from "../../../../api/events/operations/delete-event";
import { FirebaseUtils } from "../../../../../shared/utils/firebase-utils";

export class DeleteBOEvents {
  constructor(
    private remove: DeleteEventApiRest,
    private firebaseUtils: FirebaseUtils
  ) {}
}
