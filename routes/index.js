var _ = require('lodash')
  , Card = require('../models/card.js').Card
  , Deck = require('../models/deck.js').Deck
  , Hand = require('../models/hand.js').Hand;

exports.index = function(req, res){
  var c1 = new Card('Spades', 'A');
  var c2 = new Card('Spades', 'A');
  var h = new Hand(c1, c2);
  h.addCard(c1);
  var d = Deck.standardDeck(3);
  res.send(h.getValue());
};