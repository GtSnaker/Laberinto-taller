(function() {
  'use strict';

  function Game() {
    this.player = null;
    this.map;
    this.layer;
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.map = this.game.add.tilemap('map');
      this.map.addTilesetImage('tiles');
      this.layer = this.map.createLayer('Capa de Patrones 1');

      this.player = this.add.sprite(x, y, 'gokusito');
      this.player.anchor.setTo(0.5, 0.5);
      this.input.onDown.add(this.onInputDown, this);
      
      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
      this.layer.resizeWorld();

      this.camera.follow(this.player);
    },

    update: function () {

      var x, y, cx, cy, dx, dy, angle, scale;

      x = this.input.position.x;
      y = this.input.position.y;
      cx = this.world.centerX;
      cy = this.world.centerY;

      this.player.body.collideWorldBounds = true;
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;

      if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT))
      {
        this.player.body.velocity.x = -600;
      }
      if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
      {
        this.player.body.velocity.x = 600;
      }
      if (this.input.keyboard.isDown(Phaser.Keyboard.UP))
      {
        this.player.body.velocity.y= -600;
      }
      if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN))
      {
        this.player.body.velocity.y = 600;
      }
      if ((this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) && (this.input.keyboard.isDown(Phaser.Keyboard.UP)))
      {
        this.player.body.velocity.y = 0;
      }
      if ((this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) && (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)))
      {
        this.player.body.velocity.x = 0;
      }
    },

    onInputDown: function () {
      this.game.state.start('menu');
    }

  };

  window['laberinto'] = window['laberinto'] || {};
  window['laberinto'].Game = Game;

}());
