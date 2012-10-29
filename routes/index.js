var _ = require('lodash')
  , Card = require('../models/card.js').Card
  , Deck = require('../models/deck.js').Deck;

exports.index = function(req, res){
  var c = new Card('Spades', 'J');
  var d = Deck.standardDeck(3);
  res.send(d.shuffle().toJSON());
};