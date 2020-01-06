import { LocalDate } from "../../../localdate/model/localdate";

/**
 * @param {string} idDay id of the day for the event in database.
 * @param {Event[]} events the events for this day.
 *
 * @export
 * @interface EventsDay
 */
export interface EventsDay {
  idDay: string;
  events: Event[];
}

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
 * @param {LocalDate} date Event occurs on this date.
 * @param {string} time Event starts at this time.
 * @param {string} timeEnd Event ends at this time.
 * @param {string} name Name of the event.
 * @param {string} place Place where the event is going to be.
 * @param {number} limit Limit of participants.
 * @param { [id: string]: string } enrolled People that enrolled as a participant.
 * @param { [id: string]: string } reserves People that wants to come but the event is full.
 * @param { [id: string]: string } maybe: People that maybe come to the event.
 * @param {string} description: Description of the event.
 * @param {boolean} status if is actived or canceled.
 *
 * @export
 * @interface EventInfo
 */
export interface EventInfo {
  date: LocalDate;
  time: string;
  timeEnd: string;
  name: string;
  image: string;
  thumbnail: string;
  place: string;
  limit: number;
  enrolled?: { [id: string]: string };
  reserves?: { [id: string]: string };
  maybe?: { [id: string]: string };
  description: string;
  status: boolean;
}
