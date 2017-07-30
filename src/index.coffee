pathTools = require "./path"
passPropFunc = require "./passProp"
util = require "util"
toStrings = ["toString", "valueOf", "inspect", "constructor",
  Symbol.toPrimitive, util.inspect.custom]
###
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
###

handler =
  get: (t, k) ->
    if k is "requester"
      requester
    else if k in toStrings
      -> "[object Object]"
    else
      data = {}
      func = (args...) ->
        return @proxy unless args.length >= 1
        if args.some((el) -> typeof el isnt "string")
          @req = args[0]
          @passProp = Boolean args[1]
          @proxy
        else
          pathTools.pathGen k, req, @req, @passProp
      func = func.bind(data)
      data.proxy = new Proxy func, get: (t, initial) ->
        if initial in toStrings
          return -> "#{k}://"
        pathTools.pathGen k, initial, data.req, data.passProp

module.exports = new Proxy {}, handler
