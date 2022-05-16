import dayjs from 'dayjs';

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
      .add(getRandomInteger(start, end), 'hour')
      .add(getRandomInteger(start, end), 'minute')
      .toDate();

  const getDate = (currentDate, format = DATE_FORMAT) => dayjs(currentDate).format(format);

  export {getRandomInteger, generateDate, getDate};
  