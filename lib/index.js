(function() {
  var handler, passPropFunc, pathTools, snekfetch, toStrings, util,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    slice = [].slice;

  pathTools = require("./path");

  passPropFunc = require("./passProp");

  util = require("util");

  snekfetch = null;

  try {
    snekfetch = require("snekfetch");
  } catch (error) {}

  toStrings = ["toString", "valueOf", "inspect", "constructor", Symbol.toPrimitive, util.inspect.custom];


  /*
  Old requester code
  
  requester = (path) -> {}
  
  setReq = (req, passProp = no) ->
    if passProp or typeof req is "object"
      throw new TypeError "Requester should not be null or undefined." unless req?
      oldReq = req
      req = passPropFunc oldReq
    else if typeof req isnt "function"
        throw new TypeError "Requester should be a function that accepts the generated URL as its argument."
    requester = req
    pathTools.setReq req
    yes
   */

  handler = {
    get: function(t, k) {
      var data, func;
      if (k === "requester") {
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
