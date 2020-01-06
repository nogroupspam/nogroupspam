import { EventsTypeApiRest } from '../../../api/events/types/events-type';
import { FirebaseUtils } from '../../../../shared/utils/firebase-utils';
import { UtilsObservables } from '../../../../../shared/utils/utils-observables';
import { BOGenericEvents } from './types/generic/bo-generic-events';
import { EventsApiRest } from '../../../api/events/events';

export class BOEvents {

  constructor(events: EventsApiRest, firebaseUtils: FirebaseUtils, utilsObservables: UtilsObservables) {
    this.generic = new BOGenericEvents(events.generic, firebaseUtils, utilsObservables);
  }

  public generic: BOGenericEvents;
}
