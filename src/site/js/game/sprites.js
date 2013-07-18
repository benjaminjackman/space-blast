ImageR = function () {
  function imgurl(name) {
    var r = "" + game_path + "resources/images/" + name;
    return r;
  }

  Crafty.sprite(imgurl("ships.png"), {
    //Gold
    ship1: [0, 0, 44, 47],
    ship2: [47, 0, 40, 47],
    ship3: [88, 0, 47, 47],
    ship4: [140, 0, 47, 47],
    ship5: [190, 0, 45, 47],
    ship6: [241, 0, 40, 47],
    ship7: [290, 0, 40, 47],
    ship8: [340, 0, 67, 47],
    //Red
    ship9: [0, 48, 44, 47],
    ship10: [47, 48, 40, 47],
    ship11: [88, 48, 47, 47],
    ship12: [140, 48, 47, 47],
    ship13: [190, 48, 45, 47],
    ship14: [241, 48, 40, 47],
    ship15: [290, 48, 40, 47],
    ship16: [340, 48, 67, 47]
  });

  Crafty.sprite(5, 13, imgurl("weapon1_small.png"), {
    laser1: [0, 0]
  });
  Crafty.sprite(27, 36, imgurl("weapon2.png"), {
    laser2: [0, 0]
  });
  Crafty.sprite(29, imgurl("dmg.png"), {
    dmg: [0, 0]
  });
  Crafty.sprite(64, imgurl("asteroid64.png"), {
    asteroid64: [0, 0]
  });
  Crafty.sprite(32, imgurl("asteroid32.png"), {
    asteroid32: [0, 0]
  });
  Crafty.sprite(128, imgurl("explosion.png"), {
    explosion1: [0, 0],
    explosion2: [0, 1],
    explosion3: [0, 2]
  });

  Crafty.sprite(34, 30, imgurl("powerups.png"), {
    heal: [0, 0],
    shield: [0, 1],
    overheat: [0, 2],
    invincible: [0, 3]
  });

  BlueBubbleFont = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRTYUVWXYZ~';
  Crafty.sprite(16, imgurl("BlueBubbleFont.png"), {

  });

  return {imgurl:imgurl}
}();
