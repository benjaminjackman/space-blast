Crafty.c("PowerUp", {
  hp: 40,
  init: function () {
    this.requires("2D,Canvas,Collision")
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