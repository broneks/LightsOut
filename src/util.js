define(function() {
  'use strict';

  var util = {};

  var toString       = Object.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var arraySlice     = Array.prototype.slice;

  util.not = {};

  function not( func ) {
    return function() {
      return !func.apply( null, arraySlice.call( arguments ) );
    };
  }


  //
  // check if x exists, is not null nor empty
  //
  util.exists = function( x ) {
    return ( typeof x !== 'undefined' ) && ( x !== null );
  };
  util.exists.api = [ 'not' ];


  //
  // check if x is a number
  //
  util.isNumber = function( x ) {
    return ( x === x ) && ( toString.call( x ) === '[object Number]' );
  };
  util.isNumber.api = [ 'not' ];


  //
  // check if x is a function
  //
  util.isFunction = function( x ) {
    return toString.call( x ) === '[object Function]' || typeof x === 'function';
  };
  util.isFunction.api = [ 'not' ];


  //
  // clone an array and all of its contents
  //
  util.cloneArray = function( arr ) {
    if ( !Array.isArray( arr ) ) return;

    return arr.slice( 0 );
  };


  //
  // return the bigger number
  //
  util.greaterNumber = function( a, b ) {
    var greater;

    if ( this.isNumber( a ) && this.isNumber( b ) )
      greater = ( a > b ) ? a : b;

    return greater;
  };


  //
  // curried set timeout wrapper
  //
  util.timeout = function( callback, time, self ) {
    return function() {
      var args = arguments;

      window.setTimeout( function() {
        callback.apply( self, args );
      }, time );
    };
  };


  //
  // get formatted date and time
  //
  util.getDateAndTime = (function() {
    var MONTHS = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    return function( date ) {
      if ( toString.call( date ) !== '[object Date]' ) {
        date = new Date( date );

        if ( isNaN( date ) ) return;
      }

      var month   = MONTHS[date.getMonth()];
      var day     = date.getDate();
      var hours   = ( date.getHours() < 10 ? '0' : '' ) + date.getHours();
      var minutes = ( date.getMinutes() < 10 ? '0' : '' ) + date.getMinutes();

      var dateString = month + ' ' + day + ' at ' + hours + ':' + minutes;

      return dateString;
    };
  })();


  //
  // get key by string or number value
  //
  util.getKey = function( obj, value ) {
    var key;

    for( key in obj) {
      if( obj[key] === value )
        return key;
    }
  };


  //
  // check if value is in array
  //
  util.foundInArray = function( arr, value ) {
    if ( Array.isArray( arr ) ) {
      return arr.indexOf( value ) > -1;
    }
  };
  util.foundInArray.api = [ 'not' ];


  //
  // object to array
  //
  util.toArray = function( obj ) {
    if ( typeof obj === 'object' && !!obj ) {

      return Object.keys( obj ).map(function( key ) {
        return obj[key];
      });
    }
  };


  //
  // add an attribute and its value to an element
  //
  util.addAttrs = function( node, attrs ) {
    if ( Array.isArray( attrs ) ) {
      attrs.forEach(function( attr ) {
        var key = Object.keys( attr );
        var val = null;

        if ( key ) {
          val = attr[key];

          if ( val ) node.setAttribute( key, val );
        }
      });
    }

    return node;
  };


  //
  // add classes to an element
  //
  util.addClass = function( node, classes ) {
    if ( Array.isArray( classes ) )
      classes.forEach(function( className ) {
        node.classList.add( className );
      });
    else
      node.classList.add( classes );

    return node;
  };


  //
  // checks if element has a class
  //
  util.hasClass = function( node, className ) {
    return node.classList.contains( className );
  };
  util.hasClass.api = [ 'not' ];


  //
  // remove classes from an element
  //
  util.removeClass = function( node, classes ) {
    // remove all classes
    if ( classes === true )
      node.className = '';

    if ( Array.isArray( classes ) )
      classes.forEach(function( className ) {
        node.classList.remove( className );
      });
    else
      node.classList.remove( classes );

    return node;
  };


  //
  //
  //
  util.toggleClass = function( node, className ) {
    if ( node.classList.contains( className ) ) {
      this.removeClass( node, className );
      return false;
    }
    else {
      this.addClass( node, className );
      return true;
    }
  };


  //
  // create or replace a text node
  //
  util.text = function( node, str, replace ) {
    var text = document.createTextNode( str );

    if ( replace )
      node.innerHTML = str;
    else
      this.append( node, text );

    return util;
  };


  //
  // create a DOM element
  //
  util.elt = function( name, classNames, attrs, text ) {
    var elt = document.createElement( name );

    if ( this.exists( classNames ) ) this.addClass( elt, classNames );
    if ( this.exists( attrs ) ) this.addAttrs( elt, attrs );
    if ( this.exists( text )  ) this.text( elt, text );

    return elt;
  };


  //
  // append child or an array of children to a parent element
  //
  util.append = function( parent, child ) {
    if ( Array.isArray( child ) )
      child.forEach(function( childNode ) {
        parent.appendChild( childNode );
      });
    else
      parent.appendChild( child );

    return util;
  };


  //
  // remove an element from the DOM
  //
  util.remove = function( parent, child, removeAll ) {
    if ( removeAll ) {
      arraySlice.call( parent.children ).forEach(function( c ) {
        parent.removeChild( c );
      });
    } else {
      parent.removeChild( child );
    }

    return util;
  };


  //
  // add event listener with context
  //
  util.addEvent = function( node, eventType, callback, useCapture, context ) {
    var fn = context ? callback.bind( context ) : callback;

    node.addEventListener( eventType, fn, useCapture );

    return util;
  };


  //
  // get element by class
  //
  util.getByClass = function( className, returnArray ) {
    var elts = document.getElementsByClassName( className );

    if ( returnArray )
      return arraySlice.call( elts );
    else
      return elts;
  };


  //
  // get element by id
  //
  util.getById = function( id ) {
    return document.getElementById( id );
  };



  //
  // set interfaces
  //
  (function setInterfaces() {
    var options = util;
    var option;
    var api;

    for ( option in options ) {
      if ( hasOwnProperty.call( options, option ) && util.isFunction( options[option] ) ) {
        api = options[option].api || [];

        // limited to 'not' for now
        if ( api[0] === 'not' ) {
          util.not[option] = not( util[option] );
        }
      }
    }
  })();


  return util;
});
