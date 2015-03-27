define(function() {
  'use strict';

  var storage   = {};
  var storageId = 'lights-out';
  var divider   = '|';

  //
  // save
  //
  storage.save = function( gameInfo ) {
    var save      = {};
    var processed = {};
    var gameInfoString = gameInfo.join( divider );
    var key = Math.random().toString( 36 ).substr( 2, 5 );

    // game info, key and date saved
    save.i = this.cipher( gameInfoString, key );
    save.k = key;
    save.d = Date.now();

    localStorage.setItem( storageId, JSON.stringify( save ) );

    processed.date  = new Date( save.d );
    processed.level = parseInt( gameInfo[3] );

    return processed;
  };


  //
  // load
  //
  storage.load = function() {
    var retrieved;
    var rawInfo;
    var processed;

    // check for a tampered-with stored string
    try {
      retrieved = JSON.parse( localStorage.getItem( storageId ) );
    } 
    catch( e ) {
      this.clear();
    }

    if ( retrieved ) {
      rawInfo = ( this.cipher( retrieved.i, retrieved.k ) ).split( divider );

      // check for a tampered-with key
      if ( rawInfo && rawInfo.length === 4 ) {
        processed = {};

        processed.date       = new Date( retrieved.d );
        processed.theme      = rawInfo[0];
        processed.showScreen = rawInfo[1] === 'true'; // convert to bool
        processed.score      = parseInt( rawInfo[2] );
        processed.level      = parseInt( rawInfo[3] );
      } 
      else {
        this.clear();
      }
    }

    return processed;
  };


  //
  // clear
  //
  storage.clear = function() {
    localStorage.removeItem( storageId );

    console.error( 'There was a problem with loading your saved game. \n\n Sorry about that! \n\n :/' );
  };


  //
  // cipher
  //
  storage.cipher = function( str, key ) {
    var l;
    var fromCharCode = String.fromCharCode;

    if ( !str || !key ) return '';

    l = key.length;

    return str.replace(/[\s\S]/g, function( c, i ) {
      return fromCharCode( key.charCodeAt( i % l ) ^ c.charCodeAt( 0 ) );
    });
  };

  return storage;
});