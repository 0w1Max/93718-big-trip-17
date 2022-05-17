import {generateOffersType} from '../mock/offer.js';

export default class OfferModel {
    offers = generateOffersType();

    getOffers = () => this.offers;
}
