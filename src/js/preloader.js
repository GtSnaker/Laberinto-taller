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

      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');

      this.load.image('portada00', 'assets/Portada00.png');
      this.load.image('portada01', 'assets/Portada01.png');    
      this.load.image('textBox', 'assets/textElements/cajaDeTexto.png');
      this.load.image('unicornio', 'assets/characters/unicornio/unicornioPeta.png');
      this.load.image('slender', 'assets/slender.png');
      this.load.image('flecha', 'assets/textElements/flecha.png');
      this.load.image('degradado', 'assets/degradado.png');
      this.load.image('antorcha', 'assets/antorcha.png');
      this.load.image('piedra', 'assets/piedra.png');
      this.load.image('itemBox', 'assets/cajaItems.png');
      this.load.image('orbBox', 'assets/cajaOrbes.png');
      this.load.image('negro', 'assets/negro.png');
      this.load.image('pcBig', 'assets/pcChar.png');
      this.load.image('verticalFence', 'assets/vallaVertical.png');
      this.load.image('sword', 'assets/sword.png');
      this.load.image('diabloChar', 'assets/diabloChar.png');
      this.load.image('horizontalFence', 'assets/vallaHorizontal.png');
      
      this.load.spritesheet('player', 'assets/jimbo.png', 39.5, 52.7);
      this.load.spritesheet('unicornioPlayer', 'assets/unicornio.png', 295, 446);
      this.load.spritesheet('slenderBoy', 'assets/slenderBoy.png', 339, 324);
      this.load.spritesheet('deku', 'assets/deku.png', 28, 38);
      this.load.spritesheet('play', 'assets/botones.png', 366, 62);
      this.load.spritesheet('pc', 'assets/pc.png', 271, 257);
      this.load.spritesheet('torch', 'assets/torch.png', 55.4, 75);
      this.load.spritesheet('diablo', 'assets/diablo.png', 419, 459);

      this.game.load.audio('music1', ['assets/sound/music1.mp3']);
      this.game.load.audio('music2', ['assets/sound/music2.mp3']);

      this.load.tilemap('map', 'assets/centralMap.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('tiles', 'assets/fixedMap.png');
      this.load.tilemap('mapGreen', 'assets/mapFixedGreen.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('tilesGreen', 'assets/tilesetFixedGreen.png');
      this.load.tilemap('mapBlack', 'assets/mapBlack.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('tilesBlack', 'assets/tilesetFixedBlack.png');
      this.load.tilemap('mapYellow', 'assets/mapFixedYellow.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('tilesYellow', 'assets/tilesetFixedYellow.png');
      this.load.tilemap('mapRed', 'assets/tilemapRed.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('tilesRed', 'assets/tilesetRed.png');
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
