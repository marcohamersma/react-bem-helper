import * as BEMHelper from "./index";

let BEMStringHelper: BEMHelper.Constructor<string> = BEMHelper.withDefaults({
    outputIsString: true,
});
let BEMObjectHelper: BEMHelper.Constructor<BEMHelper.ReturnObject> = BEMHelper.withDefaults({
    outputIsString: false,
});

let objectHelper: BEMHelper<BEMHelper.ReturnObject> = new BEMHelper("foo");
objectHelper = new BEMHelper({
    name: "bar",
    modifierDelimiter: "_",
});
objectHelper = BEMHelper("foo");
objectHelper = BEMHelper({
    name: "bar",
    prefix: "foo",
});
objectHelper = BEMStringHelper({
    name: "bar",
    outputIsString: false,
});

let stringHelper: BEMHelper<string> = new BEMStringHelper("foo");
stringHelper = new BEMHelper({
    name: "bar",
    outputIsString: true,
});
stringHelper = new BEMObjectHelper({
    name: "bar",
    outputIsString: true,
});

let returnObject: BEMHelper.ReturnObject = objectHelper("foo", "bar baz", ["zing", "zong"]);
returnObject = objectHelper("zip", {foo: false, elzo: () => true});
returnObject = objectHelper("elf");
returnObject = objectHelper();
returnObject = objectHelper({
    element: "foo",
    modifier: ["more", "than", "one"],
    modifiers: "classes other classes",
    extra: {
        other: true,
        class: () => false,
    },
});
returnObject = objectHelper({});

let string: string = stringHelper("foo", "bar baz", ["zing", "zong"]);

string = stringHelper("zip", {foo: false, elzo: () => true});
string = stringHelper("elf");
string = stringHelper();
string = stringHelper({
    element: "foo",
});
string = stringHelper({});
