function a() {
  return M.chainBH(eff1(), _1, _9);

  function _1() {
    return M.chainBH(eff2(), _2, _9);
  }

  function _2(a) {
    var i;
    i = a;
    return M.jumpH(_3, _9, i);
  }

  function _3(i) {
    return M.chainBH(eff(3), _4, _9, i);
  }

  function _4(a, i) {
    if (i !== a) {
      return M.chainBH(eff5(i), _5, _9, i);
    } else {
      return M.chainBH(eff7(i), _8, _9);
    }
  }

  function _5(i) {
    return M.chainBH(eff6(i), _6, _9, i);
  }

  function _6(i) {
    return M.chainBH(eff4(i), _7, _9);
  }

  function _7(a) {
    var i;
    i = a;
    return M.jumpRH(_3, _9, i);
  }

  function _8() {
    return M.pure();
  }

  function _9(e) {
    return M.raise(e);
  }
}