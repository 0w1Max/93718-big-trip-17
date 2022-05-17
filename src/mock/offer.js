import {getRandomInteger} from '../utils.js';
import {TYPES, OFFERS} from '../const.js';

const offerIdArray = [];

const generateOffer = () => {
  let offerId = getRandomInteger(0, OFFERS.length - 1);

  if (offerIdArray.includes(offerId)) {
    offerId = getRandomInteger(0, OFFERS.length - 1)  
  } else {
    offerIdArray.push(offerId);
  }

  return {
    id: offerId + 1,
    title: OFFERS[offerId],
    priceOffer: getRandomInteger(5, 200)
  };
};

const offers = Array.from({length: getRandomInteger(0, OFFERS.length)}, generateOffer);

const generateOffersType = () => ({
  offerType: TYPES[getRandomInteger(0, TYPES.length - 1)],
  offers: offers
});

export {generateOffer, generateOffersType};
