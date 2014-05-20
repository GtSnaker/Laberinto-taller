(function() {
  'use strict';

  function Inferno() {
    this.player = null;
    this.map;
    this.layer;
  }

  Inferno.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.map = this.game.add.tilemap('mapRed');
      this.map.addTilesetImage('tilesRed');

      // this.map.setCollision(1);
      // this.map.setCollision(2);
      // this.map.setCollision(3);
      // this.map.setCollision(4);
      // this.map.setCollision(6);
      // this.map.setCollision(7);
      // this.map.setCollision(8);
      // this.map.setCollision(9);
      // this.map.setCollision(10);
      // this.map.setCollision(11);
      // this.map.setCollision(12);
      // this.map.setCollision(13);
      // this.map.setCollision(14);

      this.jugando = true;

      this.layer = this.map.createLayer('Capa de Patrones 1');     
      this.layer.resizeWorld();

      this.diabloPlayer = this.add.sprite(2555, 2400, 'diablo');
      this.diabloPlayer.anchor.setTo(0.5, 0.5);
      this.diabloPlayer.scale.set(0.4);
      this.diabloPlayer.animations.add('walk', [0,1], 1.8, true);

      this.itemBox = this.add.sprite(40, 570,'itemBox');
      this.itemBox.fixedToCamera = true;

      this.orbBox = this.add.sprite(560, 570,'orbBox');
      this.orbBox.fixedToCamera = true;

      this.torchItem = this.add.sprite(50, 607, 'torch');
      this.torchItem.scale.set(0.7);
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

      switch(window['laberinto'].Global.fromInfernoToGame) {
        case 2:
        this.player = this.add.sprite(1202, 6050, 'player');
        this.animationNow = 'stopUp';
        break;
        case 1:
        this.player = this.add.sprite(4920, 6050, 'player');
        this.animationNow = 'stopUp';
        break;
        default: this.player = this.add.sprite(2380, 2400, 'player');
        this.animationNow = 'stopDown';
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

      this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
      this.game.physics.enable(this.diabloPlayer, Phaser.Physics.ARCADE);

      this.diabloPlayer.body.immovable = true;

      this.degradado = this.add.sprite(0,0,'degradado');
      this.degradado.fixedToCamera = true;

      this.giro90grados = 'El laberinto dira 90º  - 1 cuarto de vuelta';
      this.giro180grados = 'El laberinto gira 180º - 2 cuartos de vuelta';
      this.giro270grados = 'El laberinto gira 270º - 3 cuartos de vuelta';

      this.dialogoUno = '¿Umh? ¿Y tú quién eres? Yo soy rey y señor de \nesta caverna, el más temido entre los Diablos Escarlata. \nCon un rugido hago que se estremezcan continentes. \nHasta la muerte me teme, tanto que no se atreve \na acercarse para llevarme con ella, \npor eso llevo mas de 1.000 años vivo. \n¿Qué has venido a hacer aqui, mocoso?';
      this.respuestasCharUno = '     Pueees...\n\n     ...\n\n     ¿Esa pinta de toro es por tu padre o por tu madre?';
      this.dialogoDiabloUnoUno = "[1] Ya veo. Entonces lárgate de aqui cuanto antes.";
      this.dialogoDiabloUnoDos = "[2] Te intimido, ¿eh? Es normal. \nPor eso nadie se me acerca...\n\n...\n\n¿pero cómo podría mantener el respeto \nsi cambio la expresión?";
      this.dialogoDiabloUnoTres = "[3] ¡GRRRAAAAAAAAHGR! \n¡FUERA DE MI VISTA! ¡YAAAA!";
      this.respuestasCharDos = "     ¡JAJAJAJA!\n\n     Tú dame algo a cambio y lo hablamos.";
      this.dialogoDiabloDosUno = "¡GRR...! \nMis principios no me permiten hacer daño \na un crío (si tiene mas de 2 años...). \n¿Te vas si te doy esta piruleta? ¿No? \n¿Y esta gorra de los Diablos Escarlata? ¿Tampoco? \n¿Y si te regalo este Orbe Ígneo \nque estaba por ahi tirado?";
      this.dialogoSiguiente = "Ya te dí el orbe, ahora ¡lárgate!";

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

      this.diabloChar = this.add.sprite(x, y, 'diabloChar');
      this.diabloChar.scale.set(0.8);
      this.diabloChar.x = 641;
      this.diabloChar.y = 283;
      this.diabloChar.fixedToCamera = true;
      this.diabloChar.exists = false;

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

      this.negro = this.add.sprite(0,0, 'negro');
      this.negro.fixedToCamera = true;
      this.negro.exists = true;
      this.negro.alpha = 1;
      this.game.add.tween(this.negro).to( { alpha: 0 }, 250, Phaser.Easing.Linear.None, true, 1, 500, true);
      var that = this;
      setTimeout(function(){ that.negro.exists = false;}, 250);

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {
      this.physics.arcade.collide(this.player, this.layer);
      this.physics.arcade.collide(this.player, this.diabloPlayer);
      this.diabloPlayer.animations.play('walk');


      if(this.input.keyboard.isDown(Phaser.Keyboard.T)) {
        console.log(this.player.x);
        console.log(this.player.y);
      }

      if (this.jugando) {  
        this.moveChar();
        this.changeState();
      }
      else {
        this.dialogueDiablo();
      }

      if(this.time.now - this.timeContinue > 1000){
        this.continueTexting();
      }
    },

    onDown: function () {
      
    },

    changeState:function(){
      if (this.player.y > 6070) {
        if (this.player.x < 3500){
          window['laberinto'].Global.fromInferno = true;
          window['laberinto'].Global.fromInfernoToGame = 2;
          this.game.state.start('game');        
        }
        if (this.player.x > 3500){
          window['laberinto'].Global.fromInferno = true;
          window['laberinto'].Global.fromInfernoToGame = 1; 
          this.game.state.start('game');
        }
      }
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
      {
          this.player.animations.play('left');
          this.animationNow = 'stopLeft';
          this.player.body.velocity.x = -600;
      }
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
          this.player.animations.play('stopDown');
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
        if ( (this.distance(this.player, this.diabloPlayer)) < 125){
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
            this.diabloChar.exists = true;
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
            this.diabloChar.exists = false;
            this.hablado = true;
            this.dialogoText.text = '';
          }
          else if (this.dialogoSiguienteBool) {
            this.dialogoSiguienteBool = false;
            this.jugando = true;
            this.box.exists = false;
            this.diabloChar.exists = false;
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

    dialogueDiablo:function(){
        this.stateText.anchor.setTo(0.5, 0.5);
        this.stateText.visible = false;
          if(this.primerDialogo){
            this.textizador(this.dialogoUno, 3000);
            this.dialogoText.text = this.textoTotal;
          }

          else if(this.segundoDialogo){
            this.textizador(this.respuestasCharUno, 1800);
            this.dialogoText.text = this.textoTotal;
            this.selection3();
          }

          else if(this.tercerDialogo){
            if(this.respuesta1){
              this.textizador(this.dialogoDiabloUnoUno, 2500);
            }
            else if(this.respuesta2){
              this.textizador(this.dialogoDiabloUnoDos, 4000
                );
            }
            else if(this.respuesta3){
              this.textizador(this.dialogoDiabloUnoTres, 1000);
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
              this.textizador(this.dialogoDiabloDosUno, 2500);
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
  window['laberinto'].Inferno = Inferno;

}());
