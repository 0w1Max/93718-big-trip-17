import {getRandomInteger, createId} from '../utils.js';
import {TYPES, DESCRIPTIONS} from '../const.js';

const offerId = new createId();

const generateOffer = () => ({
    id: offerId.add(),
    title: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
    price: getRandomInteger(5, 200)
});

const offers = Array.from({length: getRandomInteger(0, 3)}, generateOffer);

const generateOffersType = () => ({
    type: TYPES[getRandomInteger(0, TYPES.length - 1)],
    offers: offers
});

export {generateOffer, generateOffersType};
