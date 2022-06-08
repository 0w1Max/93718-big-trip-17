import {getRandomInteger} from './common-utils.js';
import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YY HH:MM';

const generateDate = (start = - 20, end = 20) =>
  dayjs()
    .add(getRandomInteger(start, end), 'day')
    .add(getRandomInteger(start, end), 'minute')
    .toDate();

const getDate = (currentDate, format = DATE_FORMAT) => dayjs(currentDate).format(format);

const showEventDuration = (dateTo, dateFrom) => {
  const durationInMinutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');
  const days = Math.floor(durationInMinutes / 60 / 24);
  const hours = Math.floor(durationInMinutes / 60 - days * 24);
  const minutes = durationInMinutes - (days * 24 * 60 + hours * 60);

  if (days !== 0 && hours !== 0) {
    return `${days}D ${hours}H ${minutes}M`;
  } else if (days === 0 && hours !== 0) {
    return `${hours}H ${minutes}M`;
  } else {
    return `${minutes}M`;
  }
};

export {generateDate, getDate, showEventDuration};
