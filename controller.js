var _ = require('lodash')
  , config = require('./config')
  , Card = require('./models/card')
  , Deck = require('./models/deck')
  , Hand = require('./models/hand')
  , Shoe = require('./models/shoe');

var gameState = {};

var genId = function(l) {
  var id = '';
  for (var i = 0; i < l; i += 1) {
    id += config.gameIdCharset[Math.floor(Math.random() * config.gameIdCharset.length)];
  }
  return id;
}

function controller (params) {
  var app = params.app;

  app.get('/', function(req, res){
    res.send('Welcome to Blackjack! Go to <a href="/start">/start</a> to begin');
  });

  app.get('/start', function(req, res) {
    var gameId = genId(config.gameIdLength)
      , newShoe = new Shoe(3)
      , card1 = newShoe.draw()
      , card2 = newShoe.draw();

    gameState[gameId] = {
      shoe: newShoe,
      hand: new Hand(card1, card2)
    };

    console.log('New game started: ' + gameId);

    res.redirect('/game/' + gameId);
  });

  app.get('/game', function(req, res) {
    res.send('You must have a game id to play the game');
  });

  app.get('/game/:id', function(req, res) {
    var id = req.params.id
      , state = gameState[id];
    if (state) {
      res.send(state.hand.toJSON());
    } else {
      res.send('Invalid game id: ' + id);
    }
  });

  app.get('/game/:id/hit', function(req, res) {
    var id = req.params.id
      , state = gameState[id];
    if (state) {
      state.hand.addCard(state.shoe.draw());
      res.send(state.hand.toJSON());
    } else {
      res.send('Invalid game id: ' + id);
    }
  });
}

module.exports = controller;