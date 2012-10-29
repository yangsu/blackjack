var _ = require('lodash')
  , Card = require('../models/card')
  , Deck = require('../models/deck')
  , Hand = require('../models/hand')
  , Shoe = require('../models/shoe');

exports.index = function(req, res){
  var c1 = new Card('Spades', 'A');
  var c2 = new Card('Spades', 'A');
  var h = new Hand(c1, c2);
  h.addCard(c1);
  var d = Deck.standardDeck(3);
  var s = new Shoe(1, 0);
  var cards = _.map(_.range(65), function () {
    return s.draw();
  });
  res.send({
    l: cards.length,
    c: cards,
    ul: _.unique(cards).length,
    u: _.unique(cards)
  });
};