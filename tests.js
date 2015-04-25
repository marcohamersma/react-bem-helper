/*global it, describe, expect */
var BEMhelper = require('./index');

function resultWithClassName(className) {
  return {
    className: className
  };
}

describe('react-bem-helper', function() {
  var bemhelper = new BEMhelper('block');

  describe('with custom prefix', function() {
    it('should remove prefix when empty', function() {
      var bemhelperWithoutPrefix = new BEMhelper({
        name: 'block',
        prefix: ''
      });

      expect(bemhelperWithoutPrefix('')).toEqual(resultWithClassName('block'));
    });

    it('should have custom prefix when one is set', function() {
      var bemhelperCustomPrefix = new BEMhelper({
        name: 'block',
        prefix: 'mh-'
      });

      expect(bemhelperCustomPrefix('')).toEqual(resultWithClassName('mh-block'));
    });
  });

  it('should return className for the block when no arguments given', function() {
    expect(bemhelper('')).toEqual(resultWithClassName('g-block'));

    expect(bemhelper()).toEqual(resultWithClassName('g-block'));
  });

  it('should return classNames for the block and modifier when modifier given', function() {
    expect(bemhelper('', 'funny')).toEqual(resultWithClassName('g-block g-block--funny'));
  });

  it('should return className for the element when element is given', function() {
    expect(bemhelper('element')).toEqual(resultWithClassName('g-block__element'));
  });

  it('should return classNames for the element and the modifier when a modifier is given', function() {
    expect(bemhelper('element', 'modifier')).toEqual(resultWithClassName('g-block__element g-block__element--modifier'));
  });

  describe(', when given multiple modifiers', function() {
    it('as an array, should return classNames for the element and each modifier given', function() {
      var modifiers = ['one', 'two'];
      expect(bemhelper('', modifiers)).toEqual(resultWithClassName('g-block g-block--one g-block--two'));
    });

    it('as an object, should return classNames for the element and each modifier that is truthy', function() {
      var modifiers = {
        'one': false,
        'two': true,
        'three': false,
        'four': function() { return false; }
      };

      expect(bemhelper('', modifiers)).toEqual(resultWithClassName('g-block g-block--two'));
    });
  });

  it('should append extra classNames when given as an array', function() {
    var extraClasses = ['one', 'two'];
    expect(bemhelper('', null, extraClasses)).toEqual(resultWithClassName('g-block one two'));

    expect(bemhelper('element', '', extraClasses)).toEqual(resultWithClassName('g-block__element one two'));
  });

  it('should append extra classNames for truthy values when given as an object', function() {
    var extraClasses = {
      'one': false,
      'two': true,
      'three': false
    };

    expect(bemhelper('', '', extraClasses)).toEqual(resultWithClassName('g-block two'));
  });
});


