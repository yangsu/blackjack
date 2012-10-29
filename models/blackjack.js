var _ = require('lodash')
  , Card = require('./card')
  , Deck = require('./deck')
  , Hand = require('./hand')
  , Shoe = require('./shoe');

function Blackjack () {
  this.shoe = new Shoe(3);
  this.dealer = new Hand(this.shoe.draw(), this.shoe.draw());
  this.hand = new Hand(this.shoe.draw(), this.shoe.draw());
}

Blackjack.prototype.hit = function() {
  this.hand.addCard(this.shoe.draw());
  this.dealer.addCard(this.shoe.draw());
};

Blackjack.prototype.stand = function() {
  this.dealer.addCard(this.shoe.draw());
};

Blackjack.prototype.toJSON = function() {
  return {
    dealer: this.dealer.getVisibleCards(),
    hand: this.hand.toJSON()
  };
};

module.exports = Blackjack;