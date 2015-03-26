define(['settings', 'util', 'nodes', 'storage'], function( settings, util, nodes, storage ) {
  'use strict';


  function Options( level ) {
    var self   = this;
    var loaded = storage.load();

    util.addEvent( nodes.optionsToggle, 'click', self.toggleOptions, false, self );
    util.addEvent( nodes.themeSelect, 'click', self.updateTheme, false, self );
    util.addEvent( nodes.togglePointsScreen, 'click', self.togglePointsScreen, false, self );
    util.addEvent( nodes.saveButton, 'click', self.saveGame, false, self );
    util.addEvent( nodes.loadButton, 'click', self.loadGame, false, self );
      
    // access storage on load
    if ( loaded ) {
      this.setLastSavedInfo( loaded );

      // display load button and saved label
      util.addClass( nodes.options, 'active-storage' );
    }

    this.populateThemeSelect();
    this.setToggleLabel( settings.showPointsScreen, nodes.togglePointsLabel, nodes.togglePointsState );

    this.level        = level;
    this.controls     = level.controls;
    this.optionsState = false;
  }

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
  Options.prototype.updateTheme = function( e, changeSelectedIndex ) {
    var themeClass = settings.colourThemes[settings.currentTheme];
    var eventTargetValue;
    var currentThemeIndex;

    // very basic event detection
    if ( e && e.target.tagName ) {
      eventTargetValue = e.target.value;
      themeClass       = eventTargetValue;
      settings.currentTheme = util.getKey( settings.colourThemes, eventTargetValue );
    }

    // update the theme select element
    if ( changeSelectedIndex ) {
      // get the index of the current theme within the colourThemes object
      currentThemeIndex = Object.keys( settings.colourThemes ).indexOf( settings.currentTheme );
      nodes.themeSelect.selectedIndex = currentThemeIndex;
    }

    if ( !util.hasClass( nodes.body, themeClass ) ) {
      util.removeClass( nodes.body, true );
      util.addClass( nodes.body, themeClass );
    }
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
  // set toggle label state
  //
  Options.prototype.setToggleLabel = function( condition, labelNode, innerNode ) {
    var label;

    if ( condition ) {
      label = 'On';
      util.addClass( labelNode, 'active' );
    }
    else {
      label = 'Off';
      util.removeClass( labelNode, 'active' );
    }

    util.text( innerNode, label, true ); 
  };


  //
  // toggle points screen
  //
  Options.prototype.togglePointsScreen = function() {
    settings.showPointsScreen = !settings.showPointsScreen;
    this.setToggleLabel( settings.showPointsScreen, nodes.togglePointsLabel, nodes.togglePointsState );
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
    ];

    var savedInfo = storage.save( gameInfo );

    this.setLastSavedInfo( savedInfo );

    // display load button and saved label
    util.addClass( nodes.options, 'active-storage' );
  };


  //
  // load the game
  //
  Options.prototype.loadGame = function() {
    var loaded = storage.load();

    if ( loaded ) {
      // override settings
      settings.currentTheme     = loaded.theme;
      settings.showPointsScreen = loaded.showScreen;
      this.controls.score       = loaded.score;

      // update the theme
      this.updateTheme( null, true );

      // update toggle points screen label
      this.setToggleLabel( settings.showPointsScreen, nodes.togglePointsLabel, nodes.togglePointsState );

      // display the loaded score
      this.controls.displayScore();

      // reset the moves counter and load saved level
      this.level.loadLevel( loaded.level );
    }
  };


  //
  // update save info
  //
  Options.prototype.setLastSavedInfo = function( info ) {
    var dateExists  = util.exists( info.date );
    var levelExists = util.exists( info.level );
    var highlightClass = 'highlight';

    if ( dateExists )
      util.text( nodes.lastSavedDate, util.getDateAndTime( info.date ), true );

    if ( levelExists )
      util.text( nodes.lastSavedLevel, settings.levelNameLabel + ' ' + ( info.level + 1 ), true );
  
    if ( dateExists || levelExists ) {
      util.addClass( nodes.savedInfo, highlightClass );

      util.timeout( function() {
        util.removeClass( nodes.savedInfo, highlightClass );
      }, settings.saveHighlightDelay )();
    }
  };


  return Options;
});