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
    render(new EditPointView(this.#points[0], this.#offers), this.#eventListComponent.element);

    for (let i = 1; i < this.#points.length; i++) {
      render(new EventsItemView(this.#points[i], this.#offers), this.#eventListComponent.element);
    }
  };
}
