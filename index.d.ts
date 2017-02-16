/**
 * @file react-bem-helper/index.d.ts
 *
 * Created by Zander Otavka on 2/11/17.
 */

declare module Bem {
    interface PredicateList {
        [key: string]: boolean | (() => boolean);
    }

    type List = string | string[] | PredicateList;

    interface HelperArguments {
        element?: string;
        modifier?: List;
        modifiers?: List;
        extra?: List;
    }

    interface Helper {
        (element?: string, modifiers?: List, extra?: List): {className: string};
        (args: HelperArguments): {className: string};
    }

    interface HelperConstructorOptions {
        name: string;
        prefix?: string;
        modifierDelimiter?: string;
    }

    interface HelperConstructor {
        new(name: string): Helper;
        new(options: HelperConstructorOptions): Helper;
        (name: string): Helper;
        (options: HelperConstructorOptions): Helper;
    }
}

declare var BEMHelper: Bem.HelperConstructor;
export = BEMHelper;
