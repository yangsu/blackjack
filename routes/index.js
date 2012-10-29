var _ = require('lodash')
  , Card = require('../models/card.js')
  , Deck = require('../models/deck.js')
  , Hand = require('../models/hand.js');

exports.index = function(req, res){
  var c1 = new Card('Spades', 'A');
  var c2 = new Card('Spades', 'A');
  var h = new Hand(c1, c2);
  h.addCard(c1);
  var d = Deck.standardDeck(3);
  res.send(h.getValue());
};