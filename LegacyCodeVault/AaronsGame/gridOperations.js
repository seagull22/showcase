'use strict';

function makeInitialGrid() {
  /*
     0 1
   2 3 4 5
     6 7
  */
  var i;
  var grid = [];
  var remotePositions = [ [5,7,6], [7,6,2], [1,4,5,7], [5], [2], [6,2,3,0], [0,1,5], [1,2,0] ];
  for (i=0; i < remotePositions.length; i++) {
    grid[i] = makeCell(i, 0, remotePositions[i]);
  }

  return grid;
}

function findSolutions(processLog, solutions, grid, highestValue) {
  var i, newGrid, slots;

  processLog.attempts++;

  if (highestValue >= 8) {
    // Base case:  we have a winner
    solutions.push(grid);
    return;
  }

  // General case: keep going

  // get all the slots for the grid at its highest value so far assigned
  slots = getSlots(grid, highestValue);

  // find all solutions letting each slot serve as the leading cell
  for(i=0; i < slots.length; i++) {
    newGrid = cloneGrid(grid);
    newGrid[slots[i].position] = 
      makeCell(slots[i].position, highestValue +1, slots[i].remotePositions);

    findSolutions(processLog, solutions, newGrid, highestValue + 1);
  }
}

function getSlots(grid, targetValue) {
  var i;
  var leadingCell;
  var slots = [];
  var position;

  if (targetValue == 0) {
    // initially push the entire grid because all cells are free 
    // and there are no placement restrictions on an empty grid
    for(i=0; i < grid.length; i++) {
      slots.push(makeCell(grid[i].position, 0, grid[i].remotePositions));
    }
  }
  else {
    leadingCell = getCell(grid, targetValue);
    // push all free remote positions of the leadingCell
    for(i=0; i < leadingCell.remotePositions.length; i++) {
      if (grid[leadingCell.remotePositions[i]].cellValue == 0) {
        position = leadingCell.remotePositions[i];
        slots.push(makeCell(grid[position].position, 0, grid[position].remotePositions));
      }
    }
  }
  return slots;
}

function getCell(grid, targetValue) {
  var i;

  for(i=0; i < grid.length; i++) {
    if (grid[i].cellValue == targetValue) {
      return makeCell(grid[i].position, grid[i].cellValue, grid[i].remotePositions);
    }
  }
  return null;
}
  
function cloneGrid(grid) {
  var i;
  var newGrid = [];
  for(i=0; i < grid.length; i++) {
    newGrid.push(makeCell(grid[i].position, grid[i].cellValue, grid[i].remotePositions));
  }

  return newGrid;
}

// ********************************
/* factory methods */
var objectCreate = function(arg) {
  if (!arg) { return {}; }

  function obj() {};
  obj.prototype = arg;

  return new obj;
};

Object.create = Object.create || objectCreate;

var makeCell = function(position, cellValue, remotePositions) {
  var proto = {
    position: 0,
    cellValue: 0,
    remotePositions: []
  };

  var cell = Object.create(proto);
  cell.position = position;
  cell.cellValue = cellValue;
  cell.remotePositions = remotePositions;

  return cell;
}
// ********************************
