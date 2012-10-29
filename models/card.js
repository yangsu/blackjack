var _ = require('lodash')
  , config = require('../config');

function Card(suit, symbol) {
  if (!_.contains(config.suits, suit)) {
    throw new Error("Invalid Suit: " + suit);
  } else if (config.symbolToValue[symbol] === undefined) {
    throw new Error("Card must be A - K, and not " + symbol);
  }

  this.suit = suit;
  this.symbol = symbol;
  this.value = config.symbolToValue[symbol];
};

Card.prototype.toJSON = function() {
  return {
    suit: this.suit,
    symbol: this.symbol,
    value: this.value
  };
};

module.exports = Card;