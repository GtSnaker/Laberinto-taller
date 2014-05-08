(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
    this.portada01 = null;
    this.portada00 = null;
  }

  Menu.prototype = {

    create: function () {
     

      this.portada01 = this.add.sprite(0,0, 'portada01');
      this.portada00 = this.add.sprite(0,0, 'portada00');
      this.portada00.alpha = 1;
      this.game.add.tween(this.portada00).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 1, 1000, true);
      this.timeFading = this.time.now;

      this.buttonPlay = this.add.button(0, 600, 'play', function() {this.game.state.start('game');} , this, 1, 0);

      this.degradado = this.add.sprite(0,0,'degradado');

      this.musicPlaying = false;
      if(!this.musicPlaying) {
        this.music = this.game.add.audio('music1', 1, true);
        this.music.play('', 0, 1, true);
        this.musicPlaying = true;
      }

      this.input.onDown.add(this.onDown, this);
   
      var that = this;
      setTimeout(function(){ that.portada00.exists = false}, 6000);
    
    },

    update: function () {

    },

    onDown: function () {
      
    }
  };

  window['laberinto'] = window['laberinto'] || {};
  window['laberinto'].Menu = Menu;

}());
