define(['util', 'nodes', 'levels', 'Cell', 'Controls'], function( util, nodes, levels, Cell, Controls ) {
  'use strict';

  function Level() {
    this.number = null;
    this.size   = null;
    this.cells  = [];
    this.grid   = [];
    this.controls  = new Controls( this );
    this.completed = false;
  }

  Level.prototype = {};
  Level.prototype.constructor = Level;

  Level.prototype.getCells = function() {
    return this.cells;
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
  // create DOM elements based on the blueprint of the level and generate an array of cell instances
  //
  Level.prototype.visualizeBlueprint = function( blueprint ) {
    var self = this;

    blueprint.forEach(function( rowPlan, rowIndex ) {
      var cellsRow = [];
      var rowNode  = util.elt( 'div', nodes.rowClass );

      rowPlan.forEach(function( cellPlan, cellIndex ) {
        var cellPos  = [rowIndex, cellIndex];
        var cell     = new Cell( self, self.controls, cellPlan, cellPos );
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
    var blueprint = levels[index];

    if ( !nodes.main      ) throw new Error( '#main-container element was not found' );
    if ( !nodes.levelName ) throw new Error( '#level-name element was not found' );
    
    if ( !util.exists( blueprint ) ) {
      index     = 0;
      blueprint = levels[index];
    }

    this.number = index;
    this.size   = blueprint.length;

    this.visualizeBlueprint( blueprint );

    util.text( nodes.levelName, 'Level ' + ( this.number + 1 ) ); 
  };


  //
  // update the grid reference so that the completion of the level can be tracked
  //
  Level.prototype.update = function() {
    this.generateGrid();
    this.isCompleted();
  };


  //
  // check if the current level has been completed by checking the sum of all the cell states
  //
  Level.prototype.isCompleted = function() {
    var grid = util.cloneArray( this.grid );

    // flatten the rows of the grid
    var flattened = grid.reduce(function( a, b ) {
      return a.concat(b);
    });

    // add up all of the states of the cells ( light = 1, dark = 0 )
    var sumOfStates  = flattened.reduce(function( a, b ) {
      return a + b; 
    });

    // --CONSOLE LOG
    console.log( sumOfStates );

    // the level is complete if the sum of the cell states is zero
    this.completed = sumOfStates === 0;
  };


  //
  // reset the level by deleting the rows and cells from the DOM and re-creating them
  //
  Level.prototype.reset = function() {
    // var rows = util.getByClass( nodes.rowClass );

    // this.cells.forEach(function( row ) {
    //  row.forEach(function( cell ) {
    //    cell.delete();        
    //  })
    // });

    // console.log(rows);

    // [].forEach.call(rows, function( row ) {
    //  // console.log( row );
    //  util.remove( nodes.main, row );
    // });

    // this.cells = [];
    // this.grid  = [];

    // this.render( this.number );
  };


  return Level;
});