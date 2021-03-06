var config = {
  suits: ['Spades', 'Diamonds', 'Clubs', 'Hearts'],
  symbolToValue: {
    'A' : 11,
    '2' : 2,
    '3' : 3,
    '4' : 4,
    '5' : 5,
    '6' : 6,
    '7' : 7,
    '8' : 8,
    '9' : 9,
    '10' : 10,
    'J' : 10,
    'Q' : 10,
    'K' : 10,
  },
  defaultThreshold: 0,

  gameIdLength: 10,
  gameIdCharset: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',

  dealerHitThreshold: 17,
  maxCardsInHand: 5
};

module.exports = config;