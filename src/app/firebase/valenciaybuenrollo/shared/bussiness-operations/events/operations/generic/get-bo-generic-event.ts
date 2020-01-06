import { GetBOEvents } from '../get-bo-events';
import { FirebaseUtils } from '../../../../../../shared/utils/firebase-utils';
import { FireBaseRTDBMoveApiRest } from '../../../../../../shared/operations/move';
import { GetGenericEventApiRest } from '../../../../../api/events/operations/generic/get-generic-event';
import { Observable } from 'rxjs';

export class GetBOGenericEvents extends GetBOEvents {

  constructor(
    protected get: GetGenericEventApiRest,
    move: FireBaseRTDBMoveApiRest,
    firebaseUtils: FirebaseUtils
  ) {
    super(get, move, firebaseUtils);
  }

  public getImageEvent(type: string, idDay: number, id: string): Observable<string> {
    return this.get.imageThumbnail(idDay, id);
  }
}