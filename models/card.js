var _ = require('lodash')
  , config = require('../config.js').config;

function Card(suit, card) {
  if (!_.contains(config.suits, suit)) {
    throw new Error("Invalid Suit: " + suit);
  } else if (config.valuemap[card] === undefined) {
    throw new Error("Card must be A - K, and not " + card);
  }

  this.suit = suit;
  this.card = card;
  this.value = config.valuemap[card];
};

Card.prototype.toJSON = function() {
  return {
    suit: this.suit,
    card: this.card,
    value: this.value
  };
};

exports.Card = Card;