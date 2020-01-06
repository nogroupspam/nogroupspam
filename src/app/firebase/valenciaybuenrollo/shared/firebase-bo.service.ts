import { Injectable } from '@angular/core';
import { ValenciaYBuenRolloApiRest } from '../api/valenciaybuenrollo-api-rest';
import { FirebaseUtils } from '../../shared/utils/firebase-utils';
import { BOEvents } from './bussiness-operations/events/bo-events';
import { UtilsObservables } from '../../../shared/utils/utils-observables';

@Injectable({
  providedIn: 'root'
})
export abstract class FirebaseBOService {

  constructor(firebase: ValenciaYBuenRolloApiRest, firebaseUtils: FirebaseUtils, utilsObservables: UtilsObservables) {
    this.events = new BOEvents(firebase.events, firebaseUtils, utilsObservables);
  }

  public events: BOEvents;
}
