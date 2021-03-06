(function () {
  return M.jumpH(_1, _5);

  function _1() {
    return M.chainBH(eff(2), _2, _5);
  }

  function _2(a) {
    if (a) {
      return M.jumpRH(_1, _5);
    } else {
      return M.chainBH(eff(3), _3, _5);
    }
  }

  function _3() {
    return M.chainBH(eff(1), _4, _5);
  }

  function _4(a) {
    if (!a) {
      return M.pure();
    } else {
      return M.jumpRH(_1, _5);
    }
  }

  function _5(e) {
    return M.raise(e);
  }
});