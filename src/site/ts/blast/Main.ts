


declare var Templates;
declare var angular;

module Blast {
  var blastMain = angular.module('Blast.Main', []);

  blastMain.config(($routeProvider) => {
    $routeProvider.otherwise({template: Templates.tableOfContents})
  });
  export class Main {
    constructor() {

    }
  }
}