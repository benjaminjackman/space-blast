//Enable Console log in opera
if (window.opera) { console = {log: window.opera.postError} }
/**
 * This is the Main JS File
 */

$(document).ready(function () {
  //Init Crafty
  Crafty.init(2400, 2400);
  //Add Canvas Element
//  Crafty.canvas.init();
  //Going to use a view port that is centered on the player
  Crafty.viewport.init(1000, 1000);
  Crafty.viewport.bounds = {min: {x:0, y:0}, max:{x:1000, y:1000}}
  //Set canvas under interface
//  Crafty.canvas._canvas.style.zIndex = '1';
  Crafty.viewport.clampToEntities = false;


  //play the loading scene
    Crafty.scene("Level1");
});

