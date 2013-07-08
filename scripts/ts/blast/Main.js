var Blast;
(function (Blast) {
    var blastMain = angular.module('Blast.Main', []);

    blastMain.config(function ($routeProvider) {
        $routeProvider.when('/game', { template: Templates.game, controller: GameController });
        $routeProvider.otherwise({ template: Templates.tableOfContents });
    });

    var GameController = (function () {
        function GameController($location) {
        }
        return GameController;
    })();
    Blast.GameController = GameController;

    blastMain.controller('GameController', GameController);
})(Blast || (Blast = {}));
//@ sourceMappingURL=Main.js.map
