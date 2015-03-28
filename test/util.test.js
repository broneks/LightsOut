define(function( require ) {
  'use strict';

  if ( typeof mocha === 'undefined' ) return;

  var util = require('util');

  describe('util', function() {
    var array  = [1, '2', 3, [], {}];
    var obj    = {zero: 2, one: '1', two: ['2'], three: {num: 3}, four: function() {}};
    var str    = '123';
    var num    = 123;
    var bool   = true;
    var func   = function() {};
    var nan    = NaN;
    var none   = null;
    var undef  = void 0;
    var undef2 = undefined;
    var undef3;

    describe('exists()', function() {
      it('should return true', function() {
        assert.equal(util.exists(array), true);
        assert.equal(util.exists(obj), true);
        assert.equal(util.exists(str), true);
        assert.equal(util.exists(num), true);
        assert.equal(util.exists(bool), true);
        assert.equal(util.exists(func), true);
        assert.equal(util.exists(nan), true);
      });
    });

    describe('notExists()', function() {
      it('should return true', function() {
        assert.equal(util.notExists(none), true);
        assert.equal(util.notExists(undef), true);
        assert.equal(util.notExists(undef2), true);
        assert.equal(util.notExists(undef3), true);
      });
    });

    describe('isNumber()', function() {
      it('should return true', function() {
        var integer    = 123;
        var decimal    = 0.123;
        var negative   = -123;
        var expression = 2 + 2;

        assert.equal(util.isNumber(integer), true);
        assert.equal(util.isNumber(decimal), true);
        assert.equal(util.isNumber(negative), true);
        assert.equal(util.isNumber(expression), true);
      });

      it('should return false', function() {
        assert.notEqual(util.isNumber(nan), true);
        assert.notEqual(util.isNumber(array), true);
        assert.notEqual(util.isNumber(obj), true);
        assert.notEqual(util.isNumber(str), true);
        assert.notEqual(util.isNumber(bool), true);
        assert.notEqual(util.isNumber(func), true);
      });
    });

    describe('cloneArray()', function() {
      it('should return a cloned array', function() {
        var cloned = util.cloneArray(array);

        assert.deepEqual(cloned, array);
      });

      it('should do nothing', function() {
        assert.equal(util.cloneArray(obj), undef);
        assert.equal(util.cloneArray(str), undef);
        assert.equal(util.cloneArray(num), undef);
        assert.equal(util.cloneArray(bool), undef);
        assert.equal(util.cloneArray(func), undef);
        assert.equal(util.cloneArray(nan), undef);
        assert.equal(util.cloneArray(none), undef);
        assert.equal(util.cloneArray(undef), undef);
      });
    });

    describe('greaterNumber()', function() {
      var a = 100;
      var b = 50;
      var c = 0.1;
      var d = 0.02;

      it('should return 100', function() {
        assert.equal(util.greaterNumber(a, b), a);
      });

      it('should return 100', function() {
        assert.equal(util.greaterNumber(b, a), a);
      });

      it('should return 100', function() {
        assert.equal(util.greaterNumber(a, a), a);
      });

      it('should return 0.1', function() {
        assert.equal(util.greaterNumber(c, d), c);
      });

      it('should return 0.1', function() {
        assert.equal(util.greaterNumber(d, c), c);
      });

      it('should do nothing', function() {
        assert.equal(util.greaterNumber(obj, obj), undef);
        assert.equal(util.greaterNumber(str, str), undef);
        assert.equal(util.greaterNumber(bool, bool), undef);
        assert.equal(util.greaterNumber(func, func), undef);
        assert.equal(util.greaterNumber(nan, nan), undef);
        assert.equal(util.greaterNumber(none, none), undef);
        assert.equal(util.greaterNumber(undef, undef), undef);
      });
    });

    describe('timeout()', function() {
      it.skip('should timeout', function() {

      });

      it.skip('should do nothing', function() {

      });
    });

    describe('getDateAndTime()', function() {
      it('should return date and time string', function() {
        var date1 = [
          new Date('March 27 2015 15:30'),
          'March 27 at 15:30'
        ];
        var date2 = [
          new Date('September 2 2015 9:30'),
          'Sept 2 at 09:30'
        ];

        assert.equal(util.getDateAndTime(date1[0]), date1[1]);
        assert.equal(util.getDateAndTime(date2[0]), date2[1]);
      });

      it('should do nothing', function() {
        assert.equal(util.getDateAndTime(obj), undef);
        assert.equal(util.getDateAndTime(str), undef);
        assert.equal(util.getDateAndTime(bool), undef);
        assert.equal(util.getDateAndTime(func), undef);
        assert.equal(util.getDateAndTime(nan), undef);
        assert.equal(util.getDateAndTime(none), undef);
        assert.equal(util.getDateAndTime(undef), undef);
      });
    });

    describe('getKey()', function() {
      it('should return "zero"', function() {
        assert.equal(util.getKey(obj, 2), 'zero');
      });

      it('should return "one"', function() {
        assert.equal(util.getKey(obj, '1'), 'one');
      });

      it('should do nothing', function() {
        // limitation
        assert.equal(util.getKey(obj, ['2']), undef);
        assert.equal(util.getKey(obj, {num: 3}), undef);

        assert.equal(util.getKey(obj), undef);
        assert.equal(util.getKey(str), undef);
        assert.equal(util.getKey(bool), undef);
        assert.equal(util.getKey(func), undef);
        assert.equal(util.getKey(nan), undef);
        assert.equal(util.getKey(none), undef);
        assert.equal(util.getKey(undef), undef);
      });
    });

    describe('getById()', function() {
      it('should return DOM element with id of "level-name"', function() {
        var levelName = util.getById('level-name');

        assert.equal(levelName.id, 'level-name');
      });

      it('should return null', function() {
        var notFound = util.getById('not-found');
        
        assert.equal(notFound, null);
      });
    });
  });

});