import {TYPES, CITIES, DESCRIPTIONS, URL_PICTURES} from '../const.js';

export const generatePoint = () => ({
    price: 1100,
    dateFrom: "2019-07-10T22:55:56.845Z",
    dateTo: "2019-07-11T11:22:13.375Z",
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
});
