function a() {
  var i;
  i = 0;
  i++;
  return M.chainBH(eff1(i), _1, _3);

  function _1() {
    if (t) {
      return M.chainBH(eff2(i), _2, _3);
    } else {
      return M.chainBH(eff3(i), _2, _3);
    }
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}