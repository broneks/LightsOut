define(function() {
  'use strict';

  var storage = {};
  var id      = 'lights';

  //
  // save
  //
  storage.save = function( info ) {
    var obj = {};
    var k   = Math.random().toString( 36 ).substr( 2, 5 );

    // game info, key and date saved
    obj.i = this.cipher( info, k );
    obj.k = k;
    obj.d = Date.now();

    localStorage.setItem( id, JSON.stringify( obj ) );

    return new Date( obj.d );
  };


  //
  // load
  //
  storage.load = function() {
    var retrieved = JSON.parse( localStorage.getItem( id ) );
    var processed;

    if ( retrieved ) {
      processed      = {};
      processed.info = ( this.cipher( retrieved.i, retrieved.k ) ).split('|');
      processed.date = new Date( retrieved.d );
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