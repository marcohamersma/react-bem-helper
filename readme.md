# React BEM helper
[![npm version](https://badge.fury.io/js/react-bem-helper.svg)](http://badge.fury.io/js/react-bem-helper) [![Build Status](https://travis-ci.org/marcohamersma/react-bem-helper.svg?branch=master)](https://travis-ci.org/marcohamersma/react-bem-helper)

A helper making it easier to name React.js components according to [BEM conventions](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/). It removes the repetition from writing the component name multiple times for elements and elements with modifier classes on them.

## Why?
I found myself writing code like this a lot in my React components:
```jsx
<div className="c-componentName">
  <div className="c-componentName__inner">
    Some test
    <button className="c-componentName__button c-componentName__button--left">Button</button>
    <button className="c-componentName__button c-componentName__button--right">Button</button>
  </div>
</div>
```

Compare that to SCSS, where you might write components something like this:

```scss
.c-componentName {
  background: red;

  &__button {
    text-transform: uppercase;

    &--left { float: left; }
    &--right { float: right; }
  }
}
```

`react-bem-helper` allows you to write in a similar-ish DRY fashion, taking away some of the repetition and hopefully making it easier to scan.

## How does it work?
A new helper instance is created with a an options object or a string representing the name of the component (`componentName`) in this example. The instantiated helper receives up to three arguments (element, modifiers, extra classes). When called, it generates a simple object with props that should be applied to the React element: ` { classNames: 'componentName' }`. You can use the spread operator (`{...object}`) to apply this object to the React element.

You can supply an [options object](#preparing-the-helper) to change helper's behaviour. For example, you can set the `outputIsString` option to `true`, and receive a plain string for the classname. A className prefix (like `c-`) option can be added as well.

## Example
Here's how you would return [the example HTML structure](#why) when using the helper.

```jsx
var React     = require('react');
var BEMHelper = require('react-bem-helper');

var classes = new BEMHelper({
  name: 'componentName',
  prefix: 'c-'
});

module.exports = React.createClass({
  render: function() {

    return (
      <div {...classes()}>
        <div {...classes('inner')}>
          Some test
          <button {...classes('button', 'left')}>Button</button>
          <button {...classes('button', 'right')}>Button</button>
        </div>
      </div>
    );
  }
});
```

## Usage
### Installation
`npm install react-bem-helper`

### Preparing the helper
Require the helper for your React component, and then instantiate a new instance of it, supplying an options object or a string representing the (block) name of the component.

```jsx
var BEMhelper = require('react-bem-helper');

// Make 'componentName' the base name
var bemHelper = new BEMHelper('componentName')

// Or pass an options object with a prefix to be applied to all components and output set to return
// a string instead of an object
var bemHelper2 = new BEMHelper({
  name: 'componentName', // required
  prefix: 'mh-',
  modifierDelimiter: false,
  outputIsString: false
});
```
Options can be shared throughout a project by using [withDefaults()](#withdefaults).

#### Constructor options
| Name                     | Type      | Default  | Description                                    |
|--------------------------|-----------|----------|------------------------------------------------|
| `name`                   | `string`  | Required | The name of the BEM block.                     |
| `prefix`                 | `string`  | `''`     | A prefix for the block name.                   |
| [`modifierDelimiter`][1] | `string`  | `'--'`   | The separator between element name and modifier name.|
| [`outputIsString`][2]    | `boolean` | `false`  | Whether to return an object or a plain string from the helper.|

[1]: #modifier-delimiter--default-bem-naming-scheme
[2]: #output-as-string

### Using the helper
When executed, the helper returns an object with a `className` property. When the helper is called without any arguments, its value will consist of the block name (prefixed if applicable)
```jsx
var React     = require('react'),
    BEMHelper = require('react-bem-helper');

var classes = new BEMHelper('componentName');

module.exports = React.createClass({
  render: function() {
    return (
      <div {...classes('element', 'modifier', 'extra')} />
    );
    // Returns <div className='componentName__element componentName__element--modifier extra'/>
  }
});
```

#### Parameters
| Name             | Type                                    | Default  | Description              |
|------------------|-----------------------------------------|----------|--------------------------|
| [`element`][3]   | `string`                                | `''`     | The name of the BEM element.|
| [`modifiers`][4] | `string` or `string[]` or `object` (\*) | `''`     | A set of BEM modifiers.  |
| [`extra`][5]     | `string` or `string[]` or `object` (\*) | `''`     | A set of plain, non-BEM classes. |

[3]: #element
[4]: #modifiers
[5]: #extra-classes

**(\*)** _These parameters can be either strings, array of strings, or an object whose keys will be applied if their values are evaluated as truthy (booleans or functions returning booleans). If any of the strings contain spaces, these will be split up._

#### Alternate Syntax
The bemHelper supports up to three arguments: `element`, `modifiers`, and `extra` classes, although _an object containing any of these parameters is also supported:_

```jsx
function element() {
  var options = {
    element:   'element',
    modifiers: 'modifier',
    extra:     'extra'
  };

  return (
    <div {...classes(options)} />
  );
  // Returns <div className='componentName__element componentName__element--modifier extra'/>
};
```

#### Element
To generate a class like `componentName__header`, pass `"header"` as the first argument to the bemHelper.

```jsx
var BEMHelper = require('react-bem-helper');
var bemHelper = new BEMHelper('componentName');

bemHelper('header'); // returns { className: 'componentName__header' }
```

You can also pass a configuration object instead of the first parameter:

```jsx
bemHelper({ element: 'header' }); // returns { className: 'componentName__header' }
```

#### Modifiers
Modifiers can be added as a `String`, `Array`, or `Object`. For every modifier an additional class is generated, based upon either the block name or element name:

```jsx
var BEMHelper = require('react-bem-helper');
var bemHelper = new BEMHelper('componentName');

bemHelper(null, 'active');
// or
bemHelper({ modifiers: 'active' });
// { className: 'componentName--active'}

bemHelper('lol', 'active funny');
// { className: 'componentName__lol componentName__lol--active componentName__lol--funny'}

bemHelper('lol', 'active');
// { className: 'componentName__lol componentName__lol--active'}

bemHelper('lol', ['active', 'funny']);
// { className: 'componentName__lol componentName__lol--active componentName__lol--funny'}

bemHelper('lol', {
  'active': true,
  'funny': false,
  'playing': function() { return false; }
  'stopped notfunny': function() { return true; }
});
// { className: 'componentName__lol componentName__lol--active componentName__lol--stopped componentName__lol--notfunny'}
```

If you pass an object as the modifiers argument, the helper will add the keys as classes for which their corresponding values are true. If a function is passed as a value, this function is executed.

#### Extra classes
This argument allows you to do add extra classes to the element. Like the modifiers, extra classes can be added as a `String`, `Array`, or `Object`. The behaviour is the same, except that the classes are added as passed, and no prefix or block name is added.

```jsx
var BEMHelper = require('react-bem-helper');
var bemHelper = new BEMHelper('componentName');

bemHelper('', '', ['one', 'two']);
// or
bemHelper({ extra: ['one', 'two'] });
// { className: 'componentName one two'}

bemHelper('', '', {
  active: true,
  funny: false,
  playing: function() { return false;}
});
// { className: 'componentName active'}
```

As when using arguments, this syntax also supports arrays and objects as different ways of defining extra classes.

### Output as string
By default, the helper outputs an object (e.g. `{ className: 'yourBlock' }`). By supplying a constructor option or by [setting custom defaults](#withdefaults), you can have the helper return plain strings. It is a stylistic choice, but it can come in handy when you need to pass a class name in under a different property name, such as with [react-router's Link](https://github.com/ReactTraining/react-router/blob/v3/docs/API.md#activeclassname) component.

```jsx
var React     = require('react'),
    Link      = require('react-router/lib/Link'),
    BEMHelper = require('react-bem-helper');

var classes = new BEMHelper({ name: 'componentName', outputIsString: true });

module.exports = React.createClass({
  render: function() {
    return (
      <Link className={classes('link')} activeClassName={classes('link', 'active')} />
    );
    // Returns <Link className='componentName__link' activeClassName='componentName__link componentName__link--active' />
  }
});
```

### Modifier Delimiter / Default BEM naming scheme
For this project, I've chosen to use the `.block__element--modifier` naming scheme, because this seems to be the most common implementation. However, the official website on BEM [considers this to be an alternative naming scheme](https://en.bem.info/methodology/naming-convention/#modifier-name).

If you like to use the official naming scheme, you can set the `modifierDelimiter` option to `_` when creating the bemHelper, or [set it as the default](#withdefaults):

```jsx
var classes = new BEMHelper({
  name: 'componentName',
  modifierDelimiter: '_'
});

// ...

module.exports = React.createClass({
  render: function() {
    return (
      <div {...classes('element', 'modifier')} />
    );
    // Returns <div className='componentName__element_modifier '/>
  }
});
```

### withDefaults
Often, you will need to set defaults for your whole project, or maybe just one part of it.  That's where `BEMHelper.withDefaults()` comes in.  It creates a new constructor with one or more base defaults overridden.  For example:

```js
// custom-bem-helper.js

var withDefaults = require('react-bem-helper').withDefaults;

module.exports = withDefaults({
  // You don't need to override all defaults. If you want to (for example) keep the original '--'
  // modifier delimiter, just omit that field here.
  prefix: 'pfx-',
  modifierDelimiter: '_',
  outputIsString: true
});
```

Now, we just require our custom helper instead of `'react-bem-helper'`.

```jsx
// MyComponent.jsx
var React     = require('react'),
    BEMHelper = require('./custom-bem-helper');

var classes = new BEMHelper('MyComponent');

module.exports = React.createClass({
  render: function() {
    return (
      <div className={classes('element', 'modifier')} />
    );
    // Returns <div className='pfx-MyComponent__element pfx-MyComponent__element_modifier'/>
  }
});
```

## Related projects
* [bem-classnames](https://github.com/pocotan001/bem-classnames)
* [react-bem](https://github.com/cuzzo/react-bem)
* [bem-cn](https://github.com/albburtsev/bem-cn)
* [b_](https://github.com/azproduction/b_)

## License
MIT License
