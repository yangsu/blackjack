var _ = require('lodash')
  , Card = require('../models/card.js').Card
  , Deck = require('../models/deck.js').Deck;

exports.index = function(req, res){
  var c = new Card('Spades', 'J');
  var d = new Deck([c, c, c]);
  res.send(d.toJSON());
};