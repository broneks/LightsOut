define(function() {
  'use strict';

  var storage = {};
  var id      = 'lights';

  //
  // save
  //
  storage.save = function( gameInfo ) {
    var obj       = {};
    var processed = {};
    var info = gameInfo.join('|');
    var k    = Math.random().toString( 36 ).substr( 2, 5 );

    // game info, key and date saved
    obj.i = this.cipher( info, k );
    obj.k = k;
    obj.d = Date.now();

    localStorage.setItem( id, JSON.stringify( obj ) );

    processed.date  = new Date( obj.d );
    processed.level = parseInt( gameInfo[3] );

    return processed;
  };


  //
  // load
  //
  storage.load = function() {
    var retrieved = JSON.parse( localStorage.getItem( id ) );
    var rawInfo;
    var processed;

    if ( retrieved ) {
      rawInfo = ( this.cipher( retrieved.i, retrieved.k ) ).split('|');
      
      processed = {};

      processed.date       = new Date( retrieved.d );
      processed.theme      = rawInfo[0];
      processed.showScreen = rawInfo[1] === 'true'; // convert to bool
      processed.score      = parseInt( rawInfo[2] );
      processed.level      = parseInt( rawInfo[3] );
    }

    return processed;
  };


  //
  // clear
  //
  storage.clear = function() {
    localStorage.removeItem( id );
  };


  //
  // cipher
  //
  storage.cipher = function( str, key ) {
    var l = key.length;
    var fromCharCode = String.fromCharCode;

    return str.replace(/[\s\S]/g, function( c, i ) {
      return fromCharCode( key.charCodeAt( i % l ) ^ c.charCodeAt( 0 ) );
    });
  };

  return storage;
});