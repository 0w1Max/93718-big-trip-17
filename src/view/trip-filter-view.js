import AbstractView from '../framework/view/abstract-view.js';

const filterTemplate = (filters) => filters.map((filter, index) => {
  const isDisabled = () => filter.count === 0
    ? 'disabled'
    : '';

  const isChecked = () => index === 0
    ? 'checked'
    : '';

    return `<div class="trip-filters__filter">
      <input
      id="filter-${filter.name}"
      class="trip-filters__filter-input visually-hidden"
      type="radio"
      name="trip-filter"
      value="${filter.name}"
      ${isDisabled()}
      ${isChecked()}
      >
      <label class="trip-filters__filter-label" for="filter-${filter.name}">${filter.name}</label>
    </div>`
}).join('');

const tripFiltersTemplate = (filters) => (
  `<form class="trip-filters" action="#" method="get">
    ${filterTemplate(filters)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class TripFilterView extends AbstractView {
  #filters = null;

  constructor (filters) {
    super();
    this.#filters = filters;
  }

  get template () {
    return tripFiltersTemplate(this.#filters);
  }
}
