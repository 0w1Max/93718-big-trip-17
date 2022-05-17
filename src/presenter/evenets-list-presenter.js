import {render} from '../render.js';
import EventsListView from '../view/events-list-view.js';
import EventsItemView from '../view/events-item-view.js';
import EditPointView from '../view/edit-point-view.js';

const ITEMS_COUNT = 3;

export default class ListPresenter {
  listElement = new EventsListView();

  init = (container, pointModel, offerModel) => {
    this.container = container;
    this.pointModel = pointModel;
    this.offerModel = offerModel;
    this.points = [...this.pointModel.getPoints()];
    this.offers = this.offerModel.getOffers();
    console.log(this.points);
    console.log(this.offers);

    render(this.listElement, this.container);
    render(new EditPointView(this.points[0], this.offers), this.listElement.getElement());

    for (let i = 1; i < this.points.length; i++) {
      render(new EventsItemView(this.points[i]), this.listElement.getElement());
    }
  };
}
