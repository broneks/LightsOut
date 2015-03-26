define(['settings', 'util', 'nodes', 'levels', 'Cell', 'Controls', 'Options'], function( settings, util, nodes, levels, Cell, Controls, Options ) {
  'use strict';

  function Level() {
    this.number    = null;
    this.size      = null;
    this.blueprint = null;
    this.minMoves  = null;
    this.cells     = [];
    this.grid      = [];
    this.completed = false;
    this.controls  = new Controls( this );
    this.options   = new Options( this );
  }

  Level.prototype.constructor = Level;


  //
  // Start the game from the first level
  //
  Level.prototype.startGame = function() {
    this.render( 0 );
  };


  //
  // create a grid to reference the state of each cell
  //
  Level.prototype.generateGrid = function() {
    this.grid = this.cells.map(function( row ) {
      return row.map(function( cell ) {
        return cell.state ? 1 : 0;
      });
    });
  };


  //
  // create DOM elements based on the blueprint of the level and generate an array of Cell instances
  //
  Level.prototype.visualizeBlueprint = function( blueprint ) {
    var self = this;

    blueprint.forEach(function( rowPlan, rowIndex ) {
      var cellsRow = [];
      var rowNode  = util.elt( 'div', nodes.rowClass );

      rowPlan.forEach(function( cellPlan, cellIndex ) {
        var cellPos  = [rowIndex, cellIndex];
        var cell     = new Cell( self, cellPlan, cellPos );
        var cellNode = cell.getCellNode(); 

        cellsRow.push( cell );

        util.append( rowNode, cellNode );
      });

      self.cells.push( cellsRow );

      util.append( nodes.main, rowNode );
    });

    this.generateGrid();
  };


  //
  // render the level's blueprint and handle any errors
  //
  Level.prototype.render = function( index ) {
    var level;

    this.resetCells();

    // if the current level number is not the same as the index passed in
    // or a blueprint for the level does not already exist
    if ( ( this.number !== index ) && util.notExists( this.blueprint ) ) {
      level = levels[index];

      if ( !nodes.main      ) throw new Error( '#main-container element was not found' );
      if ( !nodes.levelName ) throw new Error( '#level-name element was not found' );
      
      if ( util.notExists( level ) ) {
        //
        // TEMPORARY
        //
        util.text( nodes.levelName, 'To Be Continued...', true );
        return;
        
        // index = 0;
        // level = levels[index];
      }

      this.number    = index;
      this.size      = level.blueprint.length;
      this.blueprint = level.blueprint;
      this.minMoves  = levels[index].minMoves;
      this.completed = false;

      // display the level number
      util.text( nodes.levelName, settings.levelNameLabel + ' ' + ( index + 1 ), true ); 
    }

    this.visualizeBlueprint( this.blueprint );
  };


  //
  // update the grid reference so that the completion of the level can be tracked
  //
  Level.prototype.update = function() {
    this.controls.countMoves();
    
    this.options.closeOptions();

    this.generateGrid();
    this.isCompleted();

    if ( this.completed )
      util.timeout( this.advanceLevel, settings.advanceLevelDelay, this )();
  };


  //
  // check if the current level has been completed by calculating the sum of all the cell states
  //
  Level.prototype.isCompleted = function() {
    var grid = util.cloneArray( this.grid );

    // flatten the rows of the grid
    var flattenedGrid = grid.reduce(function( a, b ) {
      return a.concat(b);
    });

    // add up all of the states of the cells ( on = 1, off = 0 )
    var sumOfStates  = flattenedGrid.reduce(function( a, b ) {
      return a + b; 
    });

    // console.log( sumOfStates );

    // the level is complete if the sum of the cell states is equal to zero
    this.completed = sumOfStates === 0;
  };


  //
  // reset the level by deleting the rows and cells from the DOM
  //
  Level.prototype.resetCells = function() {
    var rows = util.getByClass( nodes.rowClass, true );

    this.cells.forEach(function( row ) {
     row.forEach(function( cell ) {
       cell.delete();        
     });
    });

    rows.forEach(function( row ) {
      util.remove( nodes.main, row );
    });

    this.cells = [];
    this.grid  = [];
  };

  
  //
  // reset the level blueprint and associated details
  //
  Level.prototype.resetBlueprint = function() {
    this.blueprint = null;
    this.size      = null;
    this.minMoves  = null;
  };


  //
  // load level number
  //
  Level.prototype.loadLevel = function( number ) {
    if ( number !== this.number )
      this.resetBlueprint();
    
    this.controls.resetMoves();
    this.render( number );
  };


  //
  // show points screen and advance to the next level
  //
  Level.prototype.advanceLevel = function() {
    var self = this;

    var advance = function() {
      self.resetBlueprint();

      self.render( self.number + 1 );
    };  

    if ( settings.showPointsScreen  ) {
      this.controls.showPointsScreen();
      
      // delay the level advancement by however long the points screen is supposed to show
      util.timeout( advance, settings.pointsScreenDelay, this )();
    }
    else {
      this.controls.updateScore();
      this.controls.resetMoves();
      
      advance();
    }
  };


  return Level;
});