var _ = require('lodash')
  , Card = require('../models/card.js')
  , Deck = require('../models/deck.js')
  , Hand = require('../models/hand.js')
  , Shoe = require('../models/shoe.js');

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