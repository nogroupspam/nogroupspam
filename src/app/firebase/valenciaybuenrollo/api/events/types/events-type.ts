import { HttpClient } from "@angular/common/http";
import { GetEventApiRest } from "../operations/get-event";
import { PutEventApiRest } from "../operations/put-events";
import { PatchEventApiRest } from "../operations/patch-event";
import { DeleteEventApiRest } from "../operations/delete-event";
import { FireBaseRTDBMoveApiRest } from "../../../../shared/operations/move";

export abstract class EventsTypeApiRest {
  constructor(
    http: HttpClient,
    urlBase: string,
    token: string,
    basePath: string
  ) {
    this.get = new GetEventApiRest(http, urlBase + basePath, token);
    this.put = new PutEventApiRest(http, urlBase + basePath, token);
    this.patch = new PatchEventApiRest(http, urlBase + basePath, token);
    this.delete = new DeleteEventApiRest(http, urlBase + basePath, token);
    this.move = new FireBaseRTDBMoveApiRest(
      http,
      urlBase + "old/" + basePath,
      urlBase + basePath,
      token
    );
  }

  public get: GetEventApiRest;
  public put: PutEventApiRest;
  public patch: PatchEventApiRest;
  public delete: DeleteEventApiRest;
  private move: FireBaseRTDBMoveApiRest;

  public moveOld(id: string, event: any): void {
    this.move.this(id, event);
  }

  public getMoveClass(): FireBaseRTDBMoveApiRest {
    return this.move;
  }
}
