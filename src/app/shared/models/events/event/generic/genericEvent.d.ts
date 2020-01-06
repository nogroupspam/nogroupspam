import { EventInfo, Event, EventsDay } from "../event";

/**
 * @param {GenericEvent[]} events the events for this day.
 *
 * @export
 * @interface GenericEventsDay
 */
export interface GenericEventsDay extends EventsDay {
  events: GenericEvent[];
}

/**
 * @param {GenericEventInfo} info Information about the event.
 *
 * @export
 * @interface GenericEvent
 */
export interface GenericEvent extends Event {
  info: GenericEventInfo;
}

/**
 * @param {string} image Image of the event.
 * @param {string} thumbnail Image thumbnail of the event.
 *
 * @export
 * @interface GenericEventInfo
 */
export interface GenericEventInfo extends EventInfo {
  image: string;
  thumbnail: string;
}
