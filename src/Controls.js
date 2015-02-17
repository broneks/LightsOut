define(['settings', 'util', 'nodes'], function( settings, util, nodes ) {
  'use strict';

  function Controls( level ) {
    var resetButtonClasses = [nodes.resetButtonClass, nodes.btnClass, nodes.btnAlphaClass];
    var resetButton        = util.elt( 'button', resetButtonClasses, null, settings.resetButtonLabel );
    
    resetButton.addEventListener( 'click', this.reset.bind( this ), false );

    util.append( nodes.controlsButtons, resetButton );

    this.level        = level;
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
    if ( this.level.completed ) {
      
      if ( this.moves <= this.level.minMoves )
        this.score += settings.maxPoints;
      else
        this.score += util.greaterNumber( ( settings.maxPoints - this.moves * settings.pointsModifier ), settings.minPoints );

      this.displayScore();
    }
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
  Controls.prototype.countMoves = function( reset ) {
    if ( reset )
      this.moves = 0;
    else
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