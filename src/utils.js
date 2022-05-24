import dayjs from 'dayjs';
import {ID_COUNT} from './const.js';

const DATE_FORMAT = 'DD/MM/YY hh:mm';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDate = (start = - 20, end = 20) =>
  dayjs()
    .add(getRandomInteger(start, end), 'day')
    .toDate();

const getDate = (currentDate, format = DATE_FORMAT) => dayjs(currentDate).format(format);

const isFavoriteClass = (isFavorite) =>
  isFavorite
    ? 'event__favorite-btn--active'
    : '';

const isCheckedType = (randomType, elementType) =>
  randomType === elementType
    ? 'checked'
    : '';

const isCheckedOffer = (pointIdArray, offerId) =>
  pointIdArray.includes(offerId)
    ? 'checked'
    : '';

class RandomIdSet {
  idSet = new Set();

  random = (min, max) => {
    this.randomId = getRandomInteger(min, max);

    return this.randomId;
  };

  getId = () => {
    let id = this.random(1, ID_COUNT);

    while (this.idSet.has(id) === true) {
      id = this.random(1, ID_COUNT);
    }

    this.idSet.add(this.randomId);

    return this.randomId;
  };
}

export {
  getRandomInteger,
  generateDate,
  getDate,
  isFavoriteClass,
  isCheckedType,
  isCheckedOffer,
  RandomIdSet
};
