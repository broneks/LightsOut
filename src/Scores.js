define(['firebase', 'util', 'nodes', 'settings'], function( Firebase, util, nodes, settings ) {
  'use strict';

  function Scores() {
    var ref = new Firebase( 'https://lights-out.firebaseio.com' );

    this.collection = ref.child( 'scores' );
    this.loading    = util.elt( 'div', nodes.loadingClass, null, 'loading scores...' );
    this.validationMessage = null;
  }

  Scores.prototype.constructor = Scores;

  Scores.prototype.save = function( name, score ) {
    if ( !name || util.not.isNumber( score ) ) return false;

    this.collection.push({
      name:  name,
      score: score,
      date:  Date.now()
    });

    return true;
  };

  Scores.prototype.submitForm = function( score, scoreName, takenNames ) {
    var self = this;
    var validationMessage = this.validationMessage;
    var isSaved;

    // validate
    if ( !scoreName.length ) {
      util.text( validationMessage, 'Please input a score name', true );
    }
    // check if score name is already taken
    else if ( util.foundInArray( takenNames, scoreName ) ) {
      util.text( validationMessage, 'That score name is already taken', true );
    }
    else {
      isSaved = self.save( scoreName, score );

      if ( isSaved ) {
        self.showBoard( scoreName );
      } else {
        util.text( validationMessage, 'could not submit', true );
      }
    }
  };

  Scores.prototype.showForm = function( score ) {
    var self = this;

    util.append( nodes.main, this.loading );

    this.collection.once('value', function( snapshot ) {
      var data = snapshot.val() || [];

      var clearValidation = function() {
        util.text( validationMessage, '', true );
      };

      var takenNames = util.toArray( data ).map(function( entry ) {
        return entry.name;
      });

      var scoreFormWrapper = util.elt( 'div', 'score-form-wrapper' );

      var finalScoreWrapper = util.elt( 'div', 'final-score-wrapper' );
      var finalScoreLabel   = util.elt( 'h3', 'final-score-label', null, 'Your Final Score:' );
      var finalScore        = util.elt( 'div', 'final-score', null, score );

      var instructionMessage = util.elt( 'div', 'instruction-message', null, 'Add your score to the high-scores board:' );
      var validationMessage  = self.validationMessage = util.elt( 'div', 'validation-message' );

      var submitNameWrapper = util.elt( 'div', 'submit-name-wrapper' );
      var submitNameField   = util.elt( 'input', 'score-name-field', [
          { type: 'text' },
          { maxlength: settings.maxScoreNameLength },
          { placeholder: 'add a name' }
        ]
      );
      var submitNameButton  = util.elt( 'button', ['submit-name-button', 'btn', 'btn-alpha' ], null, 'Submit It' );

      util
        .remove( nodes.main, null, true )

        .addEvent( submitNameField, 'input', clearValidation, false )
        .addEvent( submitNameButton, 'click', function() {
          self.submitForm( score, submitNameField.value, takenNames );
        }, false, self )

        .append( finalScoreWrapper, [ finalScoreLabel, finalScore ] )
        .append( submitNameWrapper, [ instructionMessage, validationMessage, submitNameField, submitNameButton ] )
        .append( scoreFormWrapper,  [ finalScoreWrapper, submitNameWrapper ] )
        .append( nodes.main, scoreFormWrapper );

      console.log( takenNames );

    }, function( err ) {
      console.log( err );
    });
  };

  Scores.prototype.showBoard = function( targetScore ) {
    util.append( nodes.main, this.loading );

    this.collection.once('value', function( snapshot ) {
      var data = snapshot.val() || [];

      var scoresListWrapper = util.elt( 'div', 'high-scores-wrapper' );
      var highScoresLabel   = util.elt( 'h3', 'high-scores-label', null, 'High Scores:' );
      var scoresList = util.elt( 'ul', 'high-scores' );
      var scores     = util.toArray( data ).sort(
        function(current, next) {
          return next.score - current.score;
        }
      );

      var listItems = scores.map(function( score, index ) {
        var li = util.elt( 'li', [ 'score-row', score.name ] );

        util.append( li, [
          util.elt( 'span', 'number', null, index + 1 ),
          util.elt( 'span', 'name',  null, score.name ),
          util.elt( 'span', 'score', null, score.score ),
          util.elt( 'span', 'date',  null, util.getDateAndTime( score.date ))
        ]);

        return li;
      });

      util
        .remove( nodes.main, null, true )
        .append( scoresList, listItems )
        .append( scoresListWrapper, scoresList )
        .append( nodes.main, [ highScoresLabel, scoresListWrapper ] );

      if ( util.exists( targetScore ) ) {
        util.getByClass( targetScore )[0].scrollIntoView();
      }

    }, function( err ) {
      console.log( err );
    });
  };


  return Scores;
});
