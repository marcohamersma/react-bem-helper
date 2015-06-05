# React BEM helper
[![npm version](https://badge.fury.io/js/react-bem-helper.svg)](http://badge.fury.io/js/react-bem-helper)

A helper making it easier to name React.js components according to [BEM conventions](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/). It removes the repetition from writing the component name multiple times for elements and elements with modifier classes on them.

## Why?
I found myself writing code like this a lot in my React components:
```html
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
A new helper instance is created with a an options object or a string representing the name of the component (`componentName`) in this example. The instantiated helper receives up to three arguments (element, modifiers, extra classes). When called, it generates a simple object with props that should be applied to the DOM element, for example ` { classNames: 'componentName' }`. If you want, a prefix like `c-` can be automatically added by supplying an [options object](#preparing-the-helper).

You can use the spread operator (`{...object}`) to apply the classes to the DOM element. Even though this is an ES6 feature, React compiles this to it's own ES5 compatible version.

## Example
Here's how you would return the example's HTML structure when using the helper.

```js
var React     = require('react'),
    BEMHelper = require('react-bem-helper');

module.exports = React.createClass({
  render: function() {
    var classes = new BEMHelper({
      name: 'componentName',
      prefix: 'c-'
    });

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

```javascript
var BEMhelper = require('react-bem-helper');

// Make 'componentName' the base name
var bemHelper = new BEMHelper('componentName')

// Or pass an options object with a prefix to be applied to all components
var bemHelper2 = new BEMHelper({
  name: 'componentName',
  prefix: 'mh-'
});
```

### Using the helper
When executed, the helper returns an object with a `className` property. When the helper was called without any arguments, it's value will consist of the block name and a prefix:
```js
var BEMHelper = require('react-bem-helper'),
    bemHelper = new BEMHelper('componentName');

bemHelper(); // returns { className: 'componentName' }
```

The bemHelper supports up to three arguments: element, modifiers, and extra classes:

#### Element
To generate a class like `c-componentName__header`, pass `"header"` as the first argument to the bemHelper:

```js
var BEMHelper = require('react-bem-helper'),
    bemHelper = new BEMHelper('componentName');

bemHelper('header'); // returns { className: 'componentName__header' }
```

The element argument only supports strings.

#### Modifiers
Modifiers can be added as a `String`, `Array`, or `Object`. For every modifier an additional class is generated, based upon either the block name or element name:

```js
var BEMHelper = require('react-bem-helper'),
    bemHelper = new BEMHelper('componentName');

bemHelper(null, 'active');
// { className: 'componentName--active'}

bemHelper('lol', 'active');
// { className: 'componentName__lol--active'}

bemHelper('lol', ['active', 'funny']);
// { className: 'componentName__lol componentName__lol--active componentName__lol--funny'}

bemHelper('lol', {
  active: true,
  funny: false,
  playing: function() { return false;}
});
// { className: 'componentName__lol--active'}
```
If you pass an object as the modifiers argument, the helper will add the keys as classes for which their corresponding values are true. If a function is passed as a value, this function is executed.

#### Extra classes
This argument allows you to do add extra classes to the element. Like the modifiers, extra classes can be added as a `String`, `Array`, or `Object`. The behaviour is the same, except that the classes are added as passed, and no prefix or block name is added.

```js
var BEMHelper = require('react-bem-helper'),
    bemHelper = new BEMHelper('componentName');

bemHelper('', '', ['one', 'two']);
// { className: 'c-componentName one two'}
bemHelper('', '', {
  active: true,
  funny: false,
  playing: function() { return false;}
});
// { className: 'c-componentName active'}
```

## License
MIT License


