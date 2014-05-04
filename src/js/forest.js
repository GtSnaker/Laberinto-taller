(function() {
  'use strict';

  function Forest() {
    this.player = null;
    this.map;
    this.layer;
  }

  Forest.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.map = this.game.add.tilemap('mapGreen');
      this.map.addTilesetImage('tilesGreen');

      this.map.setCollision(1);
      this.map.setCollision(2);
      this.map.setCollision(3);
      this.map.setCollision(4);
      this.map.setCollision(6);
      this.map.setCollision(7);
      this.map.setCollision(8);
      this.map.setCollision(9);
      this.map.setCollision(10);
      this.map.setCollision(11);
      this.map.setCollision(12);
      this.map.setCollision(13);
      this.map.setCollision(14);

      this.layer = this.map.createLayer('Capa de Patrones 1');     
      this.layer.resizeWorld();

      this.player = this.add.sprite(2380, 2400, 'player');
      this.player.anchor.setTo(0.5, 0.5);

      this.player.animations.add('down', [3], 10, true);
      this.player.animations.add('left', [0], 10, true);
      this.player.animations.add('right', [1], 10, true);
      this.player.animations.add('up', [2], 10, true);
      this.player.animations.play('down');
      this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);


      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

      this.degradado = this.add.sprite(0,0,'degradado');
      this.degradado.fixedToCamera = true;

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {
      this.physics.arcade.collide(this.player, this.layer);

      this.moveChar();
    },

    onDown: function () {
      
    },

    moveChar:function(){
      this.player.body.collideWorldBounds = true;
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;

      if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
          this.player.animations.play('left');
          this.player.body.velocity.x = -600;
        }
        if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
          this.player.animations.play('right');
          this.player.body.velocity.x = 600;
        }
        if (this.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
          this.player.animations.play('up');
          this.player.body.velocity.y= -600;
        }
        if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
          this.player.animations.play('down');
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
  };

  window['laberinto'] = window['laberinto'] || {};
  window['laberinto'].Forest = Forest;

}());
