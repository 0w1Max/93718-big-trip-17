import {createElement} from '../render.js';

const eventsListTemplate = () => `<ul class="trip-events__list"></ul>`;

export default class EventsListView {
  getTemplate () {
    return eventsListTemplate();
  }

  getElement () {
    if (this.element) {
      return this.element;
    }

    return (this.element = createElement(this.getTemplate()));
  }

  removeElement () {
    this.element = null;
  }
}