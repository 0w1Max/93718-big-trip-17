import {render} from '../render.js';
import EventsListView from '../view/events-list-view.js';
import EventsItemView from '../view/events-item-view.js';
import EditPointView from '../view/edit-point-view.js';

export default class ListPresenter {
  #container = null;
  #pointModel = null;
  #offerModel = null;

  #eventListComponent = new EventsListView();

  #points = [];
  #offers = [];

  init = (container, pointModel, offerModel) => {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
    this.#points = [...this.#pointModel.points];
    this.#offers = [...this.#offerModel.offers];

    // console.log(this.#points);
    // console.log(this.#offers);

    render(this.#eventListComponent, this.#container);

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i], this.#offers);
    }
  };

  #renderPoint = (point, offer) => {
    const pointComponent = new EventsItemView(point, offer);
    const editPointComponent = new EditPointView(point, offer);

    const replacePointToForm = () => {
      this.#eventListComponent.element.replaceChild(editPointComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#eventListComponent.element.replaceChild(pointComponent.element, editPointComponent.element);
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

    render(pointComponent, this.#eventListComponent.element);
  };
}
