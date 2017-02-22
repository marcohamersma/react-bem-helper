/**
 * @file react-bem-helper/index.d.ts
 *
 * Created by Zander Otavka on 2/11/17.
 */

interface BEMHelper {
    (element?: string, modifiers?: BEMHelper.List, extra?: BEMHelper.List): {className: string};
    (args: BEMHelper.Arguments): {className: string};
}

declare namespace BEMHelper {
    interface PredicateList {
        [key: string]: boolean | (() => boolean);
    }

    type List = string | string[] | PredicateList;

    interface Arguments {
        element?: string;
        modifier?: List;
        modifiers?: List;
        extra?: List;
    }

    interface ConstructorOptions {
        name: string;
        prefix?: string;
        modifierDelimiter?: string;
    }

    interface Constructor {
        new(name: string): BEMHelper;
        new(options: ConstructorOptions): BEMHelper;
        (name: string): BEMHelper;
        (options: ConstructorOptions): BEMHelper;
    }
}


declare var BEMHelper: BEMHelper.Constructor;
export = BEMHelper;
