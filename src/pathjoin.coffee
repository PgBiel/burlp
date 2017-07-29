pathjoin = module.exports = (path, str) ->
  if str is "/" or path.endsWith "/"
    str
  else
    if /^.+:\/\/.+\//.test path
      "/#{str}"
    else if /^.+:\/\/[^\n\\]+$/.test path
      ".#{str}"
    else
      str # ??????
