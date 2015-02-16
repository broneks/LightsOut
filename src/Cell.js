define(['util', 'nodes'], function( util, nodes ) {
  'use strict';
  
  function Cell( level, controls, state, position ) {

    //
    // create a new DOM element and attach a click eventListener
    //
    var cellNode = function() {
      var cellClasses = ( state !== 0 ) ? [nodes.cellClass, nodes.lightCellClass] : nodes.cellClass;
      var cellNode    = util.elt( 'div', cellClasses );

      cellNode.addEventListener( 'click', this.click.bind( this ), false );

      return cellNode;
    }.bind( this );

    this.level    = level;
    this.controls = controls;
    this.state    = state;
    this.rowPos   = position[0];
    this.cellPos  = position[1];
    this.cellNode = cellNode();
  }

  Cell.prototype = {};
  Cell.prototype.constructor = Cell;


  //
  // get cell's corresponding DOM element
  //
  Cell.prototype.getCellNode = function() {
    return this.cellNode;
  };


  //
  // detect the Cell instances positioned above, below, to the right and to the left of the Cell that was clicked on
  //
  Cell.prototype.detectSurroundingCells = function() {
    var surrounding = [];

    var levelSize = this.level.size;
    var cells     = this.level.getCells();

    // check if the surrounding cell is out of bounds before getting its coordinate position
    var above = ( this.rowPos - 1  ) > -1 ? [this.rowPos - 1, this.cellPos] : false;
    var left  = ( this.cellPos - 1 ) > -1 ? [this.rowPos, this.cellPos - 1] : false;

    var below = ( this.rowPos + 1  ) < levelSize ? [this.rowPos + 1, this.cellPos] : false;
    var right = ( this.cellPos + 1 ) < levelSize ? [this.rowPos, this.cellPos + 1] : false;

    // get Cell instance based on coordinate position used on Level "cells" array and push to surrounding
    if ( above ) surrounding.push( cells[above[0]][above[1]] );
    if ( left  ) surrounding.push( cells[left[0]][left[1]]   );
    if ( below ) surrounding.push( cells[below[0]][below[1]] );
    if ( right ) surrounding.push( cells[right[0]][right[1]] );

    return surrounding;
  };


  //
  // update the state of the Cell once it has been clicked on or triggered
  //
  Cell.prototype.updateState = function( ) {
    this.state = !this.state;

    if ( this.state )
      util.addClass( this.cellNode, nodes.lightCellClass );
    else
      util.removeClass( this.cellNode, nodes.lightCellClass );
  };


  //
  // click event that updates cell state, level completion state and move counter
  //
  Cell.prototype.click = function() {
    if ( this.level.completed ) return;

    var surrounding = this.detectSurroundingCells();

    surrounding.forEach(function( cell ) {
      cell.updateState();
    });

    this.updateState();

    this.controls.countMoves();

    // must be last
    this.level.update();
  };


  // 
  // nullify the cell if the level is being reset
  //
  Cell.prototype.delete = function() {
    util.remove( this.cellNode.parentNode, this.cellNode );
    
    this.level    = null;
    this.controls = null;
    this.state    = null;
    this.rowPos   = null;
    this.cellPos  = null;
    this.cellNode = null;
  };

  return Cell;
});