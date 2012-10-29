var _ = require('lodash')
  , Card = require('./card.js').Card
  , config = require('../config.js').config;

function Deck(cards) {
  this.cards = cards;
}

Deck.prototype.shuffle = function() {
  this.cards = _.shuffle(this.cards);
  return this;
};

Deck.prototype.draw = function() {
  return this.cards.shift();
};

Deck.prototype.toJSON = function() {
  return _.map(this.cards, function (card) {
    return card.toJSON();
  });
};

Deck.standardDeck = (function () {
  var symbols = _.keys(config.symbolToValue)
    , templateCards = _.chain(config.suits).map(function (suit) {
        return _.map(symbols, function (symbol) {
          return new Card(suit, symbol);
        });
      }).flatten().value();
  return function (numberOfDecks) {
    var cards = _.chain(_.range(numberOfDecks || 1)).map(function () {
        return templateCards;
      }).flatten().value();
    return new Deck(cards);
  };
}());

exports.Deck = Deck;