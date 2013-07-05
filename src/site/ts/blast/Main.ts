/// <reference path="_all.d.ts" />

declare var Templates

module Blast {
  var blastMain = angular.module('Blast.Main', []);

  blastMain.config(($routeProvider) => {
    $routeProvider.when('/game', {template: Templates.game, controller: GameController});
    $routeProvider.otherwise({template: Templates.tableOfContents});
  });

  export class GameController {
    constructor($location){

    }
  }

  blastMain.controller('GameController', GameController)

}