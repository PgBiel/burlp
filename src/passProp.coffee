funcGen = (prop, path) ->
  (args...) ->
    args.unshift path
    prop args...

module.exports = (oldReq) ->
  (path) ->
    return {} unless path?
    obj = {}
    for key in Object.keys oldReq
      prop = oldReq[key]
      if typeof prop is "function"
        obj[key] = funcGen prop, path
      else
        obj[key] = prop
    obj
