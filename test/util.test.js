define(function( require ) {
  'use strict';

  if ( typeof mocha === 'undefined' ) return;

  var util = require('util');

  describe('util', function() {
    var mochaDiv = document.getElementById('mocha');
    var toString = Object.prototype.toString;
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
        assert.isTrue(util.exists(array));
        assert.isTrue(util.exists(obj));
        assert.isTrue(util.exists(str));
        assert.isTrue(util.exists(num));
        assert.isTrue(util.exists(bool));
        assert.isTrue(util.exists(func));
        assert.isTrue(util.exists(nan));
      });
    });


    describe('notExists()', function() {
      it('should return true', function() {
        assert.isTrue(util.notExists(none));
        assert.isTrue(util.notExists(undef));
        assert.isTrue(util.notExists(undef2));
        assert.isTrue(util.notExists(undef3));
      });
    });


    describe('isNumber()', function() {
      it('should return true', function() {
        var integer    = 123;
        var decimal    = 0.123;
        var negative   = -123;
        var expression = 2 + 2;

        assert.isTrue(util.isNumber(integer));
        assert.isTrue(util.isNumber(decimal));
        assert.isTrue(util.isNumber(negative));
        assert.isTrue(util.isNumber(expression));
      });

      it('should return false', function() {
        assert.isFalse(util.isNumber(nan));
        assert.isFalse(util.isNumber(array));
        assert.isFalse(util.isNumber(obj));
        assert.isFalse(util.isNumber(str));
        assert.isFalse(util.isNumber(bool));
        assert.isFalse(util.isNumber(func));
      });
    });


    describe('cloneArray()', function() {
      it('should return a cloned array', function() {
        var cloned = util.cloneArray(array);

        assert.deepEqual(cloned, array);
      });

      it('should do nothing', function() {
        assert.isUndefined(util.cloneArray(obj));
        assert.isUndefined(util.cloneArray(str));
        assert.isUndefined(util.cloneArray(num));
        assert.isUndefined(util.cloneArray(bool));
        assert.isUndefined(util.cloneArray(func));
        assert.isUndefined(util.cloneArray(nan));
        assert.isUndefined(util.cloneArray(none));
        assert.isUndefined(util.cloneArray(undef));
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
        assert.isUndefined(util.greaterNumber(obj, obj));
        assert.isUndefined(util.greaterNumber(str, str));
        assert.isUndefined(util.greaterNumber(bool, bool));
        assert.isUndefined(util.greaterNumber(func, func));
        assert.isUndefined(util.greaterNumber(nan, nan));
        assert.isUndefined(util.greaterNumber(none, none));
        assert.isUndefined(util.greaterNumber(undef, undef));
      });
    });


    describe('timeout()', function() {
      it('should timeout for 100 ms', function( done ) {
        var callback = function() {
          done();
        };
        
        util.timeout( callback, 100 )();
      });

      it('should preserve callback arguments', function( done ) {
        var callback = function( first, second ) {
          if ( ( first > 3 ) && second ) 
            done();
        };
        
        util.timeout( callback, 100 )( 5, true );
      });

      it('should preserve reference to this', function( done ) {
        var testObj  = {
          getThis : function() {
            return this;
          },
          callback : function() {
            done();
          },
          indirect : function() {
            this.callback();
          }
        }
        
        util.timeout( testObj.indirect, 100, testObj.getThis() )();
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
        assert.isUndefined(util.getDateAndTime(obj));
        assert.isUndefined(util.getDateAndTime(str));
        assert.isUndefined(util.getDateAndTime(bool));
        assert.isUndefined(util.getDateAndTime(func));
        assert.isUndefined(util.getDateAndTime(nan));
        assert.isUndefined(util.getDateAndTime(none));
        assert.isUndefined(util.getDateAndTime(undef));
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
        assert.isUndefined(util.getKey(obj, ['2']));
        assert.isUndefined(util.getKey(obj, {num: 3}));

        assert.isUndefined(util.getKey(obj));
        assert.isUndefined(util.getKey(str));
        assert.isUndefined(util.getKey(bool));
        assert.isUndefined(util.getKey(func));
        assert.isUndefined(util.getKey(nan));
        assert.isUndefined(util.getKey(none));
        assert.isUndefined(util.getKey(undef));
      });
    });


    describe('getByClass()', function() {
      var notEmptyHTMLCollection = function( obj ) {
        return ( obj.toString() === '[object HTMLCollection]' ) && obj.length > 0;
      };
      var notEmptyArray = function( array ) {
        return ( toString.call( array ) === '[object Array]' ) && array.length > 0;
      };

      it('should return an non-empty array of DOM elements', function() {
        var gridRows = util.getByClass( 'grid-row', true );

        assert.isTrue(notEmptyArray( gridRows ));
      });

      it('should return an empty array of DOM elements', function() {
        var notFound = util.getByClass( 'not-found', true );

        assert.isFalse(notEmptyArray( notFound ));
      });

      it('should return a non-empty HTMLCollection object', function() {
        var gridRows = util.getByClass( 'grid-row' );

        assert.isTrue(notEmptyHTMLCollection( gridRows ));
      });

      it('should return an empty HTMLCollection object', function() {        
        var notFound = util.getByClass( 'not-found' );

        assert.isFalse(notEmptyHTMLCollection( notFound ));
      });
    });


    describe('getById()', function() {
      it('should return DOM element with id of "level-name"', function() {
        var levelName = util.getById( 'level-name' );

        assert.equal(levelName.id, 'level-name');
      });

      it('should return null', function() {
        var notFound = util.getById( 'not-found' );
        
        assert.isNull(notFound);
      });
    });


    describe('elt()', function() {
      it('should create a checkbox element', function() {
        var el = util.elt('input', null, [
          {type: 'checkbox'}
        ]);

        assert.equal(el.tagName, 'INPUT');
        assert.equal(el.type, 'checkbox');
      });

      it('should create a div with class of "wrapper" and data-test attribute of "foo"', function() {
        var el = util.elt('div', 'wrapper', [
          {'data-test': 'foo'}
        ]);

        assert.equal(el.tagName, 'DIV');
        assert.equal(el.className, 'wrapper');
        assert.equal(el.getAttribute('data-test'), 'foo');
      });

      it('should create a paragraph element containing the text: "lorem ipsum"', function() {
        var text = 'lorem ipsum';
        var el   = util.elt('p', null, null, text);

        assert.equal(el.tagName, 'P');
        assert.equal(el.innerHTML, text);
      });
    });


    describe('___ tests that use div#test-div ___', function() {
      var testDiv;

      beforeEach(function() {
        testDiv    = document.createElement('div');
        testDiv.id = 'test-div';
        mochaDiv.appendChild(testDiv);

        return testDiv;
      });


      describe('addAttrs()', function() {
        it('should add data-test attribute and style attribute', function() {
          var attrs = [
            {'data-test' : 'foo'},
            {'style'     : 'color: red;'}
          ];

          util.addAttrs(testDiv, attrs);

          var dataTestAttr = testDiv.getAttribute('data-test');
          var styleAttr    = testDiv.getAttribute('style');

          assert.equal(dataTestAttr, attrs[0]['data-test']);
          assert.equal(styleAttr, attrs[1]['style']);
        });
      });


      describe('addClass()', function() {
        it('should add two classes: "foo" and "bar"', function() {
          var classNames = ['foo', 'bar'];

          util.addClass(testDiv, classNames);

          assert.equal(testDiv.className, classNames.join(' '));
        });

        it('should add class of "coffee"', function() {
          var className = 'coffee';

          util.addClass(testDiv, className);

          assert.equal(testDiv.className, className);
        });
      });


      describe('hasClass()', function() {
        it('should have a class of "skyscraper"', function() {
          var className = 'skyscraper';

          testDiv.className = className;

          assert.isTrue(util.hasClass(testDiv, className));
        });

        it('should not have a class of "atlantic"', function() {
          assert.isFalse(util.hasClass(testDiv, 'atlantic'));
        });
      });


      describe('removeClass()', function() {
        beforeEach(function() {
          testDiv.className = 'foo bar baz';
        });

        it('should remove class of "foo"', function() {
          util.removeClass(testDiv, 'foo');

          assert.equal(testDiv.className, 'bar baz');
        });

        it('should remove classes of "bar" and "baz"', function() {
          util.removeClass(testDiv, ['bar', 'baz']);

          assert.equal(testDiv.className, 'foo');
        });

        it('should remove all classes', function() {
          util.removeClass(testDiv, true);

          assert.equal(testDiv.className, '');
        });
      });


      describe('toggleClass()', function() {
        it('should toggle a class', function() {
          var className = 'this-is-a-class';

          util.toggleClass(testDiv, className);
          assert.equal(testDiv.className, className);

          util.toggleClass(testDiv, className);
          assert.equal(testDiv.className, '');
        });
      });


      describe('text()', function() {
        it('should append a textNode containing the text: "hello world"', function() {
          util.text(testDiv, 'hello world');

          assert.equal(testDiv.innerHTML, 'hello world');
        });

        it('should replace the inner text with: "blast off"', function() {
          testDiv.innerHTML = 'hello world ';

          util.text(testDiv, 'blast off', true);

          assert.equal(testDiv.innerHTML, 'blast off');
        });
      });


      describe('append()', function() {
        var testOne = document.createElement('div');
        testOne.id  = 'test-one';

        var testTwo = document.createElement('div');
        testTwo.id  = 'test-two';

        it('should append testOne to testDiv', function() {
          util.append(testDiv, testOne);

          assert.equal(testDiv.childNodes[0], testOne);
        });

        it('should append both testOne and testTwo to testDiv', function() {
          util.append(testDiv, [testOne, testTwo]);

          assert.equal(testDiv.childNodes[0], testOne);
          assert.equal(testDiv.childNodes[1], testTwo);
        });
      });


      describe('remove()', function() {
        var testOne = document.createElement('div');
        testOne.id  = 'test-one';

        it('should remove testOne child from testDiv', function() {
          testDiv.appendChild(testOne);
          
          assert.equal(testDiv.childNodes[0], testOne);

          util.remove(testDiv, testOne);

          assert.equal(testDiv.childNodes.length, 0);
        });
      });


      afterEach('after', function() {
        mochaDiv.removeChild(testDiv);
      });
    });
  });

});