Crafty.c("PowerUp", {
  hp: 40,
  init: function () {
    this.requires("2D,Canvas,Collision")
      .onHit("PlayerBullet", function () {
        this.hp -= 1;
        if (this.hp <= 0) this.destroy();
      })
      .onHit("Player", function (ent) {

        //ent[0].obj.trigger(this.effect,this.value);
        this.destroy();
      })
      .bind("EnterFrame", function () {
        this.y += 2;
      });
  }
});

Crafty.c("Heal", {
  effect: "RestoreHP",
  value: 1,
  init: function () {
    this.requires("PowerUp,heal");
  }
});

Crafty.c("Shield", {
  effect: "RestoreShield",
  value: 1,
  init: function () {
    this.requires("PowerUp,shield");
  }
});