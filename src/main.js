import {render, RenderPosition} from './render.js';
import TripInfoView from './view/trip-info-view.js';
import TripFilterView from './view/trip-filter-view.js';
import TripSortView from './view/trip-sort-view.js';
import ListPresenter from './presenter/evenets-list-presenter.js';
import PointModel from './model/point-model.js';

const tripMainElement = document.querySelector('.trip-main');
const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const listPresenter = new ListPresenter();
const pointModel = new PointModel();

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new TripFilterView(), tripFiltersElement, RenderPosition.BEFOREEND);
render(new TripSortView(), tripEventsElement, RenderPosition.AFTERBEGIN);

listPresenter.init(tripEventsElement, pointModel);
