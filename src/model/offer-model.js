import {generateOffers} from '../mock/offer.js';

export default class OfferModel {
  #offers = generateOffers();

  get offers () {
    return this.#offers;
  }
}
