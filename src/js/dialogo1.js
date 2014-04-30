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

      this.giro90grados = 'El laberinto dira 90º  - 1 cuarto de vuelta';
      this.giro180grados = 'El laberinto gira 180º - 2 cuartos de vuelta';
      this.giro270grados = 'El laberinto gira 270º - 3 cuartos de vuelta';

      this.dialogoUno = '¡Hey! ¡Hola chico!\n¿Tú no eres algo pequeño para estar por aqui solo? \n¡No me digas que eres ese niño de la leyenda de la cueva! \n¡Ese que devora caballos y rompe piedras a mordiscos!\n¿Eres tú?';
      this.respuestasCharUno = '     Si, ¡témeme!\n\n     Mas o menos.\n\n     No sé de quién hablas.';
      this.respuestaUnicornioUno = "[1] Vendrás en son de paz, ¿no? Bueno, \n¿quieres unas hierbas terapéuticas?\nLe vendrán bien a tu cabeza si te pierdes. \nYo me perdí, y aprendí muchas cosas, tantas, \nque no sabría qué pasaría si todas ellas \nfluyeran por mi cabeza sin unas terapéuticas. \n¿Bueno, quieres o no? Son 3.000dd's la unidad.";
      this.respuestaUnicornioDos = "[2] Jo, chico. ¡Vaya decepción me he llevado! \n¿Te apetece sentarte aqui, \ny tomarte unas terapéuticas conmigo? \nSon sólo 3.000dd's la unidad.";
      this.respuestaUnicornioTres = "[3] Menos mal. No sé que habría hecho si \nllega a aparecer ese monstruo por aqui. \nQuizá... le hubiera ofrecido unas terapéuticas.";

      this.contadorDialogo = 0;
      this.primerDialogo = true;
      this.segundoDialogo = false;
      this.tercerDialogo = false;


      this.stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY,'', { fontSize: '84px', fill: '#fff' });
      this.dialogoText = this.game.add.text(40, 447, '', { fontSize: '34px', fill: '#fff' });
      this.dialogoText.fontSize = 27;
      this.textoTotal = '';
      this.ntotal = 0;
      this.timePerChar = 0;
      this.timeAhorita = 0;

      this.charBool = true;

      this.unicornioChar = this.add.sprite(x, y, 'unicornioPeta');
      this.unicornioChar.x = 707;
      this.unicornioChar.y = 317;
      
      // AQUI ESTAN LAS COORDENADAS EXACTAS DONDE DEBE APARECER EL SLENDER EN SU PANTALLA DE DIALOGO
      // this.slenderChar = this.add.sprite(x, y, 'slenderBoy');
      // this.slenderChar.x = 729;
      // this.slenderChar.y = 317;
      //this.slenderChar.exists = false;

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {
      
      this.stateText.anchor.setTo(0.5, 0.5);
      this.stateText.visible = false;

      if(this.primerDialogo){
        this.textizador(this.dialogoUno, 6000);
        this.dialogoText.text = this.textoTotal;
      }
      else if(this.segundoDialogo){
        this.textizador(this.respuestasCharUno, 1800);
        this.dialogoText.text = this.textoTotal;
        //if respuesta uno -->true primera respuesta
        //if respuesta dos -->true segunda respuesta
        //if respuesta tres -->true tercera respuesta
      }
      else if(this.tercerDialogo){
        //if primera respuesta true -->respuestaUnicornioUno
        //if segunda respuesta true-->respuestaUnicornioDos
        //if tercera respuesta true-->respuestaUnicornioTres
        this.textizador(this.respuestaUnicornioTres, 2500);
        this.dialogoText.text = this.textoTotal;
      }

            
      
      //console.log(this.textizador(this.dialogoUno, 5000));   
    },

    onDown: function () {
      this.textoTotal = '';
      this.timeAhorita = this.time.now;
      this.ntotal = 0;
      if(this.primerDialogo) {
        this.primerDialogo = false;
        this.segundoDialogo = true;
      }
      else if(this.segundoDialogo) {
        this.segundoDialogo = false;
        this.tercerDialogo = true;
      }
      
    },

    // función que transforma this.textoTotal en la variable string que se le pase por primer parámetro
    // Tiempo en milisegundos en los que se ejecuta, pasado en milisegundos en el segundo parámetro
    textizador: function (texto, tiempo) {
      this.ncaracteres = texto.length;
      this.timePerChar = tiempo / this.ncaracteres;
      if (this.ntotal < this.ncaracteres){
        if ((this.time.now - this.timeAhorita) > this.timePerChar) {
          this.textoTotal += texto[this.ntotal];
          this.ntotal++;
          this.timeAhorita = this.time.now;
        }
      }
    },

  };

  window['laberinto'] = window['laberinto'] || {};
  window['laberinto'].Dialogo1 = Dialogo1;

}());
