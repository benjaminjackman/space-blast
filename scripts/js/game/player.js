BACKGROUND_POS = {  x : 0,  y: 0}

Crafty.c("Player", {
  hp: {
    current: 10,
    max: 10,
    percent: 100
  },
  shield: {
    current: 10,
    max: 10,
    percent: 100
  },
  heat: {
    current: 0,
    max: 100,
    percent: 0
  },
  movementSpeed: 8,
  lives: 3,
  score: 0,
  weapon: null,
  powerups: {},
  ship: "ship1",
  bars: {},
  infos: {},
  bounce: false,
  init: function () {
    this.weapon = Crafty.e("PeterGun");
    this.weapon.state.hardpoint = this;
    var self = this

    var stage = $('#cr-stage');
    var keyDown = false; //Player didnt pressed a key
    this.requires("2D,Canvas," + this.ship + ",Multiway,Keyboard,Collision,MouseFace")/*Add needed Components*/
      .multiway(this.movementSpeed, { /*Enable Movement Control*/
        W: -90,
        S: 90,
        D: 0,
        A: 180
      })
      .bind('Moved', function (from) { /*Bind a function which is triggered if player is moved*/
//        /*Dont allow to move the player out of Screen*/
//        if (this.x + this.w > Crafty.viewport.width ||
//          this.x + this.w < this.w ||
//          this.y + this.h - 35 < this.h ||
//          this.y + this.h + 35 > Crafty.viewport.height) {
//          this.attr({
//            x: from.x,
//            y: from.y
//          });
//        }
        var delta = {
          x : this.x - from.x,
          y : this.y - from.y
        }

        BACKGROUND_POS.x += -delta.x
        BACKGROUND_POS.y += -delta.y

        Crafty.stage.elem.style.backgroundPosition =  BACKGROUND_POS.x + "px " + BACKGROUND_POS.y + "px";
//
        console.log(this.x, this.y)
      })
      .bind("KeyDown", function (e) {
        if (e.keyCode === Crafty.keys.SPACE) {
          Crafty.pause();
        }
      })
      .bind("MouseDown", function (e) {
        keyDown = true;
      })
      .bind("MouseUp", function (e) {
        keyDown = false;
      })
      .bind("EnterFrame", function (frame) {
        if (keyDown) this.weapon.shoot();
        Crafty.trigger("UpdateStats");
      })
      .bind("Killed", function (points) {
        this.score += points;
        Crafty.trigger("UpdateStats");
      })
      .bind("Hurt", function (dmg) {
        if (this.bounce == false) {
          this.bounce = true;
          var t = this;
//                stage.effect('highlight',{
//                    color:'#990000'
//                },100,function(){
//                    t.bounce = false;
//                });
        }
        Crafty.e("Damage").attr({
          x: this.x,
          y: this.y
        });
        if (this.shield.current <= 0) {
          this.shield.current = 0;
          this.hp.current -= dmg;
        } else {
          this.shield.current -= dmg;
        }
        Crafty.trigger("UpdateStats");
        if (this.hp.current <= 0) this.die();
      })
      .onHit("EnemyBullet", function (ent) {
        var bullet = ent[0].obj;
        this.trigger("Hurt", bullet.dmg);
        bullet.destroy();
      })
      .bind("RestoreHP", function (val) {
        if (this.hp.current < this.hp.max) {
          this.hp.current += val;
          Crafty.trigger("UpdateStats");
        }

      })
      .bind("RestoreShield", function (val) {
        if (this.shield.current < this.shield.max) {
          this.shield.current += val;
          Crafty.trigger("UpdateStats");
        }

      })
      .reset() /*Set initial points*/;
    return this;
  },
  reset: function () {
    this.hp = {
      current: 10,
      max: 10,
      percent: 100
    };
    this.shield = {
      current: 10,
      max: 10,
      percent: 100
    };
    this.heat = {
      current: 0,
      max: 100,
      percent: 0
    }
    Crafty.trigger("UpdateStats");
    //Init position
    this.x = 100;
    this.y = 1000;
  },
  die: function () {
    Crafty.e("RandomExplosion").attr({
      x: this.x,
      y: this.y
    });
    this.lives--;
    Crafty.trigger("UpdateStats");
    if (this.lives <= 0) {
      this.destroy();
      Crafty.trigger("GameOver", this.score);
    } else {
      this.reset();
    }


  }

});
