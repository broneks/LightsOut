define(['util', 'nodes'], function( util, nodes ) {
  'use strict';

  function Controls( level ) {
    var resetButtonClasses = ['reset-game', 'btn', 'btn-alpha'];
    var resetButton        = util.elt( 'button', resetButtonClasses, null, 'Reset' );
    
    resetButton.addEventListener( 'click', this.reset.bind( this ), false );

    util.append( nodes.controlsButtons, resetButton );

    this.level        = level;
    this.maxPoints    = 1150;
    this.minPoints    = 100;
    this.modifier     = 11;

    this.score        = 0;
    this.moves        = 0;
    this.counterNode  = nodes.counter;
    this.controlsNode = nodes.controls;
  }

  Controls.prototype = {};
  Controls.prototype.constructor = Controls;


  //
  // display the updated score
  //
  Controls.prototype.displayScore = function() {
    util.text( nodes.score, this.score, true );
  };


  //
  // calculate points after level is completed
  //
  Controls.prototype.updateScore = function() {
    if ( this.moves <= this.level.minMoves )
      this.score += this.maxPoints;
    else
      this.score += util.greaterNumber( ( this.maxPoints - this.moves * this.modifier ), this.minPoints );

    this.displayScore();
  };


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