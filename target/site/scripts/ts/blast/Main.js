var Blast;
(function (Blast) {
    var blastMain = angular.module('Blast.Main', []);

    blastMain.config(function ($routeProvider) {
        $routeProvider.when('#game', { template: Templates.game });
        $routeProvider.otherwise({ template: Templates.tableOfContents });
        console.log($location.path);
    });
    var Main = (function () {
        function Main() {
        }
        return Main;
    })();
    Blast.Main = Main;
})(Blast || (Blast = {}));
//@ sourceMappingURL=Main.js.map
