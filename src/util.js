define(function() {
  'use strict';

  var util = {};


  //
  // check if x exists, is not null nor empty
  //
  util.exists = function( x ) {
    return (
      ( typeof x !== 'undefined' ) && 
      ( x !== null ) && 
      ( x ) && 
      ( x.length )
    );
  };


  //
  // clone an array and all of its contents
  //
  util.cloneArray = function( arr ) {
    return arr.slice( 0 );
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
  util.addClasses = function( node, classes ) {
    if ( Array.isArray( classes ) ) {
      classes.forEach(function( className ) {
        node.classList.add( className );
      });
    } else {
      node.classList.add( classes );
    }

    return node;
  };


  //
  // remove classes from an element
  //
  util.removeClasses = function( node, classes ) {
    if ( Array.isArray( classes ) ) {
      classes.forEach(function( className ) {
        node.classList.remove( className );
      });
    } else {
      util.classList.remove( classes );
    }

    return node;
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
  };


  //
  // create a DOM element
  //
  util.elt = function( name, classNames, attrs, text ) {
    var elt = document.createElement( name );

    if ( this.exists( classNames ) ) this.addClasses( elt, classNames );
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
  };


  //
  // remove an element from the DOM
  //
  util.remove = function( parent, child ) {
    parent.removeChild( child );
  };


  //
  // get element by class
  //
  util.getByClass = function( className ) {
    return document.getElementsByClassName( className );
  };


  //
  // get element by id
  //
  util.getById = function( id ) {
    return document.getElementById( id );
  };


  //
  // get an element by its attribute and attribute value
  //
  // util.getByAttr = function( attr, value ) {
  //  var nodes = document.querySelectorAll( '[' + attr + ']=' + value );

  //  return nodes || [];
  // };


  return util;
});