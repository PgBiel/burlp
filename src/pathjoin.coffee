pathjoin = module.exports = (path, str) ->
  if str.startsWith "/" or path.endsWith "/"
    str
  else
    if /^.+:\/\/.+\//.test path
      "/#{str}"
    else if /^.+:\/\/[^\n\\]+$/.test path
      ".#{str}"
    else
      str # ??????
