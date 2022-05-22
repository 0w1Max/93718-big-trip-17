import ListPresenter from './presenter/evenets-list-presenter.js';
import PointModel from './model/point-model.js';
import OfferModel from './model/offer-model.js';

const tripEventsElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const offerModel = new OfferModel();
const listPresenter = new ListPresenter(tripEventsElement, pointModel, offerModel);

listPresenter.init();
