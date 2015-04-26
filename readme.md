# React BEM helper
… is an NPM module making it easier to name React.js components according to [BEM conventions](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/). It removes the repetition from writing the component name multiple times for elements and elements with modifier classes on them.

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
A new helper is initialized with a an options object or a string representing the name of the component (`componentName`) in this example. The instantiated helper receives up to three arguments (element, modifiers, extra classes). When called, it generates a simple object with props that should be applied to the DOM element. 

You can use the spread operator (`{...object}`) to apply the classes to the DOM element. Even though this is an ES6 feature, React compiles this to it's own ES5 compatible version.

## Example
Here's how you would return the example's HTML structure when using the helper.

```js
var React     = require('react'),
    BEMHelper = require('react-bem-helper'),
    bemHelper = new BEMHelper('componentName');

module.exports = React.createClass({
  render: function() {
    return (
      <div {...bemHelper()}>
        <div {...bemHelper('inner')}>
          Some test
          <button {...bemHelper('button', 'left')}>Button</button>
          <button {...bemHelper('button', 'right')}>Button</button>
        </div>
      </div>
    );
  }
});
```

## Usage
### Installation
`npm install react-bem-helper`;

### Preparing the helper
Require the helper for your React component, and then instantiate a new instance of it, supplying an options object or a string representing the (block) name of the component.

**by default, a prefix `c-` is added to the block class**, this can be changed by setting passing a `prefix` option.
```javascript
// Passing an options object while clearing the prefix
bemHelper = new BEMHelper({
  name: 'componentName',
  prefix: null
});

// Passing an options object with a custom prefix
bemHelper2 = new BEMHelper({
  name: 'componentName',
  prefix: 'mh-'
});
```

### Using the helper
Calling the bemHelper with no arguments causes it to return an object with a className property consisting of the block name and a prefix:
```js
var BEMHelper = require('react-bem-helper'),
    bemHelper = new BEMHelper('componentName');

bemHelper(); // returns { className: 'c-componentName' }
```

The bemHelper supports up to three arguments: Element, Modifiers, and extra classes:

#### Element
To generate a class like `c-componentName__header`, pass `"header"` as the first argument to the bemHelper:

```js
  bemHelper('header'); // returns { className: 'c-componentName__header' }
```

The element argument only supports strings.

#### Modifiers
Modifiers can be added as a `String`, `Array`, or `Object`. For every modifier an additional class is generated, based upon either the block name or element name:

```js
  bemHelper(null, 'active');
  // { className: 'c-componentName--active'}

  bemHelper('lol', 'active');
  // { className: 'c-componentName__lol--active'}
  
  bemHelper('lol', ['active', ['funny']);
  // { className: 'c-componentName__lol c-componentName__lol--active c-componentName__lol--funny'}

  bemHelper('lol', {
    active: true,
    funny: false,
    playing: function() { return false;}
  });
  // { className: 'c-componentName__lol--active'}
```
If you pass an object as the modifiers argument, the helper will add the keys as classes for which their corresponding values are true. If a function is passed as a value, this function is executed.

#### Extra classes
This argument allows you to do add extra classes to the element. Like the modifiers, extra classes can be added as a `String`, `Array`, or `Object`. The behaviour is the same, except that the classes are added as passed, and no prefix or block name is added.

## License
MIT License


