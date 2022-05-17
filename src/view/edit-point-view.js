import {getDate, isCheckedType, isCheckedOffer} from '../utils.js';
import {createElement} from '../render.js';
import {TYPES, CITIES} from '../const.js';

const eventTypeItemTemplate = (point) => TYPES.map((type) => (
  `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" 
    name="event-type" value="taxi" ${isCheckedType(point.type, type)}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
  </div>`
)).join('');

const eventTypeListTemplate = (point) => (
  `<div class="event__type-list">
    <fieldset class="event__type-group">
    <legend class="visually-hidden">Event type</legend>

    ${eventTypeItemTemplate(point)}
    </fieldset>
  </div>`
);

const destinationListTemplate = () => CITIES.map((city) =>
  `<option value="${city}"></option>`).join('');

const editHeaderPointTemplate = (point) => (
  `<header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      ${eventTypeListTemplate(point)}      
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${point.type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" 
      name="event-destination" value="${point.destination.name}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${destinationListTemplate()}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDate(point.dateFrom)}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDate(point.dateTo)}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" 
      name="event-price" value="${point.price}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>`
);

const offersListTemplate = (point, offer) => offer.offers.map((item) => (
  `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" 
    name="event-offer-luggage" ${isCheckedOffer(point.offersArray, item.id)}>
    <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title">${item.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${item.priceOffer}</span>
    </label>
  </div>`
)).join('');

const editPointTemplate = (point, offer) => {
  const {
    destination = ''
  } = point;

  const {
    offers = []
  } = offer;

  const headerTemplate = editHeaderPointTemplate(point, offer);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      ${headerTemplate}
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offers.length !== 0 ? offersListTemplate(point, offer) : 'Empty'}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>
        </section>
      </section>
    </form>
  </li>`;
};

export default class EditPointView {
  constructor (point, offer) {
    this.point = point;
    this.offer = offer;
  }

  getTemplate () {
    return editPointTemplate(this.point, this.offer);
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
