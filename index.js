var assign = require('object-assign');

function pushArray(array, newElements) {
  Array.prototype.push.apply(array, newElements);
}

function isObject(obj) {
  var type = typeof obj;
  return type === 'function' || (type === 'object' && !!obj);
}

function isString(string) {
  return typeof string === 'string';
}

function isFunction(func) {
  return typeof func === 'function';
}

function stringToArray(string) {
  return string.split(/\s+/g).filter(function(c) {return c.length !== 0});
}

function objectToArray(object) {
  var keys   = Object.keys(object);
  var output = [];

  keys.forEach(function(key) {
    var predicate = object[key];

    if (isFunction(predicate)) {
      predicate = predicate();
    }

    if (predicate) {
      pushArray(output, stringToArray(key));
    }
  });

  return output;
}

function listToArray(list) {
  if (isString(list) && list !== '') {
    return stringToArray(list);
  } else if (list && list.length) {
    return list
      .filter(function (string) {
        return !!string;
      })
      .reduce(function (array, string) {
        return array.concat(stringToArray(string));
      }, []);
  } else if (isObject(list)) {
    return objectToArray(list);
  } else {
    return [];
  }
}

function withDefaults(defaults) {
  return function(options) {
    if (isString(options)) {
      options = { name: options };
    }

    var rootDefaults = {
      prefix: '',
      modifierDelimiter: '--',
      outputIsString: false,
    };

    // Copy options on top of defaults
    options = assign(rootDefaults, defaults, options);

    var blockName         = options.prefix + options.name;
    var modifierDelimiter = options.modifierDelimiter;
    var outputIsString    = options.outputIsString;

    return function(first, modifiers, extraClassNames) {
      var element;

      // This means the first parameter is not the element, but a configuration variable
      if (isObject(first)) {
        element = first.element;
        modifiers = first.modifiers || first.modifier;
        extraClassNames = first.extra;
      } else {
        element = first;
      }

      var rootName;
      if (element) {
        rootName = blockName + '__' + element;
      } else {
        rootName = blockName;
      }

      // Always include the root name first
      var classNames = [rootName];

      // Push on modifiers list and extraClassNames list
      pushArray(classNames, listToArray(modifiers).map(function(modifier) {
        return rootName + modifierDelimiter + modifier;
      }));
      pushArray(classNames, listToArray(extraClassNames));

      var classNameString = classNames.join(' ').trim();

      if (outputIsString) {
        return classNameString;
      } else {
        return { className: classNameString };
      }
    };
  };
}

var BEMHelper = withDefaults({});

BEMHelper.withDefaults = withDefaults;
module.exports = BEMHelper;
