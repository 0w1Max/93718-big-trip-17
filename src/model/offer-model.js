import {generateOffersType} from '../mock/offer.js';

export default class OfferModel {
    offer = generateOffersType();

    getOffer = () => this.offer;
}
