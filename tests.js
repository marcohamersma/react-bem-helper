/*global it, describe, expect */
var BEMHelper = require('./index');

function resultWithClassName(className) {
  return {
    className: className
  };
}

function resultAsString(className) {
  return className;
}

describe('react-bem-helper', createSuite(BEMHelper, resultWithClassName));
describe('react-bem-helper block', createSuite(BEMHelper.block, resultAsString));

function createSuite(Helper, helperResult) {
  return function() {
    var bemhelper = new Helper('block');

    it('should return className for the block when no arguments given', function() {
      var bemhelperWithoutPrefix = new Helper({
        name: 'block',
        prefix: ''
      });

      var bemhelperWithoutPrefix2 = new Helper({
        name: 'block',
        prefix: null
      });

      expect(bemhelper('')).toEqual(helperResult('block'));
      expect(bemhelper()).toEqual(helperResult('block'));
      expect(bemhelperWithoutPrefix('')).toEqual(helperResult('block'));
      expect(bemhelperWithoutPrefix2('')).toEqual(helperResult('block'));
    });

    it('should return classNames for the block and modifier when modifier given', function() {
      expect(bemhelper('', 'funny')).toEqual(helperResult('block block--funny'));
    });

    it('should return className for the element when element is given', function() {
      expect(bemhelper('element')).toEqual(helperResult('block__element'));
    });

    it('should return classNames for the element and the modifier when a modifier is given', function() {
      expect(bemhelper('element', 'modifier')).toEqual(helperResult('block__element block__element--modifier'));
    });

    describe('when using object as arguments', function() {
      it ('should return className for the block when empty object given', function() {
        expect(bemhelper({})).toEqual(helperResult('block'));
      });

      it('should return className for the element when element is given', function() {
        expect(bemhelper({
          element: 'element'
        })).toEqual(helperResult('block__element'));
      });

      it('should return classNames for the block and modifier when modifier given', function() {
        expect(bemhelper({
          modifier: 'modifier'
        })).toEqual(helperResult('block block--modifier'));
      });

      it('should return classNames for the block and modifier when modifier given as object', function() {
        expect(bemhelper({
          modifiers: { 'modifier': true }
        })).toEqual(helperResult('block block--modifier'));
      });

      it('should return classNames for the element and the modifier when a modifier is given', function() {
        expect(bemhelper({
          element: 'element',
          modifier: 'modifier'
        })).toEqual(helperResult('block__element block__element--modifier'));
      });

      it('should return classNames for the element and the modifier when a modifier is given', function() {
        expect(bemhelper({
          element: 'element',
          modifier: 'modifier'
        })).toEqual(helperResult('block__element block__element--modifier'));
      });
    });

    describe(', when given multiple modifiers', function() {
      it('as an array, should return classNames for the element and each modifier given', function() {
        var modifiers = ['one', 'two'];
        expect(bemhelper('', modifiers)).toEqual(helperResult('block block--one block--two'));
      });

      it('as an object, should return classNames for the element and each modifier that is truthy', function() {
        var modifiers = {
          'one': false,
          'two': true,
          'three': false,
          'four': function() { return false; },
          'five': function() { return true; }
        };

        expect(bemhelper('', modifiers)).toEqual(helperResult('block block--two block--five'));
        expect(bemhelper(null, modifiers)).toEqual(helperResult('block block--two block--five'));
        expect(bemhelper({ modifiers: modifiers })).toEqual(helperResult('block block--two block--five'));
      });
    });

    it('should append extra classNames when given as an array', function() {
      var extraClasses = ['one', 'two'];
      expect(bemhelper('', null, extraClasses)).toEqual(helperResult('block one two'));

      expect(bemhelper('element', '', extraClasses)).toEqual(helperResult('block__element one two'));
      expect(bemhelper({ extra: extraClasses })).toEqual(helperResult('block one two'));
    });

    it('should append extra classNames for truthy values when given as an object', function() {
      var extraClasses = {
        'one': false,
        'two': true,
        'three': false
      };

      expect(bemhelper('', '', extraClasses)).toEqual(helperResult('block two'));
      expect(bemhelper({ extra: extraClasses })).toEqual(helperResult('block two'));
    });

    it('when given a prefix, should append generated BEM classes with that', function() {
      var prefixedBEM = new Helper({
        name: 'block',
        prefix: 'mh-'
      });

      expect(prefixedBEM('')).toEqual(helperResult('mh-block'));
      expect(prefixedBEM('element')).toEqual(helperResult('mh-block__element'));
      expect(prefixedBEM('', 'modifier')).toEqual(helperResult('mh-block mh-block--modifier'));
      expect(prefixedBEM('', '', 'class')).toEqual(helperResult('mh-block class'));
    });

    it('when modifierDelimiter option is set, should prefix modifier with that', function() {
      var modifierBem = new Helper({
        name: 'block',
        modifierDelimiter: '_'
      });

      expect(modifierBem('', 'modifier')).toEqual(helperResult('block block_modifier'));

      var modifierBem = new Helper({
        name: 'block',
        modifierDelimiter: '🐘'
      });

      expect(modifierBem('', 'modifier')).toEqual(helperResult('block block🐘modifier'));
    });
  }
}
