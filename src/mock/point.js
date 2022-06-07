import {getRandomInteger, generateDate} from '../utils.js';
import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {TYPES, CITIES, DESCRIPTIONS, URL_PICTURES, ID_COUNT} from '../const.js';

const INTERVAR_OF_DAYS = 20;

export const generatePoint = () => {
  const date = generateDate(- INTERVAR_OF_DAYS, 0);
  const dateFrom = dayjs(date);
  const dateTo = dayjs(date)
    .add(getRandomInteger(0, 10), 'hour')
    .add(getRandomInteger(20, 59), 'minute');

  const generateOffersIdArray = () => {
    const offersIdArray = new Set;

    for (let i = 0; i <= getRandomInteger(0, 30); i++) {
      const randomId = getRandomInteger(1, ID_COUNT);

      offersIdArray.add(randomId);
    }

    return Array.from(offersIdArray);
  };

  return {
    price: getRandomInteger(200, 5000),
    dateFrom: dateFrom,
    dateTo: dateTo,
    destination: {
      description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
      name: CITIES[getRandomInteger(0, CITIES.length - 1)],
      pictures: [
        {
          src: `${URL_PICTURES}${getRandomInteger(1, 50)}`,
          description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)]
        }
      ]
    },
    id: nanoid(),
    isFavorite: getRandomInteger(0, 1),
    offersArray: generateOffersIdArray(),
    type: TYPES[getRandomInteger(0, TYPES.length - 1)]
  };
};
