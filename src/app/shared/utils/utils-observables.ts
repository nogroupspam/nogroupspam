import { Observable, Subscriber } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UtilsObservables {
  public addIdToNext(obervable: Observable<any>, id: string) {
    return new Observable(subscriber => {
      obervable.subscribe({
        next: info => {
          subscriber.next({
            id,
            info
          });
        },
        error: err => {
          subscriber.error(err);
        }
      });
    });
  }

  public dispatchResponse(
    comunication: Observable<any>,
    subscriber: Subscriber<any>
  ) {
    comunication.subscribe({
      next: (x: any) => {
        subscriber.next(x);
        subscriber.complete();
      },
      error: (err: any) => {
        subscriber.error(err);
        subscriber.complete();
      }
    });
  }

  /**
   * If count is equal to finish subscriber must send next event if there are no errors, otherwise send error event.
   * @param subscriber Subscriber that must do the actions.
   * @param count Number with the counter to know if subscriber must send the action.
   * @param finish Number to compare with counter to know if subscriber must send the action.
   * @param errors Number of errors in subscriber.
   * @param errorMessage Error message that will launch if there are errors.
   */
  public checkIfSubscriberIsFinished(
    subscriber: Subscriber<any>,
    count: number,
    finish: number,
    errors: number,
    errorMessage: string
  ) {
    if (count === finish) {
      if (errors === 0) {
        subscriber.next(true);
        subscriber.complete();
      } else {
        subscriber.error(errorMessage);
        subscriber.complete();
      }
    }
  }
}
