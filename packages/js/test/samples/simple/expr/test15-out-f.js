function a() {
  var a;
  return M.chainBH(effb(2), _1, _4);

  function _1(a) {
    return M.chainBH(eff(a), _2, _4);
  }

  function _2(b) {
    a = b;
    return M.chainBH(effc(3), _3, _4);
  }

  function _3(b) {
    5 + a + b;
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}