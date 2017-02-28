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

function BEMHelper(options) {
  if (isString(options)) {
    options = { name: options };
  }

  var blockName         = (options.prefix || '') + options.name;
  var modifierDelimiter = options.modifierDelimiter || '--';
  var outputIsString    = options.outputIsString || false;

  // Either block or block__element
  function getRootName(first) {
    var element = isObject(first) ? first.element : first;
    if (element) {
      return blockName + '__' + element;
    } else {
      return blockName;
    }
  }

  // Compose an array of modifiers
  function getModifierArray(first, modifiers) {
    var rootName = getRootName(first);

    if (isObject(first)) {
      modifiers = first.modifiers || first.modifier;
    }

    return listToArray(modifiers).map(function(modifier) {
      return rootName + modifierDelimiter + modifier;
    });
  }

  function getFullClassName(first, modifiers, extraClassNames) {
    // This means the first parameter is not the element, but a configuration variable
    if (isObject(first)) {
      extraClassNames = first.extra;
    }

    // Always include the root name first
    var classNames = [getRootName(first)];

    // Push on modifiers list and extraClassNames list
    pushArray(classNames, getModifierArray(first, modifiers));
    pushArray(classNames, listToArray(extraClassNames));

    var classNameString = classNames.join(' ').trim();

    if (outputIsString) {
      return classNameString;
    } else {
      return { className: classNameString };
    }
  }

  function getModifiersClassName(first, modifiers) {
    return getModifierArray(first, modifiers).join(' ').trim();
  }

  getFullClassName.modifiers = getModifiersClassName;

  return getFullClassName;
}

module.exports = BEMHelper;
