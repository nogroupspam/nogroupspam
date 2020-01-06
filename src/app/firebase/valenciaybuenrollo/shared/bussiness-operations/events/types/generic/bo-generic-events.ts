import { BOEventsType } from '../bo-events-type';
import { GenericEventsApiRest } from '../../../../../api/events/types/generic/generic-event';
import { FirebaseUtils } from '../../../../../../shared/utils/firebase-utils';
import { UtilsObservables } from '../../../../../../../shared/utils/utils-observables';
import { GetBOGenericEvents } from '../../operations/generic/get-bo-generic-event';

export class BOGenericEvents extends BOEventsType {

  constructor(protected eventsType: GenericEventsApiRest, firebaseUtils: FirebaseUtils, utilsObservables: UtilsObservables) {
    super(eventsType, firebaseUtils, utilsObservables);
    this.get = new GetBOGenericEvents(eventsType.get, eventsType.getMoveClass(), firebaseUtils);
  }
  public get: GetBOGenericEvents;
}
