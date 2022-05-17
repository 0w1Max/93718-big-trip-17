import {getRandomInteger, createId} from '../utils.js';
import {TYPES, DESCRIPTIONS, OFFERS} from '../const.js';

const offerId = new createId();

const generateOffer = () => ({
    id: offerId.add(),
    title: OFFERS[getRandomInteger(0, OFFERS.length - 1)],
    price: getRandomInteger(5, 200)
});

const offers = Array.from({length: getRandomInteger(0, OFFERS.length)}, generateOffer);

const generateOffersType = () => ({
    offerType: TYPES[getRandomInteger(0, TYPES.length - 1)],
    offers: offers
});

export {generateOffer, generateOffersType};
