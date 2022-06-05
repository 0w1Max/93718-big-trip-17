import {render, replace} from '../framework/render.js';
import EventsItemView from '../view/events-item-view.js';
import EditPointView from '../view/edit-point-view.js';


export default class EventPresenter {
  #pointContainer = null;

  #pointComponent = null;
  #editPointComponent = null;

  #point = null;
  #offer = null;

  constructor(pointContainer) {
    this.#pointContainer = pointContainer;
  }

  init = (point, offer) => {
    this.#point = point;
    this.#offer = offer;

    this.#pointComponent = new EventsItemView(point, offer);
    this.#editPointComponent = new EditPointView(point, offer);

    this.#pointComponent.setOpenEditClickHandler(() => {
      this.#replacePointToForm();

      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    this.#editPointComponent.setFormSubmitHandler(() => {
      this.#replaceFormToPoint();

      document.removeEventListener('keydown', this.#onEscKeyDown);
    });

    this.#editPointComponent.setCloseEditClickHandler(() => {
      this.#replaceFormToPoint();

      document.removeEventListener('keydown', this.#onEscKeyDown);
    });

    render(this.#pointComponent, this.#pointContainer);
  };

  #replacePointToForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();

      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };
}
