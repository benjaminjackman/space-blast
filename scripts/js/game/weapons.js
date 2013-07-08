Crafty.c("Bullet", {

  init: function () {
    this.dob = Crafty.frame();
    this.addComponent("2D", "Canvas", "Collision")
      .bind("EnterFrame", function (frame) {
        if (frame.frame > this.dob + 60) this.destroy()
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

//Starting / basic gun
Crafty.c("PeterGun", {
  state: {
    lastFrame: 0,
    hardpoint: null
  },
  stats: {
    framesPerShot: 2,
    speed: 10,
    shots: 10,
    spread: Math.PI / 8,
    damage: {
      min : 1,
      max : 10
    }
  },
  init: function () {

  },
  shoot: function () {
    var f = Crafty.frame();
    var nextFrame = this.state.lastFrame + this.stats.framesPerShot;
    if (f > nextFrame) {
      this.state.lastFrame = f;
      Crafty.audio.play("laser", 1, 0.8);
      var self = this;
      _.range(this.stats.shots).forEach(function (i) {
        var bullet = Crafty.e("Projectile1,PlayerBullet");
        var randomSpread = Crafty.math.randomNumber(-self.stats.spread / 2, self.stats.spread / 2);
        bullet.attr({
          weaponID: this[0],
          x: self.state.hardpoint.x,
          y: self.state.hardpoint.y,
          speed: self.stats.speed,
          angle: -self.state.hardpoint.getAngle() + randomSpread
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
