import dayjs from 'dayjs';
import {ID_COUNT, FilterType} from './const.js';

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

const isCurrentDate = (date) => dayjs(date).isSame(dayjs(), 'minute');
const isPastDate = (date) => dayjs(date).isBefore(dayjs(), 'minute');
const isFutureDate = (date) => dayjs(date).isAfter(dayjs(), 'minute');

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) =>
    isCurrentDate(point.dateFrom) || isFutureDate(point.dateFrom)
    || isPastDate(point.dateFrom) && isFutureDate(point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastDate(point.dateTo)
  || isPastDate(point.dateFrom) && isFutureDate(point.dateTo)),
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const sortEventTime = (pointA, pointB) => {
  const durationDateA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationDateB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return durationDateB - durationDateA;
};

const sortEventPrice = (pointA, pointB) => pointB.price - pointA.price;

export {
  getRandomInteger,
  generateDate,
  getDate,
  isFavoriteClass,
  isCheckedType,
  isCheckedOffer,
  RandomIdSet,
  filter,
  updateItem,
  sortEventTime,
  sortEventPrice
};
