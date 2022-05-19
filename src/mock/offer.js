import {getRandomInteger} from '../utils.js';
import {TYPES} from '../const.js';

export const generateOffers = () => {
  const offers = TYPES.map((type) => (
    {
      type,
      offers: [
        {
          id: getRandomInteger(1, 5),
          title: `Offer ${type}`,
          price: getRandomInteger(5, 200)
        },
        {
          id: getRandomInteger(1, 5),
          title: `Offer ${type}`,
          price: getRandomInteger(5, 200)
        },
        {
          id: getRandomInteger(1, 5),
          title: `Offer ${type}`,
          price: getRandomInteger(5, 200)
        }
      ]
    }
  ));

  return offers;
};
