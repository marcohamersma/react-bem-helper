/**
 * @file react-bem-helper/test.d.ts
 *
 * Created by Zander Otavka on 2/11/17.
 *
 * @license
 * Copyright (C) 2016  Zander Otavka
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import * as BEMHelper from "./index";

let helper = new BEMHelper("foo");
helper = new BEMHelper({
    name: "bar",
    prefix: "foo",
    modifierDelimiter: "_",
});
helper = BEMHelper("foo");
helper = BEMHelper({
    name: "bar",
    prefix: "foo",
    modifierDelimiter: "_",
});

helper("foo", "bar baz", ["zing", "zong"]);
helper("zip", {foo: false, elzo: () => true});
helper("elf");
helper();

helper({
    element: "foo",
    modifier: ["more", "than", "one"],
    modifiers: "classes other classes",
    extra: {
        other: true,
        class: () => false,
    },
});

helper({});
