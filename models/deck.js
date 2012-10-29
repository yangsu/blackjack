var _ = require('lodash')
  , Card = require('./card.js')
  , config = require('../config.js');

function Deck(cards) {
  this.cards = cards;
  this.currentCardIndex = 0;
}

Deck.prototype.shuffle = function() {
  this.cards = _.shuffle(this.cards);
  this.currentCardIndex = 0;
  return this;
};

Deck.prototype.getNumberOfCardsRemaining = function() {
  return this.cards.length - this.currentCardIndex;
};

Deck.prototype.draw = function() {
  return this.cards[this.currentCardIndex++];
};

Deck.prototype.toJSON = function() {
  return _.map(this.cards, function (card) {
    return card.toJSON();
  });
};

Deck.standardDeck = (function () {
  // get all symbols A-K
  var symbols = _.keys(config.symbolToValue)
  // for each suit, construct a card for each of the symbols => 1 deck
    , templateCards = _.chain(config.suits)
        .map(function (suit) {
          return _.map(symbols, function (symbol) {
            return new Card(suit, symbol);
          });
        })
        .flatten()
        .value();

  // Allow multiple standard decks to be constructed as a single deck
  return function (numberOfDecks) {
    var cards = _.chain(_.range(numberOfDecks || 1))
      .map(function () {
        return templateCards;
      })
      .flatten()
      .value();
    return new Deck(cards);
  };
}());

module.exports = Deck;