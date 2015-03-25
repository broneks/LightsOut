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
      this.setLastSavedInfo( stored );

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
  Options.prototype.updateTheme = function( e, changeSelectedIndex ) {
    var themeClass = settings.colourThemes[settings.currentTheme];
    var eventTargetValue;
    var currentThemeIndex;

    // very basic event detection
    if ( e && e.target.tagName) {
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
  // set toggle points screen label
  //
  Options.prototype.setTogglePointsLabel = function() {
    var label;

    if ( settings.showPointsScreen) {
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
    ];

    var savedInfo = storage.save( gameInfo );

    console.log(savedInfo);

    this.setLastSavedInfo( savedInfo );

    // display load button
    util.addClass( nodes.loadButton, 'active' );
  };


  //
  // load the game
  //
  Options.prototype.loadGame = function() {
    var loaded = storage.load();

    // override settings
    settings.currentTheme     = loaded.theme;
    settings.showPointsScreen = loaded.showScreen;
    this.controls.score       = loaded.score;

    // update the theme
    this.updateTheme( null, true );

    // update toggle points screen label
    this.setTogglePointsLabel();

    // display the loaded score
    this.controls.displayScore();

    // reset the moves counter and load saved level
    this.level.loadLevel( loaded.level );
  };


  //
  // update save info
  //
  Options.prototype.setLastSavedInfo = function( info ) {
    if ( util.exists( info.date ) )
      util.text( nodes.lastSavedDate, util.getDateAndTime( info.date ), true );

    console.log(info.level);

    if ( util.exists( info.level ) )
      util.text( nodes.lastSavedLevel, settings.levelNameLabel + ' ' + ( info.level + 1 ), true );
  };


  return Options;
});