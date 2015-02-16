define(['util', 'nodes'], function( util, nodes ) {
  'use strict';

  function Controls( level ) {
    var resetButtonClasses = ['reset-game', 'btn', 'btn-alpha'];
    var resetButton        = util.elt( 'button', resetButtonClasses, null, 'Reset' );
    resetButton.addEventListener( 'click', this.reset.bind( this ), false );

    util.append( nodes.controlsButtons, resetButton );
    util.text( nodes.counter, 0 );

    this.level = level;
    this.moves = 0;
    this.counterNode  = nodes.counter;
    this.controlsNode = nodes.controls;
  }

  Controls.prototype = {};
  Controls.prototype.constructor = Controls;


  //
  // update the counter element with a new value
  //
  Controls.prototype.updateCounter = function() {
    util.text( this.counterNode, this.moves, true );
  };


  //
  // incremenet the counter
  //
  Controls.prototype.countMoves = function() {
    this.moves += 1;
    this.updateCounter();
  };


  //
  // trigger a level reset once the reset button is clicked
  //
  Controls.prototype.reset = function() {
    if ( ( this.moves === 0 ) || this.level.completed ) return;

    this.moves = 0;
    this.updateCounter();
    this.level.reset();
  };

  return Controls;
});