var _ = require('lodash')
  , config = require('./config')
  , Blackjack = require('./models/blackjack');

var games = {};

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

    games[gameId] = new Blackjack;

    console.log('New game started: ' + gameId);

    res.redirect('/game/' + gameId);
  });

  app.get('/game', function(req, res) {
    res.send('You must have a game id to play the game');
  });

  app.get('/game/:id', function(req, res) {
    var id = req.params.id
      , game = games[id];
    if (game) {
      res.send(game.toJSON());
    } else {
      res.send('Invalid game id: ' + id);
    }
  });

  app.get('/game/:id/hit', function(req, res) {
    var id = req.params.id
      , game = games[id];
    if (game) {
      game.hit();
      res.send(game.toJSON());
    } else {
      res.send('Invalid game id: ' + id);
    }
  });

  app.get('/game/:id/stand', function(req, res) {
    var id = req.params.id
      , game = games[id];
    if (game) {
      game.stand();
      res.send(game.toJSON());
    } else {
      res.send('Invalid game id: ' + id);
    }
  });
}

module.exports = controller;