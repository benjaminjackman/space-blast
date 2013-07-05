var blastMain = angular.module('Blast.Main', []);

var Blast;
(function (Blast) {
    var Main = (function () {
        function Main() {
            console.log("Hello World");
        }
        return Main;
    })();
    Blast.Main = Main;
})(Blast || (Blast = {}));
//@ sourceMappingURL=Main.js.map
