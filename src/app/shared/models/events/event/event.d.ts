import { LocalDate } from "../../../localdate/model/localdate";

/**
 * @param {string} id id of the event in database.
 * @param {EventInfo} info Information about the event.
 *
 * @export
 * @interface Event
 */
export interface Event {
  id: string;
  info: EventInfo;
}

/**
 * @param {string} name Name of the event.
 * @param {string} message: Message of the event.
 * @param {boolean} status if is actived or canceled.
 *
 * @export
 * @interface EventInfo
 */
export interface EventInfo {
  name: string;
  message: string;
  status: boolean;
}
