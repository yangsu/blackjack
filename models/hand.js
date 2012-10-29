var _ = require('lodash');

function Hand(card1, card2) {
  this.cards = [card1, card2];
}

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

Hand.prototype.addCard = function(card) {
  this.cards.push(card);
};

Hand.prototype.getValue = function() {
  return calculateValue(this.cards);
};

Hand.prototype.toJSON = function() {
  return _.map(this.cards, function (card) {
    return card.toJSON();
  });
};

exports.Hand = Hand;