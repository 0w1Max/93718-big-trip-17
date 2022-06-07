import {render, RenderPosition} from '../framework/render.js';
import {updateItem, sortEventTime, sortEventPrice} from '../utils/point-utils.js';
import {SortType} from '../const.js';
import TripInfoView from '../view/trip-info-view.js';
import TripSortView from '../view/trip-sort-view.js';
import EventsListView from '../view/events-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import EventPresenter from './event-presenter.js';

export default class ListPresenter {
  #container = null;
  #pointModel = null;
  #offerModel = null;

  #listEmptyComponent = new ListEmptyView();
  #tripInfoComponent = new TripInfoView();
  #tripSortComponent = new TripSortView();
  #eventsListComponent = new EventsListView();

  #points = [];
  #offers = [];
  #eventPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedListPoints = [];

  constructor (container, pointModel, offerModel) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
  }

  init = () => {
    this.#points = [...this.#pointModel.points];
    this.#offers = [...this.#offerModel.offers];
    this.#sourcedListPoints = [...this.#pointModel.points];

    // console.log(this.#points);
    // console.log(this.#offers);

    this.#renderListPoint();
  };

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedListPoints = updateItem(this.#sourcedListPoints, updatedPoint);
    this.#eventPresenter.get(updatedPoint.id).init(updatedPoint, this.#offers);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.TIME:
        this.#points.sort(sortEventTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortEventPrice);
        break;
      default:
        this.#points = [...this.#sourcedListPoints];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderListPoint();
  };

  #renderInfo = () => {
    const tripMainElement = document.querySelector('.trip-main');

    render(this.#tripInfoComponent, tripMainElement, RenderPosition.AFTERBEGIN);
  };

  #renderEventsList = () => {
    render(this.#eventsListComponent, this.#container);
  };

  #renderListEmpty = () => {
    render(this.#listEmptyComponent, this.#container);
  };

  #renderSort = () => {
    render(this.#tripSortComponent, this.#container);

    this.#tripSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderListPoint = () => {
    if (this.#points.length === 0) {
      this.#renderListEmpty();
    }

    this.#renderInfo();
    this.#renderSort();
    this.#renderEventsList();

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i], this.#offers);
    }
  };

  #renderPoint = (point, offer) => {
    const eventPresenter = new EventPresenter(
      this.#eventsListComponent.element, this.#handlePointChange, this.#handleModeChange
    );

    eventPresenter.init(point, offer);

    this.#eventPresenter.set(point.id, eventPresenter);
  };

  #clearPoints = () => {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();
  };
}
