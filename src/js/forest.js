(function() {
  'use strict';

  function Forest() {
    this.player = null;
    this.map;
    this.layer;
  }

  Forest.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.map = this.game.add.tilemap('mapGreen');
      this.map.addTilesetImage('tilesGreen');

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

      this.jugando = true;

      this.layer = this.map.createLayer('Capa de Patrones 1');     
      this.layer.resizeWorld();

      this.unicornioPlayer = this.add.sprite(2555, 2400, 'unicornioPlayer');
      this.unicornioPlayer.anchor.setTo(0.5, 0.5);
      this.unicornioPlayer.scale.set(0.4)
      this.unicornioPlayer.animations.add('walk', [0,1], 1.8, true);

      this.itemBox = this.add.sprite(40, 570,'itemBox');
      this.itemBox.fixedToCamera = true;

      this.torchItem = this.add.sprite(50, 607, 'antorcha');
      this.torchItem.fixedToCamera = true;
      if (window['laberinto'].Global.torch){
        this.torchItem.exists = true;
      }
      else{
        this.torchItem.exists = false;
      }

      this.box = this.add.sprite(x, y, 'textBox');
      this.box.x = 25;
      this.box.y = 435;
      this.box.fixedToCamera = true;
      this.box.exists = false;

      switch(window['laberinto'].Global.fromGameToForest) {
        case 1:
        this.player = this.add.sprite(5948, 2271, 'player');
        break;
        case 2:
        this.player = this.add.sprite(5948, 4068, 'player');
        break;
        default: this.player = this.add.sprite(2380, 2400, 'player');
      }

      this.player.anchor.setTo(0.5, 0.5);

      this.player.animations.add('up',    [4, 8,  12, 16], 8, true);
      this.player.animations.add('down',  [5, 9,  13, 17], 8, true);
      this.player.animations.add('right', [6, 10, 14, 18], 8, true);
      this.player.animations.add('left',  [7, 11, 15, 19], 10, true);
      this.player.animations.add('stopUp',[0], 8, true);
      this.player.animations.add('stopDown',[1], 8, true);
      this.player.animations.add('stopRigt',[2], 8, true);
      this.player.animations.add('stopLeft',[3], 8, true);

      this.animationNow = 'stopDown';

      this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
      this.game.physics.enable(this.unicornioPlayer, Phaser.Physics.ARCADE);

      this.unicornioPlayer.body.immovable = true;

      this.degradado = this.add.sprite(0,0,'degradado');
      this.degradado.fixedToCamera = true;

      this.giro90grados = 'El laberinto dira 90º  - 1 cuarto de vuelta';
      this.giro180grados = 'El laberinto gira 180º - 2 cuartos de vuelta';
      this.giro270grados = 'El laberinto gira 270º - 3 cuartos de vuelta';

      this.dialogoUno = '¡Hey! ¡Hola chico!\n¿Tú no eres algo pequeño para estar por aqui solo? \n¡No me digas que eres ese niño de la leyenda de la cueva! \n¡Ese que devora caballos y rompe piedras a mordiscos!\n¿Eres tú?';
      this.respuestasCharUno = '     Si, ¡témeme!\n\n     Mas o menos.\n\n     No sé de quién hablas.';
      this.dialogoUnicornioUnoUno = "[1] Vendrás en son de paz, ¿no? Bueno, \n¿quieres unas hierbas terapéuticas?\nLe vendrán bien a tu cabeza si te pierdes. \nYo me perdí, y aprendí muchas cosas, tantas, \nque no sabría qué pasaría si todas ellas \nfluyeran por mi cabeza sin unas terapéuticas. \n¿Bueno, quieres o no? Son 3.000dd's la unidad.";
      this.dialogoUnicornioUnoDos = "[2] Jo, chico. ¡Vaya decepción me he llevado! \n¿Te apetece sentarte aqui, \ny tomarte unas terapéuticas conmigo? \nSon sólo 3.000dd's la unidad.";
      this.dialogoUnicornioUnoTres = "[3] Menos mal. No sé que habría hecho si \nllega a aparecer ese monstruo por aqui. \nQuizá... le hubiera ofrecido unas terapéuticas.";
      this.respuestasCharDos = "     ¡¿3.000dd's?! ¿Estás fumao o qué? ¡Anda a pastar!\n\n     No, gracias, no tengo dinero.";
      this.dialogoUnicornioDosUno = "¿Pero qué? No se puede ir por la vida asi, majo. \nToma esto y lárgate de aqui, \n¡#@¬&¬€! ¡#@€$%&! ¡$&$%!.";
      this.dialogoSiguiente = "¡Déjame en paz! ¡Largo!";

      this.hablado = false;
      this.dialogoSiguienteBool = false;
      this.contadorDialogo = 0;
      this.primerDialogo = false;
      this.segundoDialogo = false;
      this.tercerDialogo = false;
      this.cuartoDialogo = false;
      this.quintoDialogo = false;
      this.dialogoFinal = false;

      this.stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY,'', { fontSize: '84px', fill: '#fff' });
      this.dialogoText = this.game.add.text(40, 447, '', { fontSize: '34px', fill: '#fff'});
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

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {
      this.physics.arcade.collide(this.player, this.layer);
      this.physics.arcade.collide(this.player, this.unicornioPlayer);
      this.unicornioPlayer.animations.play('walk');


      if (this.player.x > 6000) {
        if (this.player.y > 3500) {
          window['laberinto'].Global.fromForestToGame = 1,
          this.game.state.start('game');
        }
        if (this.player.y < 3500) {
          window['laberinto'].Global.fromForestToGame = 2,
          this.game.state.start('game');
        }
      }



      if (this.jugando) {  
        this.moveChar();
      }
      else {
        this.dialogueUnicorn();
      }

      if(this.time.now - this.timeContinue > 1000){
        this.continueTexting();
      }
    },

    onDown: function () {
      
    },

    moveChar:function(){
      this.player.body.collideWorldBounds = true;
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;

      if( this.input.keyboard.isDown(Phaser.Keyboard.LEFT) &&
          this.input.keyboard.isDown(Phaser.Keyboard.DOWN))
      {
        this.player.body.velocity.x = -600;
        this.player.animations.play('down');
        this.animationNow = 'stopDown';
        this.player.body.velocity.y = 600;
      }
      else if( this.input.keyboard.isDown(Phaser.Keyboard.LEFT) &&
          this.input.keyboard.isDown(Phaser.Keyboard.UP))
      {
        this.player.body.velocity.x = -600;
        this.player.animations.play('up');
        this.animationNow = 'stopUp';
        this.player.body.velocity.y = -600;
      }  
      else if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT))
<<<<<<< HEAD
      {
          this.player.animations.play('left');
          this.animationNow = 'stopLeft';
          this.player.body.velocity.x = -600;
      }
=======
        {
          this.player.animations.play('left');
          this.animationNow = 'stopLeft';
          this.player.body.velocity.x = -600;
        }
>>>>>>> FETCH_HEAD
      if( this.input.keyboard.isDown(Phaser.Keyboard.RIGHT) &&
          this.input.keyboard.isDown(Phaser.Keyboard.DOWN))
      {
        this.player.body.velocity.x = 600;
        this.player.animations.play('down');
        this.animationNow = 'stopDown';
        this.player.body.velocity.y = 600;
      }
      else if( this.input.keyboard.isDown(Phaser.Keyboard.RIGHT) &&
          this.input.keyboard.isDown(Phaser.Keyboard.UP))
      {
        this.player.body.velocity.x = 600;
        this.player.animations.play('up');
        this.animationNow = 'stopUp';
        this.player.body.velocity.y = -600;
      }  
      else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
          this.player.animations.play('right');
          this.animationNow = 'stopRigt';
          this.player.body.velocity.x = 600;
        }
      if (this.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
          this.player.animations.play('up');
          this.animationNow = 'stopUp';
          this.player.body.velocity.y= -600;
        }
      if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
          this.player.animations.play('down');
          this.animationNow = 'stopDown';
          this.player.body.velocity.y = 600;
        }
      if ((this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) && (this.input.keyboard.isDown(Phaser.Keyboard.UP)))
        {
          this.player.body.velocity.y = 0;
          this.player.animations.play(this.animationNow);
        }
      if ((this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) && (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)))
        {
          this.player.body.velocity.x = 0;
          this.player.animations.play(this.animationNow);
        }
      if (!(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) && !(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) && !(this.input.keyboard.isDown(Phaser.Keyboard.UP)) && !(this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) ) {
        this.player.animations.play(this.animationNow);
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
        if ( (this.distance(this.player, this.unicornioPlayer)) < 125){
          this.timeContinue = this.time.now;
          this.textoTotal = '';
          this.timeAhorita = this.time.now;
          this.ntotal = 0;
          if(this.jugando) {
            this.jugando = false;
            if (!this.hablado){
              this.primerDialogo = true;
            }
            else if (this.hablado){
              this.dialogoSiguienteBool = true;
            }
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
            this.respuesta1 = false;
            this.respuesta2 = false;
            this.respuesta3 = false;
            this.jugando = true;
            this.box.exists = false;
            this.unicornioChar.exists = false;
            this.hablado = true;
            this.dialogoText.text = '';
          }
          else if (this.dialogoSiguienteBool) {
            this.dialogoSiguienteBool = false;
            this.jugando = true;
            this.box.exists = false;
            this.unicornioChar.exists = false;
            this.dialogoText.text = '';
          }
          if (this.selector1.exists){
            this.selector1.exists = false;
            this.respuesta1 = true;
          }
          else if (this.selector2.exists){ 
            this.selector2.exists = false;
            this.respuesta2 = true;
          }
          else if (this.selector3.exists){
            this.selector3.exists = false;
            this.respuesta3 = true;
          }
        }
      }
    },

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
              this.textizador(this.dialogoUnicornioDosUno, 2000);
              this.dialogoText.text = this.textoTotal;    
          }
          else if(this.dialogoSiguienteBool){
              this.textizador(this.dialogoSiguiente, 1000);
              this.dialogoText.text = this.textoTotal;
          }
    },

    distance: function (uno, dos) {
      var r = Math.sqrt((uno.x-dos.x)*(uno.x-dos.x)+(uno.y-dos.y)*(uno.y-dos.y));
      return r;
    },


  };

  window['laberinto'] = window['laberinto'] || {};
  window['laberinto'].Forest = Forest;

}());
