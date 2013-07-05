


declare var Templates;
declare var angular;

module Blast {
  var blastMain = angular.module('Blast.Main', []);

  blastMain.config(($routeProvider) => {
    $routeProvider.when('#game', {template: Templates.game})
    $routeProvider.otherwise({template: Templates.tableOfContents})
    console.log($location.path)
  });
  export class Main {
    constructor() {

    }
  }
}