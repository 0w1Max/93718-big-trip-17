import dayjs from 'dayjs';
import {getRandomInteger, getDate, isFavoriteClass} from '../utils.js';
import {createElement} from '../render.js';

const eventsItemTemplate = (point, offer) => {
  const {
    price = 0,
    destination = '',
    type = '',
    dateFrom = null,
    isFavorite = false
  } = point;

  const {
    offerType = '',
    offers = []
  } = offer;

  const date = dateFrom;
  const eventDuration = getRandomInteger(15, 60);
  const eventStartTime = getDate(date, 'hh:mm');
  const eventEndTime = dayjs(date).add(eventDuration, 'minute').format('hh:mm');

  const getTitleOffer = () => offers.length !== 0
    ? offers[getRandomInteger(0, offers.length - 1)].title
    : 'No offers';

  const getPriceOffer = () => offers.length !== 0
    ? offers[getRandomInteger(0, offers.length - 1)].price
    : 'No offers';

  return `<li class="trip-events__item">
    <div class="event">
        <time class="event__date" datetime="${getDate(date, 'YYYY-MM-DD')}">${getDate(date, 'MMM DD')}</time>
        <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
            <p class="event__time">
                <time class="event__start-time" datetime="${getDate(date)}">${eventStartTime}</time>
                &mdash;
                <time class="event__end-time" datetime="${getDate(date)}">${eventEndTime}</time>
            </p>
            <p class="event__duration">${eventDuration}M</p>
        </div>
        <p class="event__price">&euro;&nbsp;<span class="event__price-value">${price}</span></p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
            <li class="event__offer">
                <span class="event__offer-title">Order ${getTitleOffer()}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${getPriceOffer()}</span>
            </li>
        </ul>
        <button class="event__favorite-btn ${isFavoriteClass(isFavorite)}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
        </button>
        <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
        </button>
    </div>
  </li>`;
};

export default class EventsItemView {
  constructor (point, offer) {
    this.point = point;
    this.offer = offer;
  }

  getTemplate () {
    return eventsItemTemplate(this.point, this.offer);
  }

  getElement () {
    if (this.element) {
      return this.element;
    }

    this.element = createElement(this.getTemplate());

    return this.element;
  }

  removeElement () {
    this.element = null;
  }
}
