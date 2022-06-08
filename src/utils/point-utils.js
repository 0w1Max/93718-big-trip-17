import dayjs from 'dayjs';
import {FilterType} from '../const.js';

const isCurrentDate = (date) => dayjs(date).isSame(dayjs(), 'minute');
const isPastDate = (date) => dayjs(date).isBefore(dayjs(), 'minute');
const isFutureDate = (date) => dayjs(date).isAfter(dayjs(), 'minute');

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

const sortEventDay = (points) => points.sort((first, second) => second.dateFrom - first.dateFrom);

const sortEventPrice = (pointA, pointB) => pointB.price - pointA.price;

export {
  isFavoriteClass,
  isCheckedType,
  isCheckedOffer,
  filter,
  updateItem,
  sortEventTime,
  sortEventPrice,
  sortEventDay
};
