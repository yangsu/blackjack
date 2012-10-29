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
  this.dealer = new Hand(this.shoe.draw(), this.shoe.draw(), true);
  this.player = new Hand(this.shoe.draw(), this.shoe.draw());

  this.checkPlayer();
  this.checkDealer();

  return this;
};

Blackjack.prototype.endRound = function(message) {
  this.roundEnded = true;
  this.roundState = message;
  this.dealer.revealCards();
};

Blackjack.prototype.playDealer = function() {
  if (!this.roundEnded && !this.dealerStands) {
    var dealerValue = this.dealer.getValue();
    // dealer must hit if his cards have values less than the threshold
    if (_.max(dealerValue) < config.dealerHitThreshold) {
      this.dealer.addCard(this.shoe.draw());
      this.roundState = 'Dealer hits';
      this.checkDealer();

      if (this.dealer.getCount() === config.maxCardsInHand) {
        this.compareHands();
      }
    } else {
      this.roundState = 'Dealer stands';
      this.dealerStands = true;
    }
  }
};

Blackjack.prototype.compareHands = function() {
  if (!this.roundEnded) {
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
};

Blackjack.prototype.hit = function() {
  if (!this.roundEnded) {
    this.player.addCard(this.shoe.draw());
    this.checkPlayer();
  }
  this.playDealer();

  if (this.player.getCount() === config.maxCardsInHand) {
    this.compareHands();
  }

  return this;
};

Blackjack.prototype.stand = function() {
  this.playDealer();

  if (this.dealerStands) {
    this.compareHands();
  }

  return this;
};

Blackjack.prototype.checkPlayer = function() {
  var handValue = this.player.getValue();
  // if there's no valid values, that means the hand is busted
  if (handValue.length === 0) {
    this.endRound('You hand is busted and you lose!');
  } else if (_.contains(handValue, 21)) {
    this.endRound('You have a BlackJack and you win!');
  } else {
    this.roundState = 'You can hit or stand.';
  }
};

Blackjack.prototype.checkDealer = function() {
  var dealerValue = this.dealer.getValue();
  // if there's no valid values, that means the hand is busted
  if (dealerValue.length === 0) {
    this.endRound('Dealer\'s hand is busted. You win!');
  } else if (_.contains(dealerValue, 21)) {
    this.endRound('Dealer has a BlackJack. You lose!');
  } else {
  }
};

Blackjack.prototype.toJSON = function() {
  return {
    handNumber: this.handNumber,
    state: this.roundState,
    dealer: this.dealer.toJSON(),
    player: this.player.toJSON()
  };
};

module.exports = Blackjack;