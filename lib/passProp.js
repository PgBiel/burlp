(function() {
  var funcGen,
    slice = [].slice;

  funcGen = function(prop, path) {
    return function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      args.unshift(path);
      return prop.apply(null, args);
    };
  };

  module.exports = function(oldReq) {
    return function(path) {
      var i, key, len, obj, prop, ref;
      if (path == null) {
        return {};
      }
      obj = {};
      ref = Object.keys(oldReq);
      for (i = 0, len = ref.length; i < len; i++) {
        key = ref[i];
        prop = oldReq[key];
        if (typeof prop === "function") {
          obj[key] = funcGen(prop, path);
        } else {
          obj[key] = prop;
        }
      }
      return obj;
    };
  };

}).call(this);
