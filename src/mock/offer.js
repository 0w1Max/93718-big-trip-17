import {getRandomInteger, createId} from '../utils.js';
import {TYPES} from '../const.js';

export const generateOffers = () => {
  const offers = TYPES.map((type) => {
    const id = new createId();

    return {
      type,
      offers: [
        {
          id: id.add(),
          title: `Offer ${id.show()}`,
          price: getRandomInteger(5, 200)
        },
        {
          id: id.add(),
          title: `Offer ${id.show()}`,
          price: getRandomInteger(5, 200)
        },
        {
          id: id.add(),
          title: `Offer ${id.show()}`,
          price: getRandomInteger(5, 200)
        }
      ]
    }
  });

  return Array.from(offers);
};
