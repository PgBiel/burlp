(function() {
  var handler, passPropFunc, pathTools, pathjoin, requester, toStrings, util,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    slice = [].slice;

  util = require("util");

  pathjoin = require("./pathjoin");

  passPropFunc = require("./passProp");

  toStrings = ["toString", "valueOf", "inspect", "constructor", Symbol.toPrimitive, util.inspect.custom];

  handler = function(pathObj) {
    return {
      get: function(t, k, r) {
        var path;
        path = pathObj.path;
        if (indexOf.call(toStrings, k) >= 0) {
          return function() {
            return path;
          };
        }
        path += pathjoin(path, k);
        pathObj.path = path;
        return r;
      }
    };
  };

  requester = function(path) {
    return {};
  };

  pathTools = module.exports = {
    pathGen: function(prefix, initial, req, passProp) {
      var func, initText, pathObj;
      initText = prefix + "://" + (initial != null ? initial : void 0);
      pathObj = {
        path: initText
      };
      func = function() {
        var add, added, i, len, str, text;
        text = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        if (this.path == null) {
          this.path = initText;
        }
        if (text.length === 1) {
          add = text[0];
          this.path += pathjoin(this.path, add);
        } else if (text.length >= 2) {
          added = 0;
          for (i = 0, len = text.length; i < len; i++) {
            str = text[i];
            if (added === 0) {
              added = 1;
            } else {
              this.path += "/";
            }
            this.path += pathjoin(this.path, str);
          }
        } else {
          if (req != null) {
            if (passProp) {
              return passPropFunc(req)(this.path);
            } else {
              return req(this.path);
            }
          } else {
            return requester(this.path);
          }
        }
        return this.proxy;
      };
      func = func.bind(pathObj);
      return (pathObj.proxy = new Proxy(func, handler(pathObj)));
    },
    setReq: function(req) {
      return requester = req;
    }
  };

}).call(this);
