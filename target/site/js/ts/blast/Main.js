var Blast;
(function (Blast) {
    var Hello = (function () {
        function Hello() {
            console.log("Hello World");
        }
        return Hello;
    })();
    Blast.Hello = Hello;
})(Blast || (Blast = {}));
//@ sourceMappingURL=Main.js.map
