var assign = require('object-assign');

function pushArray(array, newElements) {
  Array.prototype.push.apply(array, newElements);
}

function isObject(obj) {
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
}

function isString(string) {
  return typeof string === 'string';
}

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
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
    return list;
  } else if (isObject(list)) {
    return objectToArray(list);
  } else {
    return [];
  }
}

// Either block or block__element
function getRootName(blockName, element) {
  if (element) {
    return blockName + '__' + element;
  } else {
    return blockName;
  }
}

// Compose an array of modifiers
function getModifierArray(blockName, element, modifiers, modifierDelimiter) {
  var rootName = getRootName(blockName, element);

  return listToArray(modifiers).map(function(modifier) {
    return rootName + modifierDelimiter + modifier;
  });
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

    function getFullClasses(first, modifiers, extraClassNames) {
      var element;

      // This means the first parameter is not the element, but a configuration variable
      if (isObject(first)) {
        element = first.element;
        modifiers = first.modifiers || first.modifier;
        extraClassNames = first.extra;
      } else {
        element = first;
      }

      // Always include the root name first
      var classNames = [getRootName(blockName, element)];

      // Push on modifiers list and extraClassNames list
      pushArray(classNames, getModifierArray(blockName, element, modifiers, modifierDelimiter));
      pushArray(classNames, listToArray(extraClassNames));

      var classNameString = classNames.join(' ').trim();

      if (outputIsString) {
        return classNameString;
      } else {
        return { className: classNameString };
      }
    }

    function getElementClassName(first) {
      var element;

      // This means the first parameter is not the element, but a configuration variable
      if (isObject(first)) {
        element = first.element;
      } else {
        element = first;
      }

      return getRootName(blockName, element);
    }

    function getModifiersClassName(first, modifiers) {
      var element;

      // This means the first parameter is not the element, but a configuration variable
      if (isObject(first)) {
        element = first.element;
        modifiers = first.modifiers || first.modifier;
      } else {
        element = first;
      }

      return getModifierArray(blockName, element, modifiers, modifierDelimiter).join(' ').trim();
    }

    getFullClasses.element = getElementClassName;
    getFullClasses.modifiers = getModifiersClassName;
    return getFullClasses;
  };
}

var BEMHelper = withDefaults({});

BEMHelper.withDefaults = withDefaults;
module.exports = BEMHelper;
