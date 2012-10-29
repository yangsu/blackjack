var _ = require('lodash')
  , config = require('../config')
  , Card = require('./card')
  , Deck = require('./deck')
  , Hand = require('./hand')
  , Shoe = require('./shoe');

function Blackjack () {
  this.shoe = new Shoe(3);
  this.handNumber = 0;
}

Blackjack.prototype.newRound = function() {
  this.roundState = '';
  this.roundEnded = false;
  this.dealerStands = false;

  this.handNumber += 1;
  this.dealer = new Hand(this.shoe.draw(), this.shoe.draw());
  this.player = new Hand(this.shoe.draw(), this.shoe.draw());

  this.checkPlayer();
  this.checkDealer();

  return this;
};

Blackjack.prototype.endRound = function(message) {
  this.roundEnded = true;
  this.roundState = message;
};

Blackjack.prototype.playDealer = function() {
  if (!this.roundEnded && !this.dealerStands) {
    var dealerValue = this.dealer.getValue();
    // dealer must hit if his cards have values less than 17
    if (_.all(dealerValue, function (value) {
      return value < config.dealerHitThreashold
    })) {
      this.dealer.addCard(this.shoe.draw());
      this.roundState = 'Dealer hits';
      this.checkDealer();
    } else {
      this.roundState = 'Dealer stands';
      this.dealerStands = true;
    }
  }
};

Blackjack.prototype.hit = function() {
  if (!this.roundEnded) {
    this.player.addCard(this.shoe.draw());
    this.checkPlayer();
  }
  this.playDealer();
  return this;
};

Blackjack.prototype.stand = function() {
  if (!this.roundEnded) {
    this.playDealer();
    if (this.dealerStands) {
      var playerMax = _.max(this.player.getValue())
        , dealerMax = _.max(this.dealer.getValue())
        , message = '';

      if (playerMax > dealerMax) {
        message = 'You win!';
      } else if (playerMax === dealerMax) {
        message = 'Draw';
      } else {
        message = 'You lose!';
      }
      this.endRound(message);
    }
  }
  return this;
};

Blackjack.prototype.checkPlayer = function() {
  var handValue = this.player.getValue();
  // if there's no valid values, that means the player is busted
  if (handValue.length === 0) {
    this.endRound('You player is busted and you lose!');
  } else if (_.contains(handValue, 21)) {
    this.endRound('You have a BlackJack and you win!');
  } else {
    this.roundState = 'You can hit or stand.';
  }
};

Blackjack.prototype.checkDealer = function() {
  var dealerValue = this.dealer.getValue();
  // if there's no valid values, that means the player is busted
  if (dealerValue.length === 0) {
    this.endRound('Dealer\'s player is busted. You win!');
  } else if (_.contains(dealerValue, 21)) {
    this.endRound('Dealer has a BlackJack. You lose!');
  } else {
  }
};

Blackjack.prototype.toJSON = function() {
  return {
    handNumber: this.handNumber,
    state: this.roundState,
    dealer: this.dealer.getVisibleCards(),
    player: this.player.toJSON()
  };
};

module.exports = Blackjack;