import {generateOffers} from '../mock/offer.js';

export default class OfferModel {
  offers = generateOffers();

  getOffers = () => this.offers;
}
