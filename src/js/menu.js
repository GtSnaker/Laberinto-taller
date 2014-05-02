(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Menu.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.portada01 = this.add.sprite(0,0, 'portada01');
      this.portada00 = this.add.sprite(0,0, 'portada00');
      this.portada00.alpha = 1;
      this.game.add.tween(this.portada00).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 1, 1000, true);
      this.timeFading = this.time.now;

      this.buttonPlay = this.add.sprite(0, 600, 'play');
      this.buttonPlay.exists = false;

      this.musicPlaying = false;
      if(!this.musicPlaying) {
        this.music = this.game.add.audio('music2', 1, true);
        this.music.play('', 0, 1, true);
        this.musicPlaying = true;
      }


      // this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'Example Game' );
      // this.titleTxt.align = 'center';
      // this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;

      // y = y + this.titleTxt.height + 5;
      // this.startTxt = this.add.bitmapText(x, y, 'minecraftia', 'START');
      // this.startTxt.align = 'center';
      // this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {
      if(this.time.now - this.timeFading > 6000){
        this.portada00.exists = false;
        this.buttonPlay.exists = true;
      }
    },

    onDown: function () {
      this.game.state.start('game');
    }
  };

  window['laberinto'] = window['laberinto'] || {};
  window['laberinto'].Menu = Menu;

}());
