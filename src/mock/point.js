import {getRandomInteger, generateDate} from '../utils.js';
import {TYPES, CITIES, DESCRIPTIONS, URL_PICTURES} from '../const.js';

const INTERVAR_OF_DAYS = 20;

export const generatePoint = () => {
  const dateFrom = generateDate(- INTERVAR_OF_DAYS, 0);
  const dateTo = generateDate(0, INTERVAR_OF_DAYS);

  const generateOffersIdArray = () => {
    const offersIdArray = [];
    let randomId = getRandomInteger(1, 5);

    for (let i = 0; i <= getRandomInteger(0, 3); i++) {
      offersIdArray.push(randomId);

      randomId = getRandomInteger(1, 5);
    }

    return offersIdArray;
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
