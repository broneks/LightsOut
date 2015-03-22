define(['settings', 'util', 'nodes', 'storage'], function( settings, util, nodes, storage ) {
  'use strict';


  function Options( level ) {
    var self   = this;
    var stored = storage.load();

    util.addEvent( nodes.optionsToggle, 'click', self.toggleOptions, false, self );
    util.addEvent( nodes.themeSelect, 'click', self.updateTheme, false, self );
    util.addEvent( nodes.togglePointsScreen, 'click', self.togglePointsScreen, false, self );
    util.addEvent( nodes.saveButton, 'click', self.saveGame, false, self );
    util.addEvent( nodes.loadButton, 'click', self.loadGame, false, self );
      
    // access storage on load
    if ( stored ) {
      this.setLastSavedDate( util.getDateAndTime( stored.date ) );

      // display load button
      util.addClass( nodes.loadButton, 'active' );
    }

    this.populateThemeSelect();
    this.setTogglePointsLabel();

    this.level        = level;
    this.controls     = level.controls;
    this.optionsState = false;
  }

  Options.prototype = {};
  Options.prototype.constructor = Options;


  //
  // populate the theme select dropdown
  //
  Options.prototype.populateThemeSelect = function() {
    var theme;
    var attrs;
    var option;

    for ( theme in settings.colourThemes ) {

      attrs = [{ 'value': settings.colourThemes[theme] }];

      // the default theme is inititally selected
      if ( theme === settings.currentTheme ) {
        attrs.push( { 'selected': true } );
      } 

      option = util.elt( 'option', null, attrs, theme );

      util.append( nodes.themeSelect, option );
    }

    this.updateTheme();
  };


  //
  // change the colour theme of the game
  //
  Options.prototype.updateTheme = function( e ) {
    var themeClass = settings.colourThemes[settings.currentTheme];

    if ( e ) {
      themeClass = e.target.value;
      settings.currentTheme = util.getKey( settings.colourThemes, e.target.value );
    }

    util.removeClass( nodes.body, null, true );
    util.addClass( nodes.body, themeClass );
  };


  //
  // toggle options view
  //
  Options.prototype.toggleOptions = function( e ) {
    e.preventDefault();
    e.stopPropagation();

    this.optionsState = util.toggleClass( nodes.options, 'opened' );
  };


  //
  // close options view
  //
  Options.prototype.closeOptions = function() {
    if ( this.optionsState ) {
      util.removeClass( nodes.options, 'opened' );
    }
  };


  //
  // set toggle points screen label
  //
  Options.prototype.setTogglePointsLabel = function() {
    var label;

    if ( settings.showPointsScreen ) {
      label = 'On';
      util.addClass( nodes.togglePointsLabel, 'active' );
    }
    else {
      label = 'Off';
      util.removeClass( nodes.togglePointsLabel, 'active' );
    }

    util.text( nodes.togglePointsState, label, true ); 
  };


  //
  // toggle points screen
  //
  Options.prototype.togglePointsScreen = function() {
    settings.showPointsScreen = !settings.showPointsScreen;
    this.setTogglePointsLabel();
  };


  //
  // save the game
  //
  Options.prototype.saveGame = function() {

    // don't save if score is zero
    if ( !this.controls.score ) return;

    var gameInfo = [
      settings.currentTheme,
      settings.showPointsScreen,
      this.controls.score,
      this.level.number
    ].join('|');

    var dateSaved  = storage.save( gameInfo );

    this.setLastSavedDate( util.getDateAndTime( dateSaved ) );

    // display load button
    util.addClass( nodes.loadButton, 'active' );
  };


  //
  // load the game
  //
  Options.prototype.loadGame = function() {
    var stored = storage.load();
    var loaded = {
      theme      : stored.info[0],
      showScreen : stored.info[1],
      score      : stored.info[2],
      level      : stored.info[3]
    };

    // override settings
    settings.currentTheme     = loaded.theme;
    settings.showPointsScreen = loaded.showScreen;
    this.controls.score       = parseInt( loaded.score );

    this.updateTheme();
    this.setTogglePointsLabel();
    this.controls.displayScore();
  };


  //
  // update save date
  //
  Options.prototype.setLastSavedDate = function( date ) {
    var dateString = 'Last Saved: ' + date;
    
    if ( util.exists( date ) )
      util.text( nodes.lastSavedDate, dateString, true );
  };


  return Options;
});