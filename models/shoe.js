var _ = require('lodash')
  , config = require('../config')
  , Card = require('./card')
  , Deck = require('./deck');

function Shoe(numberOfDecks, shuffleThreshold) {
  this.deck = Deck.standardDeck(numberOfDecks).shuffle();

  // this.deck = new Deck(_.map(_.range(10), function () {
  //   return new Card('Spades', 'A');
  // }));

  // when the number of cards left in the deck <= threshold, the deck shuffles
  this.threshold = shuffleThreshold || config.defaultThreshold;
}

Shoe.prototype.draw = function() {
  if (this.deck.getNumberOfCardsRemaining() <= this.threshold) {
    this.deck.shuffle();
  }
  return this.deck.draw();
};

module.exports = Shoe;