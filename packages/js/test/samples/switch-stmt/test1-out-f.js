function a() {
  var pat;
  return M.chainBH(eff(), _1, _6);

  function _1(a) {
    pat = a;
    return M.chainBH(effC(1), _2, _6);
  }

  function _2(a) {
    if (pat === a) {
      return M.chainBH(effR(1), _5, _6);
    } else {
      return M.chainBH(effC(2), _3, _6);
    }
  }

  function _3(a) {
    if (pat === a) {
      return M.chainBH(effR(2), _4, _6);
    } else {
      return M.jumpH(_4, _6);
    }
  }

  function _4() {
    return M.chainBH(effR('default'), _5, _6);
  }

  function _5() {
    return M.pure();
  }

  function _6(e) {
    return M.raise(e);
  }
}

function c() {
  var pat;
  return M.chainBH(eff(1), _1, _7);

  function _1(a) {
    pat = a;
    return M.chainBH(eff(2), _2, _7);
  }

  function _2(a) {
    if (pat === a) {
      return M.chainBH(eff(3), _3, _7);
    } else {
      return M.jumpH(_3, _7);
    }
  }

  function _3() {
    return M.chainBH(eff(4), _4, _7);
  }

  function _4(a) {
    if (pat === a) {
      return M.chainBH(eff(5), _6, _7);
    } else {
      if (pat === 6) {
        return M.chainBH(eff(7), _5, _7);
      } else {
        return M.jumpH(_5, _7);
      }
    }
  }

  function _5() {
    if (pat === 8) {
      console.log(9);
    }

    return M.chainBH(eff(10), _6, _7);
  }

  function _6() {
    return M.pure();
  }

  function _7(e) {
    return M.raise(e);
  }
}