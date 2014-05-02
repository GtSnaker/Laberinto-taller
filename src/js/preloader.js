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

      this.load.image('portada00', 'assets/Portada00.png');
      this.load.image('portada01', 'assets/Portada01.png');
      this.load.spritesheet('player', 'assets/jimmy_basico.png', 50, 73);
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
      this.load.image('textBox', 'assets/textElements/cajaDeTexto.png');
      this.load.image('unicornio', 'assets/characters/unicornio/unicornioPeta.png');
      this.load.spritesheet('unicornioPlayer', 'assets/unicornio.png', 295, 446);
      this.load.spritesheet('slenderBoy', 'assets/slenderBoy.png', 339, 324);
      this.load.image('flecha', 'assets/textElements/flecha.png');
      this.load.image('play', 'assets/Barra_jugar.png');
      this.game.load.audio('music1', ['assets/sound/music1.mp3']);
      this.game.load.audio('music2', ['assets/sound/music2.mp3']);

      this.load.tilemap('map', 'assets/centralMap.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('tiles', 'assets/fixedMap.png');
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
