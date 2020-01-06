import { HttpClient } from '@angular/common/http';
import { GetGenericEventApiRest } from '../../operations/Generic/get-generic-event';
import { EventsTypeApiRest } from '../events-type';

export class GenericEventsApiRest extends EventsTypeApiRest {

  constructor(
    http: HttpClient, urlBase: string, token: string, basePath: string
  ) {
    super(http, urlBase, token, basePath);
    this.get = new GetGenericEventApiRest(
      http,
      urlBase + basePath,
      token
    );
  }

  public get: GetGenericEventApiRest;
}
