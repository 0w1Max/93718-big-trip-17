import {generateDate} from '../utils.js';
import {TYPES, CITIES, DESCRIPTIONS, URL_PICTURES} from '../const.js';

const INTERVAR_OF_DAYS = 20;

export const generatePoint = () => {
  const dateFrom = generateDate(- INTERVAR_OF_DAYS, 0);
  const dateTo = generateDate(0, INTERVAR_OF_DAYS);

  return {
      price: 1100,
      dateFrom: dateFrom,
      dateTo: dateTo,
      destination: {
          description: DESCRIPTIONS[0],
          name: CITIES[0],
          pictures: [
            {
              src: `${URL_PICTURES}1`,
              description: DESCRIPTIONS[2]
            }
          ]
      },
      id: 0,
      isFavorite: false,
      offers: '$Array<Offer.id>$',
      type: TYPES[0]
  }
};
