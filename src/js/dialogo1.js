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

      this.charBool = true;

      this.box = this.add.sprite(x, y, 'textBox');
      this.box.x = 25;
      this.box.y = 435;
      this.unicornioChar = this.add.sprite(x, y, 'unicornioPeta');
      this.unicornioChar.x = 707;
      this.unicornioChar.y = 317;
      this.slenderChar = this.add.sprite(x, y, 'slenderBoy');
      this.slenderChar.x = 729;
      this.slenderChar.y = 317;
      this.slenderChar.exists = false;

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {
      
    },

    onDown: function () {
      this.charBool = !this.charBool;
      console.log(this.charBool);
      if (!this.charBool) {
        this.unicornioChar.exists = false;
        this.slenderChar.exists = true;
      }
      else {
        this.unicornioChar.exists = true;
        this.slenderChar.exists = false;
      }
    }
  };

  window['laberinto'] = window['laberinto'] || {};
  window['laberinto'].Dialogo1 = Dialogo1;

}());
