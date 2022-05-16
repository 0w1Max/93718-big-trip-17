import {createId} from '../utils.js';
import {TYPES, DESCRIPTIONS} from '../const.js';

const offerId = new createId();

const generateOffer = () => ({
    id: offerId.add(),
    title: DESCRIPTIONS[0],
    price: 120
});

const generateOffersType = () => ({
    type: TYPES[0],
    offers: '$Array<$Offer>'
});

export {generateOffer, generateOffersType};
