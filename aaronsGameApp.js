'use strict';

angular
.module('AaronsGameApp', [])
.controller('defaultController', function($scope) {

  var solutions = [];
  var processLog = { attempts: 0 } ;

  var grid = makeInitialGrid();
  findSolutions(processLog, solutions, grid, 0);

  $scope.attempts = processLog.attempts;
  $scope.solutions = solutions;
});
