/**
 * @file react-bem-helper/index.d.ts
 *
 * Created by Brian Ingles 11/29/2018
 */

/**
 * Argument types for BEMHelper function.
 */
declare type ElementArg = string;
declare type ModifiersArg = string | Array<string> | Record<string, boolean | (() => boolean)>;
declare type ExtraArg = string | Array<string> | Record<string, boolean | (() => boolean)>;

/**
 * BEM helper functions will return either a string or an object with a string
 * className property depending on the outputIsString configuration.
 */
declare interface ClassNameObject {
  className: string;
}

/**
 * BEM helper function created by BEMHelperConstructor (e.g. new BEMHelper()).
 */
declare interface BEMHelperFunction<R extends string | ClassNameObject> {
  (
    element?: ElementArg,
    modifiers?: ModifiersArg,
    extra?: ExtraArg
  ): R;
  (
    options: {
      element?: ElementArg,
      modifiers?: ModifiersArg,
      extra?: ExtraArg
    } |
    {
      element?: ElementArg,
      modifier?: ModifiersArg,
      extra?: ExtraArg
    }
  ): R;
}

declare interface BEMHelperBaseArgs {
  name: string;
  prefix?: string;
  modifierDelimiter?: boolean;
}

/**
 * BEM helper constructor.
 * The generic Default type will determine which type is returned when no
 * outputIsString arg is provided.
 */
declare interface BEMHelper<Default extends string | ClassNameObject> {
  new (args: string): BEMHelperFunction<ClassNameObject>;

  new (args: BEMHelperBaseArgs & { outputIsString: false }): BEMHelperFunction<ClassNameObject>;
  new (args: BEMHelperBaseArgs & { outputIsString: true }): BEMHelperFunction<string>;
  new (args: BEMHelperBaseArgs & { outputIsString: boolean }): BEMHelperFunction<string | ClassNameObject>;
  new (args: BEMHelperBaseArgs): BEMHelperFunction<Default>;

  withDefaults(args: Partial<BEMHelperBaseArgs> & { outputIsString: false }): BEMHelper<ClassNameObject>;
  withDefaults(args: Partial<BEMHelperBaseArgs> & { outputIsString: true }): BEMHelper<string>;
  withDefaults(args: Partial<BEMHelperBaseArgs> & { outputIsString: boolean }): BEMHelper<string | ClassNameObject>;
  withDefaults(args: Partial<BEMHelperBaseArgs>): BEMHelper<Default>;
}

/**
 * Constructor for a BEM helper function.
 * The result type of the BEM helper function will be determined by the
 * outputIsString argument.
 */
declare const BEMHelper: BEMHelper<ClassNameObject>;

declare module 'react-bem-helper' {
  export = BEMHelper;
}