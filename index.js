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

function objectToArray(object) {
  var keys   = Object.keys(object),
      output = [];

  keys.forEach(function(key) {
    var predicate = object[key];

    if (isFunction(predicate)) {
      predicate = predicate();
    }

    if (predicate) {
      output.push(key);
    }
  });

  return output;
}

function listToArray(list) {
  if (isString(list) && list !== '') {
    return list.split(' ');
  } else if (list && list.length) {
    return list;
  } else if (isObject(list)) {
    return objectToArray(list);
  } else {
    return [];
  }
}

module.exports = function(options) {
  if (isString(options)) {
    options = { name: options };
  }

  return function(element, modifiers, extraClassNames) {
    var blockName    = options.name,
        rootName     = blockName,
        classNames   = [];

    if (element) {
      rootName += '__' + element;
    }

    classNames.push(rootName);

    // Compose an array of modifiers
    listToArray(modifiers).forEach(function(modifier) {
      classNames.push(rootName + '--' + modifier);
    });

    // Add a prefix to all the classes in the classNames array
    if (options.prefix) {
      for (var i = 0; i < classNames.length; i++) {
        classNames[i] = options.prefix + classNames[i];
      }
    }
    // Compose an array of extraClassNames
    listToArray(extraClassNames).forEach(function(extraClassName) {
      classNames.push(extraClassName);
    });

    return {
      className: classNames.join(' ').trim()
    };
  };
};
