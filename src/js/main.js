window.onload = function () {
  'use strict';

  var game
    , ns = window['laberinto'];

  game = new Phaser.Game(1000, 700, Phaser.AUTO, 'laberinto-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game', ns.Game);

  game.state.start('boot');
};
