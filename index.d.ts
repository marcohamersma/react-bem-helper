/**
 * @file react-bem-helper/index.d.ts
 *
 * Created by Zander Otavka on 2/11/17.
 */

type BEMHelper = BEMHelper.HelperFunction<BEMHelper.ReturnObject>;

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

    interface ReturnObject {
        className: string;
    }

    interface HelperFunction<T extends (string | ReturnObject)> {
        (element?: string, modifiers?: List, extra?: List): T;
        (args: Arguments): T;
    }

    type Block = HelperFunction<string>;

    interface BlockConstructor {
        (name: string): Block;
        (options: ConstructorOptions): Block;
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

        block: BlockConstructor;
    }
}

declare var BEMHelper: BEMHelper.Constructor;
export = BEMHelper;
