BACKGROUN D_POS = {  x: 0, y: 0};

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
  movementSpeed: 5,
  gpadX: 0,
  gpadY: 0,
  lives: 3,
  score: 0,
  weapon: null,
  powerups: {},
  ship: "ship1",
  bars: {},
  infos: {},
  bounce: false,
  init: function () {
    this.requires("2D,Canvas," + this.ship + ",Multiway,Gamepad, GamepadMultiway, Keyboard,Collision,MouseFace")

    //Init position
    this.x = 500;
    this.y = 500;

    this.origin("center");

    this.hardpoint = Crafty.e("Hardpoint");
    this.hardpoint.followParent(-18, -10, this);


    this.weapon = Crafty.e("PeterGun");
    this.weapon.state.hardpoint = this.hardpoint;


    var stage = $('#cr-stage');
    var keyDown = false; //Player didnt pressed a key

    /*Add needed Components*/
    this
      .multiway(this.movementSpeed, { /*Enable Movement Control*/
        W: -90,
        S: 90,
        D: 0,
        A: 180
      })
      .gamepad(0)
      .bind('GamepadChange', function (e) {
        if (e.axis == 0) {
          this.gpadX = e.value
        }
        if (e.axis == 1) {
          this.gpadY = e.value
        }

        if (e.button === 0 && e.value === 1) {
          keyDown = true
        }

        if (e.button === 0 && e.value === 0) {
          keyDown = false
        }
      })
      .bind('Rotate', function () {
        this.hardpoint.calcPosition();
      })
      .bind('Moved', function (from) {
        this.hardpoint.calcPosition();

        var delta = {
          x: this.x - from.x,
          y: this.y - from.y
        };

        BACKGROUND_POS.x += -delta.x * .5;
        BACKGROUND_POS.y += -delta.y * .5;


        Crafty.stage.elem.style.backgroundPosition = BACKGROUND_POS.x + "px " + BACKGROUND_POS.y + "px";
//
      })
      .bind("KeyDown", function (e) {
        if (e.keyCode === Crafty.keys.SPACE) {
          Crafty.pause();
        }
      })
      .bind("MouseDown", function (e) {
        if (e.mouseButton == Crafty.mouseButtons.LEFT) {
          keyDown = true;
        }
      })
      .bind("MouseUp", function (e) {
        if (e.mouseButton == Crafty.mouseButtons.LEFT) {
          keyDown = false;
        }
      })
      .bind("EnterFrame", function (frame) {

        var theta = Math.atan2(this.gpadY, this.gpadX);
        var oldX = this.x;
        var oldY = this.y;
        var mag = Math.max(Math.abs(this.gpadX), Math.abs(this.gpadY));
        if (mag > 0) {
          this.x += mag * this.movementSpeed * Math.cos(theta);
          this.y += mag * this.movementSpeed * Math.sin(theta);
          this.trigger('Moved', {x: oldX, y: oldY});
          this.rotation = theta * 180 / Math.PI + 90
        }


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
    };
    Crafty.trigger("UpdateStats");
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
