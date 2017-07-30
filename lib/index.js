(function() {
  var handler, passPropFunc, pathTools, requester, setReq, toStrings, util,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    slice = [].slice;

  pathTools = require("./path");

  passPropFunc = require("./passProp");

  util = require("util");

  toStrings = ["toString", "valueOf", "inspect", "constructor", Symbol.toPrimitive, util.inspect.custom];

  requester = function(path) {
    return {};
  };

  setReq = function(req, passProp) {
    var oldReq;
    if (passProp == null) {
      passProp = false;
    }
    if (passProp || typeof req === "object") {
      if (req == null) {
        throw new TypeError("Requester should not be null or undefined.");
      }
      oldReq = req;
      req = passPropFunc(oldReq);
    } else if (typeof req !== "function") {
      throw new TypeError("Requester should be a function that accepts the generated URL as its argument.");
    }
    requester = req;
    pathTools.setReq(req);
    return true;
  };

  handler = {
    get: function(t, k) {
      var data, func;
      if (k === "setRequester" || k === "setReq") {
        return setReq;
      } else if (k === "requester") {
        return requester;
      } else if (indexOf.call(toStrings, k) >= 0) {
        return function() {
          return "[object Object]";
        };
      } else {
        data = {};
        func = function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (!(args.length >= 1)) {
            return this.proxy;
          }
          if (args.some(function(el) {
            return typeof el !== "string";
          })) {
            this.req = args[0];
            this.passProp = Boolean(args[1]);
            return this.proxy;
          } else {
            return pathTools.pathGen(k, req, this.req, this.passProp);
          }
        };
        func = func.bind(data);
        return data.proxy = new Proxy(func, {
          get: function(t, initial) {
            if (indexOf.call(toStrings, initial) >= 0) {
              return function() {
                return k + "://";
              };
            }
            return pathTools.pathGen(k, initial, data.req, data.passProp);
          }
        });
      }
    }
  };

  module.exports = new Proxy({}, handler);

}).call(this);
