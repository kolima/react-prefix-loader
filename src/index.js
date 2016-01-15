'use strict';

var loaderUtils = require('loader-utils');

var classNameRegex = /className: \'([a-zA-Z\-\s]*)\'/g;
var needPrefixRegex = /^[a-z]/;

function prefix(className, name) {
  if (needPrefixRegex.test(className)) return name + '-' + className;

  return className;
}

function loader(source, inputSourceMap) {
  var params = loaderUtils.parseQuery(this.query);

  source = source.replace(classNameRegex, function (text, classNames) {
    var prefixedClassNames = classNames.split(' ').map(function (className) {
      return prefix(className, params.prefix);
    }).join(' ');

    return 'className: \'' + prefixedClassNames + '\'';
  });

  this.callback(null, source, inputSourceMap);
}

module.exports = loader;
