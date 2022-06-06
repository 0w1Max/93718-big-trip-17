import {render, replace, remove} from '../framework/render.js';
import EventsItemView from '../view/events-item-view.js';
import EditPointView from '../view/edit-point-view.js';


export default class EventPresenter {
  #pointContainer = null;
  #changeData = null;

  #pointComponent = null;
  #editPointComponent = null;

  #point = null;
  #offer = null;

  constructor(pointContainer, changeData) {
    this.#pointContainer = pointContainer;
    this.#changeData = changeData;
  }

  init = (point, offer) => {
    this.#point = point;
    this.#offer = offer;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new EventsItemView(point, offer);
    this.#editPointComponent = new EditPointView(point, offer);
    
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

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

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#pointContainer);

      return;
    }

    if (this.#pointContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointContainer.contains(prevEditPointComponent.element)) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
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

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
