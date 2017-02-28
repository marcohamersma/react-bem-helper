/**
 * @file react-bem-helper/index.d.ts
 *
 * Created by Zander Otavka on 2/11/17.
 */

interface BEMHelper<TReturn extends (string | BEMHelper.ReturnObject)> extends
    BEMHelper.HelperFunction<TReturn> {}

declare namespace BEMHelper {
    interface PredicateList {
        [key: string]: boolean | (() => boolean);
    }

    type List = string | string[] | PredicateList;

    interface ModifierArguments {
        element?: string;
        modifier?: List;
        modifiers?: List;
    }

    interface HelperArguments extends ModifierArguments {
        extra?: List;
    }

    interface ReturnObject {
        className: string;
    }

    interface HelperFunction<TReturn extends (string | ReturnObject)> {
        (element?: string, modifiers?: List, extra?: List): TReturn;
        (args: HelperArguments): TReturn;

        modifiers(element?: string, modifiers?: List): TReturn;
        modifiers(args: ModifierArguments): TReturn;
    }

    interface BaseConstructorOptions {
        name: string;
        prefix?: string;
        modifierDelimiter?: string;
    }

    interface StringConstructorOptions extends BaseConstructorOptions {
        outputIsString: true;
    }

    interface ObjectConstructorOptions extends BaseConstructorOptions {
        outputIsString: false;
    }

    type ConstructorOptions = StringConstructorOptions | ObjectConstructorOptions;

    interface Constructor<TDefaultReturn extends (string | ReturnObject)> {
        new(name: string): BEMHelper<TDefaultReturn>;
        new(options: BaseConstructorOptions): BEMHelper<TDefaultReturn>;
        new(options: StringConstructorOptions): BEMHelper<string>;
        new(options: ObjectConstructorOptions): BEMHelper<ReturnObject>;
        (name: string): BEMHelper<TDefaultReturn>;
        (options: BaseConstructorOptions): BEMHelper<TDefaultReturn>;
        (options: StringConstructorOptions): BEMHelper<string>;
        (options: ObjectConstructorOptions): BEMHelper<ReturnObject>;
    }

    interface RootConstructor extends Constructor<ReturnObject> {
        withDefaults(defaults: Partial<StringConstructorOptions>): Constructor<string>;
        withDefaults(defaults: Partial<ObjectConstructorOptions>): Constructor<ReturnObject>;
    }
}

declare var BEMHelper: BEMHelper.RootConstructor;
export = BEMHelper;
