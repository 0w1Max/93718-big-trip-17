import {getRandomInteger, generateDate} from '../utils.js';
import dayjs from 'dayjs';
import {TYPES, CITIES, DESCRIPTIONS, URL_PICTURES} from '../const.js';

const INTERVAR_OF_DAYS = 20;

export const generatePoint = () => {
  const dateFrom = generateDate(- INTERVAR_OF_DAYS, 0);
  const dateTo = dayjs(dateFrom)
    .add(getRandomInteger(0, 1), 'day')
    .add(getRandomInteger(0, 1), 'hour')
    .add(getRandomInteger(20, 59), 'minute');

  const generateOffersIdArray = () => {
    const offersIdArray = new Set;
    let randomId = getRandomInteger(1, 5);

    for (let i = 0; i <= getRandomInteger(0, 5); i++) {
      offersIdArray.add(randomId);

      randomId = getRandomInteger(1, 5);
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
    id: getRandomInteger(1, 20),
    isFavorite: getRandomInteger(0, 1),
    offersArray: generateOffersIdArray(),
    type: TYPES[getRandomInteger(0, TYPES.length - 1)]
  };
};
