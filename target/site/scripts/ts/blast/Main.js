var Blast;
(function (Blast) {
    var blastMain = angular.module('Blast.Main', []);

    blastMain.config(function ($routeProvider) {
        $routeProvider.otherwise({ template: Templates.tableOfContents });
    });
    var Main = (function () {
        function Main() {
        }
        return Main;
    })();
    Blast.Main = Main;
})(Blast || (Blast = {}));
//@ sourceMappingURL=Main.js.map
