//Enable Console log in opera
if(window.opera){ console = {log:window.opera.postError} }
/**
 * This is the Main JS File
 */

$(document).ready(function(){
    //Init Crafty
    Crafty.init(1280,1024);
    //Add Canvas Element
    Crafty.canvas.init();
    //Set canvas under interface
    Crafty.canvas._canvas.style.zIndex = '1';
    
    //play the loading scene
    Crafty.scene("Level1");
});

