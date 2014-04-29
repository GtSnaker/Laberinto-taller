(function() {
  'use strict';

  function Dialogo1() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Dialogo1.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.box = this.add.sprite(x, y, 'textBox');
      this.box.x = 25;
      this.box.y = 435;


      this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

    onDown: function () {
      this.game.state.start('menu');
    }
  };

  window['laberinto'] = window['laberinto'] || {};
  window['laberinto'].Dialogo1 = Dialogo1;

}());
