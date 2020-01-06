import { EventsTypeApiRest } from '../../../../api/events/types/events-type';
import { FirebaseUtils } from '../../../../../shared/utils/firebase-utils';
import { GetBOEvents } from '../operations/get-bo-events';
import { AddBOEvents } from '../operations/add-bo-event';
import { UpdateBOEvents } from '../operations/update-bo-event';
import { DeleteBOEvents } from '../operations/delete-bo-event';
import { HasBOEvents } from '../operations/has-bo-events';
import { UtilsObservables } from '../../../../../../shared/utils/utils-observables';

export class BOEventsType {

  constructor(protected eventsType: EventsTypeApiRest, firebaseUtils: FirebaseUtils, utilsObservables: UtilsObservables) {
    this.has = new HasBOEvents(eventsType.get);
    this.get = new GetBOEvents(eventsType.get, eventsType.getMoveClass(), firebaseUtils);
    this.add = new AddBOEvents(this.has, eventsType.post, firebaseUtils, utilsObservables);
    this.update = new UpdateBOEvents(eventsType.get, eventsType.patch, eventsType.delete, firebaseUtils, utilsObservables);
    this.delete = new DeleteBOEvents(eventsType.delete, firebaseUtils);
  }

  public get: GetBOEvents;
  public add: AddBOEvents;
  public update: UpdateBOEvents;
  public delete: DeleteBOEvents;
  public has: HasBOEvents;
}
