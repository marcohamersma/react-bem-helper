/**
 * @file react-bem-helper/index.d.ts
 *
 * Created by Zander Otavka on 2/11/17.
 */

interface BEMHelper<TReturn extends (string | BEMHelper.ReturnObject)> extends
  BEMHelper.HelperFunction<TReturn> { }

declare namespace BEMHelper {
  /**
   * A mapping of strings to predicate functions or booleans.
   *
   * The values define whether the keys should be included in the list.
   */
  interface PredicateSet {
    [key: string]: boolean | (() => boolean);
  }

  /**
   * Several ways to define a set of strings words.
   *
   * It can be:
   *   * A string of words separated by spaces.
   *   * An array of space-separated word strings.
   *   * A predicate set of space-separated word strings.
   */
  type WordSet = string | string[] | PredicateSet;

  interface ElementArguments {
    /**
     * The name of the BEM element.
     */
    element?: string;
  }

  interface ModifierArguments extends ElementArguments {
    /**
     * A set of one or more modifiers.
     */
    modifier?: WordSet;

    /**
     * A set of one or more modifiers.
     */
    modifiers?: WordSet;
  }

  interface HelperArguments extends ModifierArguments {
    /**
     * A set of extra plain classes to add without BEM prefixing.
     */
    extra?: WordSet;
  }

  interface ReturnObject {
    className: string;
  }

  /**
   * A function for creating BEM classes for a block.
   */
  interface HelperFunction<TReturn extends (string | ReturnObject)> {
    /**
     * @param {?string} element The name of the BEM element.
     * @param {?List} modifiers A list of BEM modifiers to be applied to the element.
     * @param {?List} extra A list of plain classes to add to the final classList.
     */
    (element?: string, modifiers?: WordSet, extra?: WordSet): TReturn;
    (args: HelperArguments): TReturn;
  }

  interface BaseConstructorOptions {
    /**
     * The name of the BEM block.
     */
    name: string;

    /**
     * A string to prefix the block with.
     */
    prefix?: string;

    /**
     * A string to use to separate the element name from the modifier.
     */
    modifierDelimiter?: string;
  }

  interface StringConstructorOptions extends BaseConstructorOptions {
    /**
     * Whether to return a string or an object containing a classList field.
     */
    outputIsString: true;
  }

  interface ObjectConstructorOptions extends BaseConstructorOptions {
    /**
     * Whether to return a string or an object containing a classList field.
     */
    outputIsString: false;
  }

  type ConstructorOptions = StringConstructorOptions | ObjectConstructorOptions;

  interface Constructor<TDefaultReturn extends (string | ReturnObject)> {
    new (name: string): BEMHelper<TDefaultReturn>;
    new (options: BaseConstructorOptions): BEMHelper<TDefaultReturn>;
    new (options: StringConstructorOptions): BEMHelper<string>;
    new (options: ObjectConstructorOptions): BEMHelper<ReturnObject>;
    (name: string): BEMHelper<TDefaultReturn>;
    (options: BaseConstructorOptions): BEMHelper<TDefaultReturn>;
    (options: StringConstructorOptions): BEMHelper<string>;
    (options: ObjectConstructorOptions): BEMHelper<ReturnObject>;
  }

  /**
   * Create a new helper object for a BEM block.
   */
  interface RootConstructor extends Constructor<ReturnObject> {
    /**
     * Return a new constructor with the given defaults.
     */
    withDefaults(defaults: Partial<StringConstructorOptions>): Constructor<string>;

    /**
     * Return a new constructor with the given defaults.
     */
    withDefaults(defaults: Partial<ObjectConstructorOptions>): Constructor<ReturnObject>;
  }
}

declare var BEMHelper: BEMHelper.RootConstructor;
export = BEMHelper;
