'use strict';

var assert    = require('assert');
var requirejs = require('requirejs');

var util = requirejs('src/util.js');

describe('util', function() {
  describe('exists()', function() {
    it('should return true', function() {
      var array = [1, 2, 3];
      var obj   = {one: '1', two: '2', three: '3'};
      var str   = '123';
      var num   = 123;
      var bool  = true;
      var func  = function() {};

      assert.equal(util.exists(array), true);
      assert.equal(util.exists(obj), true);
      assert.equal(util.exists(str), true);
      assert.equal(util.exists(num), true);
      assert.equal(util.exists(bool), true);
      assert.equal(util.exists(func), true);
    });
  });

  describe('notExists()', function() {
    it('should return true', function() {
      var none   = null;
      var undef1 = undefined;
      var undef2 = void 0;
      var undef3;

      assert.equal(util.notExists(none), true);
      assert.equal(util.notExists(undef1), true);
      assert.equal(util.notExists(undef2), true);
      assert.equal(util.notExists(undef3), true);
    });
  });
});