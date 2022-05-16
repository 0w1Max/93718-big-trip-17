const generateOffer = () => ({
    id: 1,
    title: "Upgrade to a business class",
    price: 120
});

const generateOffersType = () => ({
    type: "taxi",
    offers: '$Array<$Offer>'
});

export {generateOffer, generateOffersType};
