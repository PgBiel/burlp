(function() {
  var pathjoin;

  pathjoin = module.exports = function(path, str) {
    if (str.startsWith("/") || path.endsWith("/")) {
      return str;
    } else {
      if (/^.+:\/\/.+\//.test(path)) {
        return "/" + str;
      } else if (/^.+:\/\/[^\n\\]+$/.test(path)) {
        return "." + str;
      } else {
        return str;
      }
    }
  };

}).call(this);
