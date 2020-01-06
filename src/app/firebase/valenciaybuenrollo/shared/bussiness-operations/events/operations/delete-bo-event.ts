import { DeleteEventApiRest } from '../../../../api/events/operations/delete-event';
import { FirebaseUtils } from '../../../../../shared/utils/firebase-utils';

export class DeleteBOEvents {

  constructor(
    private remove: DeleteEventApiRest,
    private firebaseUtils: FirebaseUtils
  ) { }

  // public deleteGamingEventParticipant(event: GamingEvent, type: string, key: string) {
  public participant(event: any, type: string, key: string) {
    return this.remove.participant(
      this.firebaseUtils.generateIdByDate(event.info.date),
      event.id,
      type,
      key
    );
  }
}
