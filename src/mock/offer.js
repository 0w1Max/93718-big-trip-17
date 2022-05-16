import {TYPES, DESCRIPTIONS} from '../const.js';

const generateOffer = () => ({
    id: 1,
    title: DESCRIPTIONS[0],
    price: 120
});

const generateOffersType = () => ({
    type: TYPES[0],
    offers: '$Array<$Offer>'
});

export {generateOffer, generateOffersType};
