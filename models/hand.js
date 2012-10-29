var _ = require('lodash');

function calculateValue(cards) {
  var numOfAces = 0
    , sum = _.reduce(cards, function (memo, card) {
        if (card.symbol == 'A') {
          numOfAces += 1;
        }
        return memo + card.value;
      }, 0)
    , values = [];

  // The minimum hand value is 2
  if (sum > 1 && sum <= 21) {
    values.push(sum);
  }

  // Account for Aces that can be 1 or 11
  for (var i = 0; i < numOfAces; i += 1) {
    // subtracting 10 for each of the Aces since their value is assumed to be 11
    sum -= 10;
    if (sum > 1 && sum <= 21) {
      values.push(sum);
    }
  }

  return values;
}

function Hand(bottomCard, topCard) {
  this.cards = [bottomCard, topCard];
  this.value = calculateValue(this.cards);
}

Hand.prototype.getVisibleCards = function() {
  return _.map(this.cards.slice(1), function (card) {
    return card.toJSON();
  });
};

Hand.prototype.addCard = function(card) {
  this.cards.push(card);
  this.value = calculateValue(this.cards);
  return this;
};

Hand.prototype.getValue = function() {
  return this.value;
};

Hand.prototype.toJSON = function() {
  return {
    value: this.value,
    cards: _.map(this.cards, function (card) {
      return card.toJSON();
    })
  };
};

module.exports = Hand;