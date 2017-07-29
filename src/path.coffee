util = require "util"
pathjoin = require "./pathjoin"
passPropFunc = require "./passProp"
toStrings = ["toString", "valueOf", "inspect", "constructor",
  Symbol.toPrimitive, util.inspect.custom]
handler = (pathObj) ->
  get: (t, k, r) ->
    { path } = pathObj
    if k in toStrings
      return -> path
    path += pathjoin path, k
    pathObj.path = path;
    r

requester = (path) -> {}

pathTools = module.exports =
  pathGen: (prefix, initial, req, passProp) ->
    initText = "#{prefix}://#{if initial? then initial}"
    pathObj = { path: initText }
    func = (text...) ->
      @path ?= initText
      if text.length is 1
        add = text[0]
        @path += pathjoin @path, add
      else if text.length >= 2
        added = 0
        for str in text
          if added is 0
            added = 1
          else
            @path += "/"
          @path += pathjoin @path, str
      else
        return if req?
          if passProp then passPropFunc(req) @path else req @path
        else
          requester @path
      @proxy
    func = func.bind(pathObj)
    return (pathObj.proxy = new Proxy func, handler pathObj)

  setReq: (req) -> requester = req
