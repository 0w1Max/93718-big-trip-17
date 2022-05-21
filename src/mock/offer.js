import {getRandomInteger} from '../utils.js';
import {TYPES} from '../const.js';

export const generateOffers = () => {
  const offers = TYPES.map((type) => {
    let id = 1;

    return {
      type,
      offers: [
        {
          id: id++,
          title: `Offer ${type}`,
          price: getRandomInteger(5, 200)
        },
        {
          id: id++,
          title: `Offer ${type}`,
          price: getRandomInteger(5, 200)
        },
        {
          id: id++,
          title: `Offer ${type}`,
          price: getRandomInteger(5, 200)
        }
      ]
    }
  });

  return offers;
};
