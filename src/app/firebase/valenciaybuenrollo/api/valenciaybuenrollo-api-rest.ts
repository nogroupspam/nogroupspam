import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { EventsApiRest } from './events/events';

class Collections {
  public readonly events = 'events/';
}

@Injectable({
  providedIn: 'root'
})
export class ValenciaYBuenRolloApiRest {

  private readonly urlBase = environment.firebaseUrls.buenrollo;
  private token = 'P0aBWYAUaU7DNnwUp2HQElTwiGHA75O4reOxiHg9';
  public collections = new Collections();

  constructor(private http: HttpClient) {
    this.events = new EventsApiRest(
      this.http, this.urlBase, this.token, this.collections.events
    );
  }

  public events: EventsApiRest;

  public setToken(token: string) {
    this.token = token;
    this.events.setToken(this.token);
  }
}
