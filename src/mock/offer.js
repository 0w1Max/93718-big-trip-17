import {getRandomInteger, RandomIdSet} from '../utils/common-utils.js';
import {TYPES} from '../const.js';

export const generateOffers = () => {
  const id = new RandomIdSet();

  const offers = TYPES.map((type) => (
    {
      type,
      offers: [
        {
          id: id.getId(),
          title: `Offer ${type}`,
          price: getRandomInteger(5, 200)
        },
        {
          id: id.getId(),
          title: `Offer ${type}`,
          price: getRandomInteger(5, 200)
        },
        {
          id: id.getId(),
          title: `Offer ${type}`,
          price: getRandomInteger(5, 200)
        }
      ]
    }
  ));

  return offers;
};
