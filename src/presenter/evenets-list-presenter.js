import {render} from '../render.js';
import EventsListView from '../view/events-list-view.js';
import EventsItemView from '../view/events-item-view.js';
import EditPointView from '../view/edit-point-view.js';

const ITEMS_COUNT = 3;

export default class ListPresenter {
  listElement = new EventsListView();

  init = (container) => {
    this.container = container;

    render(this.listElement, this.container);
    render(new EditPointView(), this.listElement.getElement());

    for (let i = 0; i < ITEMS_COUNT; i++) {
      render(new EventsItemView(), this.listElement.getElement());
    }
  };
}
