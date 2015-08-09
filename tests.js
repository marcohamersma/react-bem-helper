/*global it, describe, expect */
var BEMhelper = require('./index');

function resultWithClassName(className) {
  return {
    className: className
  };
}

describe('react-bem-helper', function() {
  var bemhelper = new BEMhelper('block');

  it('should return className for the block when no arguments given', function() {
    var bemhelperWithoutPrefix = new BEMhelper({
      name: 'block',
      prefix: ''
    });

    var bemhelperWithoutPrefix2 = new BEMhelper({
      name: 'block',
      prefix: null
    });

    expect(bemhelper('')).toEqual(resultWithClassName('block'));
    expect(bemhelper()).toEqual(resultWithClassName('block'));
    expect(bemhelperWithoutPrefix('')).toEqual(resultWithClassName('block'));
    expect(bemhelperWithoutPrefix2('')).toEqual(resultWithClassName('block'));
  });

  it('should return classNames for the block and modifier when modifier given', function() {
    expect(bemhelper('', 'funny')).toEqual(resultWithClassName('block block--funny'));
  });

  it('should return className for the element when element is given', function() {
    expect(bemhelper('element')).toEqual(resultWithClassName('block__element'));
  });

  it('should return classNames for the element and the modifier when a modifier is given', function() {
    expect(bemhelper('element', 'modifier')).toEqual(resultWithClassName('block__element block__element--modifier'));
  });

  describe('when using object as arguments', function() {
    it ('should return className for the block when empty object given', function() {
      expect(bemhelper({})).toEqual(resultWithClassName('block'));
    });

    it('should return className for the element when element is given', function() {
      expect(bemhelper({
        element: 'element'
      })).toEqual(resultWithClassName('block__element'));
    });

    it('should return classNames for the block and modifier when modifier given', function() {
      expect(bemhelper({
        modifier: 'modifier'
      })).toEqual(resultWithClassName('block block--modifier'));
    });

    it('should return classNames for the block and modifier when modifier given as object', function() {
      expect(bemhelper({
        modifiers: { 'modifier': true }
      })).toEqual(resultWithClassName('block block--modifier'));
    });

    it('should return classNames for the element and the modifier when a modifier is given', function() {
      expect(bemhelper({
        element: 'element',
        modifier: 'modifier'
      })).toEqual(resultWithClassName('block__element block__element--modifier'));
    });

    it('should return classNames for the element and the modifier when a modifier is given', function() {
      expect(bemhelper({
        element: 'element',
        modifier: 'modifier'
      })).toEqual(resultWithClassName('block__element block__element--modifier'));
    });
  });

  describe(', when given multiple modifiers', function() {
    it('as an array, should return classNames for the element and each modifier given', function() {
      var modifiers = ['one', 'two'];
      expect(bemhelper('', modifiers)).toEqual(resultWithClassName('block block--one block--two'));
    });

    it('as an object, should return classNames for the element and each modifier that is truthy', function() {
      var modifiers = {
        'one': false,
        'two': true,
        'three': false,
        'four': function() { return false; },
        'five': function() { return true; }
      };

      expect(bemhelper('', modifiers)).toEqual(resultWithClassName('block block--two block--five'));
      expect(bemhelper(null, modifiers)).toEqual(resultWithClassName('block block--two block--five'));
      expect(bemhelper({ modifiers: modifiers })).toEqual(resultWithClassName('block block--two block--five'));
    });
  });

  it('should append extra classNames when given as an array', function() {
    var extraClasses = ['one', 'two'];
    expect(bemhelper('', null, extraClasses)).toEqual(resultWithClassName('block one two'));

    expect(bemhelper('element', '', extraClasses)).toEqual(resultWithClassName('block__element one two'));
    expect(bemhelper({ extra: extraClasses })).toEqual(resultWithClassName('block one two'));
  });

  it('should append extra classNames for truthy values when given as an object', function() {
    var extraClasses = {
      'one': false,
      'two': true,
      'three': false
    };

    expect(bemhelper('', '', extraClasses)).toEqual(resultWithClassName('block two'));
    expect(bemhelper({ extra: extraClasses })).toEqual(resultWithClassName('block two'));
  });

  it('when given a prefix, should append generated BEM classes with that', function() {
    var prefixedBEM = new BEMhelper({
      name: 'block',
      prefix: 'mh-'
    });

    expect(prefixedBEM('')).toEqual(resultWithClassName('mh-block'));
    expect(prefixedBEM('element')).toEqual(resultWithClassName('mh-block__element'));
    expect(prefixedBEM('', 'modifier')).toEqual(resultWithClassName('mh-block mh-block--modifier'));
    expect(prefixedBEM('', '', 'class')).toEqual(resultWithClassName('mh-block class'));
  });
});


