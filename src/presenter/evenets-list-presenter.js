import {render, RenderPosition} from '../render.js';
import TripInfoView from '../view/trip-info-view.js';
import TripFilterView from '../view/trip-filter-view.js';
import TripSortView from '../view/trip-sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventsItemView from '../view/events-item-view.js';
import EditPointView from '../view/edit-point-view.js';
import ListEmptyView from '../view/list-empty-view.js';

export default class ListPresenter {
  #container = null;
  #pointModel = null;
  #offerModel = null;

  #listEmptyComponent = new ListEmptyView();
  #tripInfoComponent = new TripInfoView();
  #tripFilterComponent = new TripFilterView();
  #tripSortComponent = new TripSortView();
  #eventsListComponent = new EventsListView();

  #points = [];
  #offers = [];

  constructor (container, pointModel, offerModel) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
  }

  init = () => {
    this.#points = [...this.#pointModel.points];
    this.#offers = [...this.#offerModel.offers];

    // console.log(this.#points);
    // console.log(this.#offers);

    this.#renderListPoint();
  };

  #renderListPoint = () => {
    const tripMainElement = document.querySelector('.trip-main');
    const tripFiltersElement = document.querySelector('.trip-controls__filters');

    if (this.#points.length === 0) {
      render(this.#tripFilterComponent, tripFiltersElement, RenderPosition.BEFOREEND);
      render(this.#listEmptyComponent, this.#container);
    } else {
      render(this.#tripInfoComponent, tripMainElement, RenderPosition.AFTERBEGIN);
      render(this.#tripFilterComponent, tripFiltersElement, RenderPosition.BEFOREEND);
      render(this.#tripSortComponent, this.#container);
      render(this.#eventsListComponent, this.#container);

      for (let i = 0; i < this.#points.length; i++) {
        this.#renderPoint(this.#points[i], this.#offers);
      }
    }

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i], this.#offers);
    }
  };

  #renderPoint = (point, offer) => {
    const pointComponent = new EventsItemView(point, offer);
    const editPointComponent = new EditPointView(point, offer);

    const replacePointToForm = () => {
      this.#eventsListComponent.element.replaceChild(editPointComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#eventsListComponent.element.replaceChild(pointComponent.element, editPointComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();

        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();

      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();

      document.removeEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();

      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#eventsListComponent.element);
  };
}
