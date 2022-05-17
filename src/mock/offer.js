import {getRandomInteger, createId, createUniqueId} from '../utils.js';
import {TYPES, OFFERS} from '../const.js';

// const offerId = new createId();
const offersIdArray= [];

const generateOffer = () => {
    let offerId = createUniqueId(0, OFFERS.length - 1);

    while (offersIdArray.includes(offerId)) {
        offerId = createUniqueId(0, OFFERS.length - 1);
    }

    offersIdArray.push(offerId);

    return {
        id: offerId + 1,
        title: OFFERS[offerId],
        priceOffer: getRandomInteger(5, 200)
    }
};

const offers = Array.from({length: getRandomInteger(0, OFFERS.length)}, generateOffer);

const generateOffersType = () => ({
    offerType: TYPES[getRandomInteger(0, TYPES.length - 1)],
    offers: offers
});

export {generateOffer, generateOffersType, offersIdArray};
