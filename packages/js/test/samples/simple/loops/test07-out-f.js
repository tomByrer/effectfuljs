function a() {
  var i, j, k;
  i = 0;
  j = 0;
  k = 0;
  return M.chainBH(eff(i, j, k), _1, _4);

  function _1() {
    return M.chainBH(eff1(i), _2, _4);
  }

  function _2() {
    k = 10;
    return M.chainBH(eff2(), _3, _4);
  }

  function _3() {
    return M.chainBH(eff4(k, j), _3, _4);
  }

  function _4(e) {
    return M.raise(e);
  }
}