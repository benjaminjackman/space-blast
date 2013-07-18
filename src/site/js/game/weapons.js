Crafty.c("Bullet", {

  init: function () {
    this.dob = Crafty.frame();
    this.addComponent("2D", "Canvas", "Collision")
      .bind("EnterFrame", function (frame) {
        if (frame.frame > this.dob + 100) this.destroy()
      })
  }
});

Crafty.c("Projectile1", {
  init: function () {
    this
      .addComponent("Bullet", "laser1")
      .origin("center")
      .bind("EnterFrame", function () {
        this.x += Math.cos(this.angle) * this.speed;
        this.y -= Math.sin(this.angle) * this.speed;
      })
      .attr({
        dmg: 1
      });
  }
});

Crafty.c("Hardpoint", {

  init: function () {
    this.requires("2D")
  },

  calcPosition: function () {
    var origin = this.leader._origin || {x: 0, y: 0};
    var theta = this.leader.rotation * Math.PI / 180;
    var x = this.offset.x;
    var y = this.offset.y;
    var rotX = x * Math.cos(theta) - y * Math.sin(theta);
    var rotY = x * Math.sin(theta) + y * Math.cos(theta);
    this.x = this.leader.x + origin.x + rotX;
    this.y = this.leader.y + origin.y + rotY;
    this.rotation = this.leader.rotation
  },

  followParent: function (x, y, parent) {
    //Set offsets relative origin of this entity
    this.offset = { x: x, y: y};
    this.leader = parent;
    this.calcPosition();
  }

});

//Starting / basic gun
Crafty.c("PeterGun", {
  state: {
    lastFrame: 0,
    hardpoint: null
  },
  stats: {
    framesPerShot: 10,
    speed: 10,
    shots: 5,
    spread: 65,
    damage: {
      min: 1,
      max: 10
    }
  },
  init: function () {

  },
  shoot: function () {
    var f = Crafty.frame();
    var nextFrame = this.state.lastFrame + this.stats.framesPerShot;
    if (f > nextFrame) {
      this.state.lastFrame = f;
      Crafty.audio.play("laser1", 1, 0.8);
      var self = this;
      _.range(this.stats.shots).forEach(function (i) {
        var bullet = Crafty.e("Projectile1,PlayerBullet");
        var randomSpread = Crafty.math.randomNumber(-self.stats.spread / 2, self.stats.spread / 2);
        //get angle is the mouse face way
        //var angle = -self.state.hardpoint.getAngle() + randomSpread * Math.PI / 180
        console.log(self.state.hardpoint.rotation)
        var angle = (-(self.state.hardpoint.rotation + randomSpread) + 90) * Math.PI / 180
        var rotation = -(angle * (360 / (2 * Math.PI) ) + 270)
        bullet.attr({
          weaponID: this[0],
          x: self.state.hardpoint.x,
          y: self.state.hardpoint.y,
          speed: self.stats.speed,
          rotation: rotation,
          angle: angle
        });
      });
    }
  }
});

Crafty.c("Weapon2", {
  init: function () {
    this
      .addComponent("Bullet", "laser2")
      .origin("center")
      .bind("EnterFrame",function () {
        this.x += this.xspeed;
        this.y -= this.yspeed;
      }).attr({
        dmg: 2
      });
    Crafty.audio.play("laser2", 1, 0.8);
  }
});


