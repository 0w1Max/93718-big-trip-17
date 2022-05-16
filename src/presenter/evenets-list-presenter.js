import {render} from '../render.js';
import EventsListView from '../view/events-list-view.js';
import EventsItemView from '../view/events-item-view.js';
import EditPointView from '../view/edit-point-view.js';

const ITEMS_COUNT = 3;

export default class ListPresenter {
  listElement = new EventsListView();

  init = (container, pointModel) => {
    this.container = container;
    this.pointModel = pointModel;
    this.points = [...this.pointModel.getPoints()];
    console.log(this.points);

    render(this.listElement, this.container);
    render(new EditPointView(this.points[0]), this.listElement.getElement());

    for (let i = 1; i < this.points.length; i++) {
      render(new EventsItemView(this.points[i]), this.listElement.getElement());
    }
  };
}
