function a() {
  var i;
  return M.chainBH(read1(), _1, _4);

  function _1(a) {
    i = a;
    return M.chainBH(eff(i), _2, _4);
  }

  function _2() {
    return M.chainBH(write(i), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}