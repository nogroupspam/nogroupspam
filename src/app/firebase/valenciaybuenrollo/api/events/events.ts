import { HttpClient } from "@angular/common/http";
import { GenericEventsApiRest } from "./types/generic/generic-event";
import { EventTypes } from "../../../../shared/models/types/events/events-types";
import { ParticipantTypes } from "../../../../shared/models/types/events/participants/participants-types";

export class EventsApiRest {
  constructor(
    http: HttpClient,
    urlBase: string,
    token: string,
    basePath: string
  ) {
    this.generic = new GenericEventsApiRest(
      http,
      urlBase,
      token,
      basePath + this.eventsTypes.generic + "/"
    );
  }

  public eventsTypes = new EventTypes();
  public participantTypes = new ParticipantTypes();

  public generic: GenericEventsApiRest;

  public setToken(token: string) {
    this.generic.get.setToken(token);
    this.generic.put.setToken(token);
    this.generic.patch.setToken(token);
    this.generic.delete.setToken(token);
  }
}
