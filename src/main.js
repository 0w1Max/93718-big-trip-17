import {render} from './framework/render.js';
import TripFilterView from './view/trip-filter-view.js';
import {generateFilter} from './mock/filter.js';
import ListPresenter from './presenter/events-list-presenter.js';
import PointModel from './model/point-model.js';
import OfferModel from './model/offer-model.js';

const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const offerModel = new OfferModel();
const listPresenter = new ListPresenter(tripEventsElement, pointModel, offerModel);

const filters = generateFilter(pointModel.points);

render(new TripFilterView(filters), tripFiltersElement);

listPresenter.init();
