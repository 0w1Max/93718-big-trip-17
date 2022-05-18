import {getRandomInteger, generateDate, createId} from '../utils.js';
import {TYPES, CITIES, DESCRIPTIONS, URL_PICTURES} from '../const.js';

const INTERVAR_OF_DAYS = 20;

const pointId = new createId();

export const generatePoint = () => {
  const dateFrom = generateDate(- INTERVAR_OF_DAYS, 0);
  const dateTo = generateDate(0, INTERVAR_OF_DAYS);

  const generateRandomOfferId = () => {
    const offersIdArray = new Set();
    let offerId = getRandomInteger(0, 3);

    for (let i = 0; i <= offerId; i++) {
      if (offerId !== 0) {
        offersIdArray.add(offerId);

        offerId = getRandomInteger(0, 3);
      }
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
    id: pointId.add(),
    isFavorite: getRandomInteger(0, 1),
    offersArray: generateRandomOfferId(),
    type: TYPES[getRandomInteger(0, TYPES.length - 1)]
  };
};
