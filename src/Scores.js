define(['firebase', 'util', 'nodes'], function( Firebase, util, nodes ) {
  'use strict';

  function Scores() {
    var ref = new Firebase( 'https://lights-out.firebaseio.com' );

    this.collection = ref.child( 'scores' );
    this.loading = util.elt( 'div', nodes.loadingClass, null, 'loading...' );
  }

  Scores.prototype.constructor = Scores;

  Scores.prototype.save = function( name, score ) {
    if ( !name || !score ) return;

    this.collection.push({
      name:  name,
      score: score,
      date:  Date.now()
    });
  };

  Scores.prototype.showForm = function() {
    // var self = this;
    //
    // util.append( nodes.main, this.loading );
    //
    // this.collection.on('value', function( snapshot ) {
    //
    //   util.remove( nodes.main, self.loading );
    // }, function( err ) {
    //   console.log( err );
    // });
  };

  Scores.prototype.showBoard = function() {
    var self = this;

    util.append( nodes.main, this.loading );

    this.collection.on('value', function( snapshot ) {
      var scoresListWrapper = util.elt( 'div', 'high-scores-wrapper' );
      var scoresList = util.elt( 'ul', 'high-scores' );
      var scores     = toSortedArray( snapshot.val() );

      var listItems = scores.map(function( score ) {
        var li = util.elt( 'li', 'score-row' );

        util.append( li, [
          util.elt( 'span', 'name',  null, score.name ),
          util.elt( 'span', 'score', null, score.score ),
          util.elt( 'span', 'date',  null, util.getDateAndTime( score.date ))
        ]);

        return li;
      });

      util
        .append( scoresList, listItems )
        .remove( nodes.main, self.loading )
        .append( scoresListWrapper, scoresList )
        .append( nodes.main, scoresListWrapper );
    }, function( err ) {
      console.log( err );
    });
  };

  var toSortedArray = function(obj) {
    if (!(obj instanceof Object)) return;

    return Object.keys(obj).map(function(key) {
      return obj[key];
    }).sort(function(current, next) {
      return current.score < next.score;
    });
  };


  return Scores;
});
