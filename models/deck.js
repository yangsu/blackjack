var _ = require('lodash');

function Deck(cards) {
  this.cards = cards;
}

Deck.prototype.shuffle = function() {
  this.cards = _.shuffle(this.cards);
};

Deck.prototype.draw = function() {
  return this.cards.shift();
};

Deck.prototype.toJSON = function() {
  return _.map(this.cards, function (card) {
    return card.toJSON();
  });
};

exports.Deck = Deck;