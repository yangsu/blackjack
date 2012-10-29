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
    // special case for Aces
    value: (this.value == 11) ? [1, 11] : this.value
  };
};

module.exports = Card;