var _ = require('lodash')
  , Card = require('../models/card.js').Card;

exports.index = function(req, res){
  res.send(new Card('Spades', '10').toJSON());
};