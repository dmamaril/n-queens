/*           _                    
   ___  ___ | |_   _____ _ __ ___ 
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.findNRooksSolution = function(n) {
  var board = new Board ({'n' : n});
  var rowNums = numPicks(n);
  var colNums = numPicks(n);
  // pick(rowNums) && pick(colNums);
  var pick = function (nums) {
    for (var key in nums) {
      if (nums[key] === false) {
       var temp = key;
       delete nums[key];
       return temp;
     }
    }
  };
  
  for (var i = 0 ; i < n ; i++) {
    var row = pick(rowNums);
    var col = pick(colNums);
    board.attributes[row][col] = 1;
  }
  var solution = board.attributes; //fixme
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return board.attributes;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutions = 0;

  var solve = function(board, rowIndex){
    if(rowIndex === n){
      solutions++;
      return; 
    }
    for(var colIndex = 0; colIndex < n; colIndex++){
      board.togglePiece(rowIndex, colIndex);
      if(!board.hasAnyRooksConflicts()){
        solve(board, rowIndex + 1); // if no conflict after toggling in, go to the next row;
      }
      board.togglePiece(rowIndex, colIndex); // else toggle and move to next colIndex in same row;
    }
  };
  var board = new Board({n:n});
  solve(board, 0);


  console.log('Number of solutions for ' + n + ' rooks:', solutions);
  return solutions;
};




// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution;

  var solve = function(board, rowIndex){
    if(rowIndex === n){
      solution = board.rows();
      return;
    }
    for(var colIndex = 0; colIndex < n; colIndex++){
      board.togglePiece(rowIndex, colIndex);
      if(!board.hasAnyQueensConflicts()){
        solve(board, rowIndex + 1);
      }
      board.togglePiece(rowIndex, colIndex);  
    }
  };
  var board = new Board({n:n});
  solve(board, 0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = 0;

  var solve = function(board, rowIndex){
    if(rowIndex === n){
      solutionCount++;
      return;
    }
    for(var colIndex = 0; colIndex < n; colIndex++){
      board.togglePiece(rowIndex, colIndex);
      if(!board.hasAnyQueensConflicts()){
        solve(board, rowIndex + 1);
      }
      board.togglePiece(rowIndex, colIndex);
    }
  };
  var board = new Board({n:n});
  solve(board, 0);


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.numPicks = function (n) {
  var node = {};
  for (var i = 0 ; i < n ; i++) {
    node[i] = false;
  }
  return node;
};
