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

      this.torch = this.add.sprite(2320, 2620, 'antorcha');

      this.torchItem = this.add.sprite(50, 610, 'antorcha');
      this.torchItem.fixedToCamera = true;
      if (window['laberinto'].Global.torch){
        this.torchItem.exists = true;
        this.torch.exists = false;
      }
      else{
        this.torchItem.exists = false;
      }


      //this.rock1 = this.add.sprite(2320, 2400, 'piedra');

      this.slenderPlayer = this.add.sprite(2555, 2620, 'slenderBoy');
      this.slenderPlayer.anchor.setTo(0.5, 0.5);
      this.slenderPlayer.scale.set(0.4)
      this.slenderPlayer.animations.add('walk', [0,1], 1.8, true);

      switch(window['laberinto'].Global.fromForestToGame) {
        case 1:
        this.player = this.add.sprite(152, 4053, 'player');
        break;
        case 2:
        this.player = this.add.sprite(152, 2295, 'player');//152, 2295
        break;
        default:
        this.player = this.add.sprite(2380, 2400, 'player');
      }
      
      //this.player = this.add.sprite(2380, 2400, 'player');
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

      this.deku = this.add.sprite(2100, 2440, 'deku');
      this.deku.animations.add('move', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 3, true);
        
      this.input.onDown.add(this.onInputDown, this);
      
      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
      this.game.physics.enable(this.slenderPlayer, Phaser.Physics.ARCADE);
      this.game.physics.enable(this.deku, Phaser.Physics.ARCADE);
      this.game.physics.enable(this.torch, Phaser.Physics.ARCADE);
      //this.game.physics.enable(this.rock1, Phaser.Physics.ARCADE);

      this.slenderPlayer.body.immovable = true;
      this.deku.body.immovable = true;
      this.torch.body.immovable = true;

      this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

      this.jugando = true;

      this.box = this.add.sprite(x, y, 'textBox');
      this.box.x = 25;
      this.box.y = 435;
      this.box.fixedToCamera = true;
      this.box.exists = false;

      this.degradado = this.add.sprite(0,0,'degradado');
      this.degradado.fixedToCamera = true;

    },

    //UPDATEEEEEE
    //EEEEEEEEEEE
    //EEEEEEEEEEE
    update: function () {
      var x, y, cx, cy;
      this.physics.arcade.collide(this.player, this.slenderPlayer);
      this.physics.arcade.collide(this.player, this.torch, function (){ 
        window['laberinto'].Global.torch = true; 
        this.torch.exists = false;
        this.torchItem.exists = true;
      }, null, this);
      this.physics.arcade.collide(this.player, this.layer);
      this.physics.arcade.collide(this.player, this.deku);

      this.slenderPlayer.animations.play('walk');
      this.deku.animations.play('move');

      //Cambiamos de nivel cambiando de valor la variable de als puertas
      if (this.player.x <70) {
        if (this.player.y> 3000){
          window['laberinto'].Global.fromGameToForest = 2;
          this.game.state.start('forest');
        }
        if (this.player.y <3000){
          window['laberinto'].Global.fromGameToForest = 1;
          this.game.state.start('forest');
        }
      }

      if( this.input.keyboard.isDown(Phaser.Keyboard.E) &&
          this.deku.exists &&
          window['laberinto'].Global.torch &&
          this.distance(this.player, this.deku) < 90)
          {
            this.deku.exists = false;
          }

      x = this.input.position.x;
      y = this.input.position.y;
      cx = this.world.centerX;
      cy = this.world.centerY;

      this.moveChar();

      //FIN UPDATEEEEEEE
      //EEEEEEEEEEEEEEEE
      //EEEEEEEEEEEEEEEE
      
    //AQUI TERMINAMOS LA FUNCION UPDATE
    },

    onInputDown: function () {
    },

    //FUNCION QUE PERMITE EL MOVIMIENTO DEL PERSONAJE
    moveChar:function(){
      this.player.body.collideWorldBounds = true;
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;

      if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
          this.player.animations.play('left');
          this.animationNow = 'stopLeft';
          this.player.body.velocity.x = -600;
        }
      if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
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
