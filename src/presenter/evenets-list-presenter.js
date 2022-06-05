import {render, replace, RenderPosition} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
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
    const pointComponent = new EventsItemView(point, offer);
    const editPointComponent = new EditPointView(point, offer);

    const replacePointToForm = () => {
      replace(editPointComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, editPointComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();

        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setOpenEditClickHandler(() => {
      replacePointToForm();

      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();

      document.removeEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.setCloseEditClickHandler(() => {
      replaceFormToPoint();

      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#eventsListComponent.element);
  };
}
