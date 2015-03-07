define(['settings', 'util', 'nodes'], function( settings, util, nodes ) {
  'use strict';

  function Controls( level ) {
    var self = this;

    util.addEvent( nodes.resetButton, 'click', self.reset, false, self );
    util.addEvent( nodes.optionsToggle, 'click', self.toggleOptions, false, self );
    util.addEvent( nodes.themeSelect, 'click', self.changeTheme, false, self );

    this.populateThemeSelect();

    this.level = level;
    this.score = 0;
    this.moves = 0;
    this.optionsState = false;
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
  // calculate points after level is completed and return how many points were earned
  //
  Controls.prototype.updateScore = function() {
    var pointsEarned;

    if ( this.level.completed ) {
      
      if ( this.moves <= this.level.minMoves )
        pointsEarned = settings.maxPoints;
      else
        pointsEarned = util.greaterNumber( ( settings.maxPoints - this.moves * settings.pointsModifier ), settings.minPoints );

      // increase score
      this.score += pointsEarned;
      this.displayScore();
    }

    return pointsEarned;
  };


  //
  // update the moves element with a new value
  //
  Controls.prototype.updateMoves = function() {
    util.text( nodes.moves, this.moves, true );
  };


  //
  // reset moves to zero
  //
  Controls.prototype.resetMoves = function() {
    this.moves = 0;
    this.updateMoves();
  };


  //
  // incremenet the moves
  //
  Controls.prototype.countMoves = function() {
    this.moves += 1;
    this.updateMoves();
  };


  //
  // show points screen
  //
  Controls.prototype.showPointsScreen = function() {
    var points = this.updateScore();
    var moves  = this.moves;

    this.resetMoves();

    // show level stats
    util.text( nodes.pointsEarned, points, true );
    util.text( nodes.movesMade, moves, true );

    // show the points screen
    util.addClass( nodes.pointsScreen, 'show' );

    // hide the points screen after some delay
    util.timeout( this.hidePointsScreen, settings.pointsScreenDelay, this )();
  };


  //
  // hide points screen
  //
  Controls.prototype.hidePointsScreen = function() {
    // clear level stats
    util.text( nodes.pointsEarned, '', true );
    util.text( nodes.movesMade,'', true );


    util.removeClass( nodes.pointsScreen, 'show' );
  };


  //
  // trigger a level reset once the reset button is clicked
  //
  Controls.prototype.reset = function() {
    if ( ( this.moves === 0 ) || this.level.completed ) return;

    this.resetMoves();
    this.level.render( this.level.number );
  };


  //
  // populate the theme select dropdown
  //
  Controls.prototype.populateThemeSelect = function() {
    var theme;
    var attrs;
    var option;

    for ( theme in settings.colourThemes ) {

      attrs = [{ 'value': settings.colourThemes[theme] }];

      // the default theme is inititally selected
      if ( theme === settings.defaultTheme ) {
        attrs.push( { 'selected': true } );
      } 

      option = util.elt( 'option', null, attrs, theme );

      util.append( nodes.themeSelect, option );
    }

    this.changeTheme();
  };


  //
  // change the colour scheme of the game
  //
  Controls.prototype.changeTheme = function( e ) {
    var themeClass = e ? e.target.value : settings.colourThemes[settings.defaultTheme];

    util.removeClass( nodes.body, null, true );
    util.addClass( nodes.body, themeClass );
  };


  //
  // toggle options view
  //
  Controls.prototype.toggleOptions = function( e ) {
    e.preventDefault();
    e.stopPropagation();

    this.optionsState = util.toggleClass( nodes.options, 'opened' );
  };


  //
  // close options view
  //
  Controls.prototype.closeOptions = function() {
    if ( this.optionsState ) {
      util.removeClass( nodes.options, 'opened' );
    }
  };


  return Controls;
});