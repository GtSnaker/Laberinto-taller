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

      this.layer = this.map.createLayer('Capa de Patrones 1');     
      this.layer.resizeWorld();

      this.torch = this.add.sprite(2320, 2620, 'antorcha');

      if(window['laberinto'].Global.fromForest) {
        switch(window['laberinto'].Global.fromForestToGame) {
          case 1:
            this.player = this.add.sprite(50, 4053, 'player');
            this.animationNow = 'stopRigt';
          break;

          case 2:
            this.player = this.add.sprite(50, 2295, 'player');
            this.animationNow = 'stopRigt';
          break;
        }
      }
      else if(window['laberinto'].Global.fromShadow) {
        switch(window['laberinto'].Global.fromShadowToGame) {
          case 1:
            this.player = this.add.sprite(6070, 3950, 'player');
            this.animationNow = 'stopLeft';
          break;

          case 2:
            this.player = this.add.sprite(6070, 2154, 'player');
            this.animationNow = 'stopLeft';
          break;
        }
      }
      else if(window['laberinto'].Global.fromElectricity) {
        switch(window['laberinto'].Global.fromElectricityToGame) {
          case 1:
            this.player = this.add.sprite(1438, 6063, 'player');
            this.animationNow = 'stopUp';
          break;

          case 2:
            this.player = this.add.sprite(5156, 6063, 'player');
            this.animationNow = 'stopUp';
          break;
        }
      }
      else {
        this.player = this.add.sprite(2380, 2400, 'player');
        this.animationNow = 'stopDown';
      }

      window['laberinto'].Global.fromForest = false;
      window['laberinto'].Global.fromShadow = false;
      window['laberinto'].Global.fromElectricity = false;
    
      this.player.anchor.setTo(0.5, 0.5);

      this.player.animations.add('up',    [4, 8,  12, 16], 8, true);
      this.player.animations.add('down',  [5, 9,  13, 17], 8, true);
      this.player.animations.add('right', [6, 10, 14, 18], 8, true);
      this.player.animations.add('left',  [7, 11, 15, 19], 8, true);
      this.player.animations.add('stopUp',[0], 8, true);
      this.player.animations.add('stopDown',[1], 8, true);
      this.player.animations.add('stopRigt',[2], 8, true);
      this.player.animations.add('stopLeft',[3], 8, true);
      //this.animationNow = 'stopDown';

      this.deku = this.add.sprite(2100, 2440, 'deku');
      this.deku.animations.add('move', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 3, true);
        
      this.input.onDown.add(this.onInputDown, this);
      
      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
      this.game.physics.enable(this.deku, Phaser.Physics.ARCADE);
      this.game.physics.enable(this.torch, Phaser.Physics.ARCADE);
      //this.game.physics.enable(this.rock1, Phaser.Physics.ARCADE);

      this.deku.body.immovable = true;
      this.torch.body.immovable = true;

      this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

      this.jugando = true;

      this.itemBox = this.add.sprite(40, 570,'itemBox');
      this.itemBox.fixedToCamera = true;

      this.orbBox = this.add.sprite(560, 570,'orbBox');
      this.orbBox.fixedToCamera = true;

      this.torchItem = this.add.sprite(50, 607, 'antorcha');
      this.torchItem.fixedToCamera = true;
      if (window['laberinto'].Global.torch){
        this.torchItem.exists = true;
        this.torch.exists = false;
      }
      else{
        this.torchItem.exists = false;
      }

      this.box = this.add.sprite(25, 435, 'textBox');
      this.box.x = 25;
      this.box.y = 435;
      this.box.fixedToCamera = true;
      this.box.exists = false;

      this.degradado = this.add.sprite(0,0,'degradado');
      this.degradado.fixedToCamera = true;

      this.negro = this.add.sprite(0,0, 'negro');
      this.negro.fixedToCamera = true;
      this.negro.exists = true;
      this.negro.alpha = 1;
      this.game.add.tween(this.negro).to( { alpha: 0 }, 250, Phaser.Easing.Linear.None, true, 1, 500, true);
      var that = this;
      setTimeout(function(){ that.negro.exists = false;}, 250);
    },


    update: function () {
      this.physics.arcade.collide(this.player, this.torch, function (){ 
        window['laberinto'].Global.torch = true; 
        this.torch.exists = false;
        this.torchItem.exists = true;
      }, null, this);
      this.physics.arcade.collide(this.player, this.layer);
      this.physics.arcade.collide(this.player, this.deku);

      this.deku.animations.play('move');

      if(this.input.keyboard.isDown(Phaser.Keyboard.T)) {
        console.log(this.player.x);
        console.log(this.player.y);
      }

      if (this.player.x <20) {
        if (this.player.y> 3000){
          window['laberinto'].Global.fromGameToForest = 2;
          this.game.state.start('forest');        
        }
        if (this.player.y <3000){
          window['laberinto'].Global.fromGameToForest = 1; 
          this.game.state.start('forest');
        }
      }

      if (this.player.x > 6100) {
        if (this.player.y > 3500) {
          window['laberinto'].Global.fromShadowToGame = 1,
          this.game.state.start('shadow');
        }
        if (this.player.y < 3500) {
          window['laberinto'].Global.fromShadowToGame = 2,
          this.game.state.start('shadow');
        }
      }

      if (this.player.y > 6065) {
        if (this.player.x > 4000) {
          window['laberinto'].Global.fromGameToElectricity = 1,
          this.game.state.start('electricity');
        }
        if (this.player.x < 4000) {
          window['laberinto'].Global.fromGameToElectricity = 2,
          this.game.state.start('electricity');
        }
      }

      if( this.input.keyboard.isDown(Phaser.Keyboard.E) &&
          this.deku.exists &&
          window['laberinto'].Global.torch &&
          this.distance(this.player, this.deku) < 90)
          {
            this.deku.exists = false;
          }

      this.moveChar();
    },

    onInputDown: function () {
    },

    //FUNCION QUE PERMITE EL MOVIMIENTO DEL PERSONAJE
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

    distance: function (uno, dos) {
      var r = Math.sqrt((uno.x-dos.x)*(uno.x-dos.x)+(uno.y-dos.y)*(uno.y-dos.y));
      return r;
    },

  };

  window['laberinto'] = window['laberinto'] || {};
  window['laberinto'].Game = Game;

}());
