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
      
      this.timePerChar = 0;
      this.timeAhorita = 0;

      this.box = this.add.sprite(x, y, 'textBox');
      this.box.x = 25;
      this.box.y = 435;

      this.dialogoTotal = '¡Hey! ¡Hola chico!\n¿Tú no eres algo pequeño para estar por aqui solo? \n¡No me digas que eres ese niño de la leyenda de la cueva! \n¡Ese que devora caballos y rompe piedras a mordiscos!\n¿Eres tú?';
      this.stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY,'', { fontSize: '84px', fill: '#fff' });
      this.dialogoText = this.game.add.text(40, 450, '', { fontSize: '34px', fill: '#fff' });
      this.dialogoText.fontSize = 27;
      this.textoTotal = '';
      this.ntotal = 0;

      this.charBool = true;

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
      
      this.stateText.anchor.setTo(0.5, 0.5);
      this.stateText.visible = false;

      this.textizador(this.dialogoTotal, 6000);
      this.dialogoText.text = this.textoTotal;
      
      
      //console.log(this.textizador(this.dialogoTotal, 5000));   
    },

    onDown: function () {
      this.charBool = !this.charBool;
      if (!this.charBool) {
        this.unicornioChar.exists = false;
        this.slenderChar.exists = true;
      }
      else {
        this.unicornioChar.exists = true;
        this.slenderChar.exists = false;
      }
    },

    // función que transforma this.textoTotal en la variable string que se le pase por primer parámetro
    // Tiempo en milisegundos en los que se ejecuta, pasado en milisegundos en el segundo parámetro
    textizador: function (texto, tiempo) {
      this.ncaracteres = texto.length;
      this.timePerChar = tiempo / this.ncaracteres;
      if (this.ntotal < this.ncaracteres){
        if ((this.time.now - this.timeAhorita) > this.timePerChar) {
          this.textoTotal += this.dialogoTotal[this.ntotal];
          this.ntotal++;
          this.timeAhorita = this.time.now;
        }
      }
    },

  };

  window['laberinto'] = window['laberinto'] || {};
  window['laberinto'].Dialogo1 = Dialogo1;

}());
