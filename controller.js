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
    res.render('index', { link: '/start' });
  });

  app.get('/start', function(req, res) {
    var gameId = genId(config.gameIdLength)
    games[gameId] = new Blackjack().newRound();

    console.log('New game started: ' + gameId);

    // res.redirect('/game/' + gameId);
    res.render('start', { id: gameId });
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
      res.render('invalidid', { id : id });
    }
  });

  app.get('/game/:id/:action', function(req, res) {
    var id = req.params.id
      , action = req.params.action
      , game = games[id];
    if (!game) {
      res.render('invalidid', { id : id });
    } else if (!game[action]) {
      res.render('invalidaction', { action : action });
    } else {
      res.send(game[action]().toJSON());
    }
  });
}

module.exports = controller;