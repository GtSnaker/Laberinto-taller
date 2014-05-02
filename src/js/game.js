(function() {
  'use strict';

  function Game() {
    this.player = null;
    this.map;
    this.layer;
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.map = this.game.add.tilemap('map');
      this.map.addTilesetImage('tiles');
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

      this.unicornioPlayer = this.add.sprite(2555, 2400, 'unicornioPlayer');
      this.unicornioPlayer.anchor.setTo(0.5, 0.5);
      this.unicornioPlayer.scale.set(0.4)
      this.unicornioPlayer.animations.add('walk', [0,1], 1.8, true);
      // this.unicornioPlayer.pivot.x = 25;
      // this.unicornioPlayer.pivot.y = 36.5;

      this.player = this.add.sprite(2380, 2400, 'player');
      this.player.anchor.setTo(0.5, 0.5);

      this.player.animations.add('down', [3], 10, true);
      this.player.animations.add('left', [0], 10, true);
      this.player.animations.add('right', [1], 10, true);
      this.player.animations.add('up', [2], 10, true);
      this.player.animations.play('down');
        
      this.input.onDown.add(this.onInputDown, this);
      
      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
      this.game.physics.enable(this.unicornioPlayer, Phaser.Physics.ARCADE);

      this.unicornioPlayer.body.immovable = true;

      this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

      this.jugando = true;

      this.box = this.add.sprite(x, y, 'textBox');
      this.box.x = 25;
      this.box.y = 435;
      this.box.fixedToCamera = true;
      this.box.exists = false;

      this.giro90grados = 'El laberinto dira 90º  - 1 cuarto de vuelta';
      this.giro180grados = 'El laberinto gira 180º - 2 cuartos de vuelta';
      this.giro270grados = 'El laberinto gira 270º - 3 cuartos de vuelta';

      this.dialogoUno = '¡Hey! ¡Hola chico!\n¿Tú no eres algo pequeño para estar por aqui solo? \n¡No me digas que eres ese niño de la leyenda de la cueva! \n¡Ese que devora caballos y rompe piedras a mordiscos!\n¿Eres tú?';
      this.respuestasCharUno = '     Si, ¡témeme!\n\n     Mas o menos.\n\n     No sé de quién hablas.';
      this.dialogoUnicornioUnoUno = "[1] Vendrás en son de paz, ¿no? Bueno, \n¿quieres unas hierbas terapéuticas?\nLe vendrán bien a tu cabeza si te pierdes. \nYo me perdí, y aprendí muchas cosas, tantas, \nque no sabría qué pasaría si todas ellas \nfluyeran por mi cabeza sin unas terapéuticas. \n¿Bueno, quieres o no? Son 3.000dd's la unidad.";
      this.dialogoUnicornioUnoDos = "[2] Jo, chico. ¡Vaya decepción me he llevado! \n¿Te apetece sentarte aqui, \ny tomarte unas terapéuticas conmigo? \nSon sólo 3.000dd's la unidad.";
      this.dialogoUnicornioUnoTres = "[3] Menos mal. No sé que habría hecho si \nllega a aparecer ese monstruo por aqui. \nQuizá... le hubiera ofrecido unas terapéuticas.";
      this.respuestasCharDos = "     ¡¿3.000dd's?! ¿Estás fumao o qué? ¡Anda a pastar!\n\n     No, gracias, no tengo dinero.";
      this.dialogoUnicornioDosUno = 'El laberinto gira en el sentido de las agujas del reloj.';
      this.dialogoUnicornioDosDos = 'El laberinto gira en el sentido contrario de las agujas del reloj';

      this.contadorDialogo = 0;
      this.primerDialogo = false;
      this.segundoDialogo = false;
      this.tercerDialogo = false;
      this.cuartoDialogo = false;
      this.quintoDialogo = false;
      this.dialogoFinal = false;

      this.stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY,'', { fontSize: '84px', fill: '#fff' });
      this.dialogoText = this.game.add.text(40, 447, '', { fontSize: '34px', fill: '#fff' });
      this.dialogoText.fontSize = 27;
      this.dialogoText.fixedToCamera = true;
      this.textoTotal = '';
      this.ntotal = 0;
      this.timePerChar = 0;
      this.timeAhorita = 0;
      this.charBool = true;
      this.timeSelector = 0;
      this.timeContinue = 0;

      this.unicornioChar = this.add.sprite(x, y, 'unicornio');
      this.unicornioChar.x = 707;
      this.unicornioChar.y = 317;
      this.unicornioChar.fixedToCamera = true;
      this.unicornioChar.exists = false;

      this.selector3 = this.game.add.sprite(40, 565, 'flecha');
      this.selector3.scale.set(0.65);
      this.selector3.fixedToCamera = true;
      this.selector3.exists = false;
      this.selector2 = this.game.add.sprite(40, 505, 'flecha');
      this.selector2.scale.set(0.65);
      this.selector2.fixedToCamera = true;
      this.selector2.exists = false;
      this.selector1 = this.game.add.sprite(40, 445, 'flecha');
      this.selector1.scale.set(0.65);
      this.selector1.fixedToCamera = true;
      this.selector1.exists = false;

      this.respuesta1 = false; 
      this.respuesta2 = false;
      this.respuesta3 = false;

    },

    update: function () {
      var x, y, cx, cy, dx, dy, angle, scale;
      this.physics.arcade.collide(this.player, this.unicornioPlayer);
      this.physics.arcade.collide(this.player, this.layer);

      this.unicornioPlayer.animations.play('walk');

      x = this.input.position.x;
      y = this.input.position.y;
      cx = this.world.centerX;
      cy = this.world.centerY;

      if (this.jugando) {  
        this.player.body.collideWorldBounds = true;
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        this.moveChar();
      }
      else {
        this.dialogueUnicorn();
      }

      if(this.time.now - this.timeContinue > 1000){
        this.continueTexting();
      }
      
    //AQUI TERMINAMOS LA FUNCION UPDATE
    },

    onInputDown: function () {
    },

    //FUNCION QUE PERMITE EL MOVIMIENTO DEL PERSONAJE
    moveChar:function(){
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

    //DIALOGOS CON EL UNICORNIO
    dialogueUnicorn:function(){
        this.stateText.anchor.setTo(0.5, 0.5);
        this.stateText.visible = false;

        if(this.primerDialogo){
          this.textizador(this.dialogoUno, 6000);
          this.dialogoText.text = this.textoTotal;
        }

        else if(this.segundoDialogo){
          this.textizador(this.respuestasCharUno, 1800);
          this.dialogoText.text = this.textoTotal;
          this.selection3();
        }

        else if(this.tercerDialogo){
          if(this.respuesta1){
            this.textizador(this.dialogoUnicornioUnoUno, 2500);
          }
          else if(this.respuesta2){
            this.textizador(this.dialogoUnicornioUnoDos, 2500);
          }
          else if(this.respuesta3){
            this.textizador(this.dialogoUnicornioUnoTres, 2500);
          }
          this.dialogoText.text = this.textoTotal;
        }

        else if(this.cuartoDialogo){
          this.respuesta1 = false;
          this.respuesta2 = false;
          this.respuesta3 = false;
          this.textizador(this.respuestasCharDos, 1500);
          this.dialogoText.text = this.textoTotal;
          this.selection2();
        }
        
        else if(this.quintoDialogo){
          if(this.respuesta1){
            this.textizador(this.dialogoUnicornioDosUno, 1000);
            this.dialogoText.text = this.textoTotal;
          }
          else if(this.respuesta2){
            this.textizador(this.dialogoUnicornioDosDos, 1000);
            this.dialogoText.text = this.textoTotal;
          }
        }
    },

    //FUNCION QUE HACE QUE EL TEXTO SE MUEVA POCO A POCO
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

    //TRES SELECTORES
    selection3: function () {
      if(!this.selector1.exists && !this.selector2.exists && !this.selector3.exists) {
        this.selector1.exists = true;
        this.timeSelector = this.time.now;
      }
      if (this.time.now - this.timeSelector > 500){
        if(this.selector1.exists) {
          if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            this.selector2.exists = true;
            this.selector1.exists = false;
            this.timeSelector = this.time.now;
          }
          else if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.selector1.exists = false;
            this.selector3.exists = true;
            this.timeSelector = this.time.now;
          }
        }
        else if(this.selector2.exists) {
          if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            this.selector2.exists = false;
            this.selector3.exists = true;
            this.timeSelector = this.time.now;
          }
          else if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.selector1.exists = true;
            this.selector2.exists = false;
            this.timeSelector = this.time.now;
          }
        }
        else if (this.selector3.exists) {
          if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            this.selector1.exists = true;
            this.selector3.exists = false;
            this.timeSelector = this.time.now;
          }
          else if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.selector3.exists = false;
            this.selector2.exists = true;
            this.timeSelector = this.time.now;
          }
        }
      }
    },

    //DOS SELECTORES
    selection2: function () {
      if(!this.selector1.exists && !this.selector2.exists && !this.selector3.exists) {
        this.selector1.exists = true;
        this.timeSelector = this.time.now;
      }
      if (this.time.now - this.timeSelector > 500){
        if(this.selector1.exists) {
          if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            this.selector2.exists = true;
            this.selector1.exists = false;
            this.timeSelector = this.time.now;
          }
          else if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.selector1.exists = false;
            this.selector2.exists = true;
            this.timeSelector = this.time.now;
          }
        }
        else if(this.selector2.exists) {
          if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            this.selector2.exists = false;
            this.selector1.exists = true;
            this.timeSelector = this.time.now;
          }
          else if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.selector1.exists = true;
            this.selector2.exists = false;
            this.timeSelector = this.time.now;
          }
        }
      }
    },

    //AVANZA EN LAS CONVERSACIONES DEL TEXTO
    continueTexting:function(){
      if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER))
      {
        this.timeContinue = this.time.now;
        this.textoTotal = '';
        this.timeAhorita = this.time.now;
        this.ntotal = 0;
        if(this.jugando) {
          this.jugando = false;
          this.primerDialogo = true;
          this.box.exists = true;
          this.unicornioChar.exists = true;
        }
        else if(this.primerDialogo) {
          this.primerDialogo = false;
          this.segundoDialogo = true;
        }
        else if(this.segundoDialogo) {
          this.segundoDialogo = false;
          this.tercerDialogo = true;
        }
        else if(this.tercerDialogo) {
          this.tercerDialogo = false;
          this.cuartoDialogo = true;
        }
        else if(this.cuartoDialogo) {
          this.cuartoDialogo = false;
          this.quintoDialogo = true;
        }
        else if(this.quintoDialogo) {
          this.quintoDialogo = false;
          this.dialogoFinal = true;
        }
        else if(this.dialogoFinal){
          this.respuesta1 = false;
          this.respuesta2 = false;
          this.respuesta3 = false;
          this.dialogoFinal = false;
          this.jugando = true;
          this.box.exists = false;
          this.unicornioChar.exists = false;
          this.dialogoText.text = '';
        }

        if (this.selector1.exists){
          this.selector1.exists = false;
          this.respuesta1 = true;
          this.onInputDown();
        }
        else if (this.selector2.exists){
          this.selector2.exists = false;
          this.respuesta2 = true;
          this.onInputDown();
        }
        else if (this.selector3.exists){
          this.selector3.exists = false;
          this.respuesta3 = true;
          this.onInputDown();
        }
      }
    },

    // distance: function (uno, dos) {
    //   return Math.sqrt((uno.x-dos.x)*(uno.x-dos.x)+(uno.y-dos.y)*(uno.y-dos.y));
    // },

  };

  window['laberinto'] = window['laberinto'] || {};
  window['laberinto'].Game = Game;

}());
