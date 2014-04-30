(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(320, 240, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      //this.load.image('player', 'assets/player.png');
      this.load.spritesheet('player', 'assets/jimmy_basico.png', 50, 73);
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
      this.load.image('textBox', 'assets/textElements/cajaDeTexto.png');
      this.load.image('unicornio', 'assets/characters/unicornio/unicornioPeta.png');
      this.load.image('unicornioPlayer', 'assets/characters/unicornio/unicornioSprite.png');
      this.load.image('slenderBoy', 'assets/characters/slender/slenderBoy.png');
      this.load.image('flecha', 'assets/textElements/flecha.png');
      this.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('tiles', 'assets/tileset.png');
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['laberinto'] = window['laberinto'] || {};
  window['laberinto'].Preloader = Preloader;

}());
