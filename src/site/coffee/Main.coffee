
blastMain = angular.module('Blast.Main', []);

blastMain.config ($routeProvider) =>
  $routeProvider.when '/game', {template: Templates.game, controller: GameController}
  $routeProvider.otherwise {template: Templates.tableOfContents}

class GameController
  constructor: ($location) ->

blastMain.controller('GameController', GameController)

