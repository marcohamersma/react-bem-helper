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

      var bemhelperWithoutPrefix2 = new BEMhelper({
        name: 'block',
        prefix: null
      });

      expect(bemhelperWithoutPrefix('')).toEqual(resultWithClassName('block'));
      expect(bemhelperWithoutPrefix2('')).toEqual(resultWithClassName('block'));
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
    expect(bemhelper('')).toEqual(resultWithClassName('c-block'));

    expect(bemhelper()).toEqual(resultWithClassName('c-block'));
  });

  it('should return classNames for the block and modifier when modifier given', function() {
    expect(bemhelper('', 'funny')).toEqual(resultWithClassName('c-block c-block--funny'));
  });

  it('should return className for the element when element is given', function() {
    expect(bemhelper('element')).toEqual(resultWithClassName('c-block__element'));
  });

  it('should return classNames for the element and the modifier when a modifier is given', function() {
    expect(bemhelper('element', 'modifier')).toEqual(resultWithClassName('c-block__element c-block__element--modifier'));
  });

  describe(', when given multiple modifiers', function() {
    it('as an array, should return classNames for the element and each modifier given', function() {
      var modifiers = ['one', 'two'];
      expect(bemhelper('', modifiers)).toEqual(resultWithClassName('c-block c-block--one c-block--two'));
    });

    it('as an object, should return classNames for the element and each modifier that is truthy', function() {
      var modifiers = {
        'one': false,
        'two': true,
        'three': false,
        'four': function() { return false; }
      };

      expect(bemhelper('', modifiers)).toEqual(resultWithClassName('c-block c-block--two'));
      expect(bemhelper(null, modifiers)).toEqual(resultWithClassName('c-block c-block--two'));
    });
  });

  it('should append extra classNames when given as an array', function() {
    var extraClasses = ['one', 'two'];
    expect(bemhelper('', null, extraClasses)).toEqual(resultWithClassName('c-block one two'));

    expect(bemhelper('element', '', extraClasses)).toEqual(resultWithClassName('c-block__element one two'));
  });

  it('should append extra classNames for truthy values when given as an object', function() {
    var extraClasses = {
      'one': false,
      'two': true,
      'three': false
    };

    expect(bemhelper('', '', extraClasses)).toEqual(resultWithClassName('c-block two'));
  });
});


