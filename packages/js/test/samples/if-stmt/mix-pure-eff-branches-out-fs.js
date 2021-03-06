// *- when there is a mix of pure and effectful branches
function a() {
  if (true) {
    return M.chainBH(eff(1), _1, _2);
  } else {
    return M.pure(3);
  }

  function _1(r) {
    return M.pure(r);
  }

  function _2(e) {
    return M.raise(e);
  }
}

function b() {
  if (true) {
    return M.chainBH(eff(1), _1, _4);
  } else {
    console.log(3);
    return M.jumpH(_1, _4);
  }

  function _1() {
    return M.chainBH(eff(3), _2, _4);
  }

  function _2() {
    return M.chainBH(eff(4), _3, _4);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}

function c() {
  if (true) {
    return M.chainBH(eff(1), _1, _4);
  } else {
    console.log(3);
    return M.pure(3);
  }

  function _1() {
    return M.chainBH(eff(3), _2, _4);
  }

  function _2() {
    return M.chainBH(eff(4), _3, _4);
  }

  function _3() {
    var r;
    return M.pure(r);
  }

  function _4(e) {
    return M.raise(e);
  }
}

function d() {
  return M.chainBH(eff('a'), _1, _5);

  function _1() {
    if (true) {
      return M.chainBH(eff(1), _2, _5);
    } else {
      console.log(3);
      return M.jumpH(_2, _5);
    }
  }

  function _2() {
    return M.chainBH(eff(3), _3, _5);
  }

  function _3() {
    return M.chainBH(eff(4), _4, _5);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}

function e() {
  return M.chainBH(eff('1'), _1, _3);

  function _1(a) {
    if (a) {
      return M.pure();
    } else {
      return M.chainBH(eff('2'), _2, _3);
    }
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}

function f() {
  return M.chainBH(eff('1'), _1, _4);

  function _1(a) {
    if (a) {
      return M.chainBH(eff('i'), _3, _4);
    } else {
      return M.chainBH(eff('2'), _2, _4);
    }
  }

  function _2() {
    var r;
    return M.pure(r);
  }

  function _3(r) {
    return M.pure(r);
  }

  function _4(e) {
    return M.raise(e);
  }
}

function g() {
  return M.chainBH(eff('1'), _1, _2);

  function _1(a) {
    if (a) {
      return M.pure();
    } else {
      console.log('2');
      return M.pure();
    }
  }

  function _2(e) {
    return M.raise(e);
  }
}

function h() {
  return M.chainBH(eff('1'), _1, _3);

  function _1(a) {
    if (a) {
      return M.pure();
    } else {
      console.log('2');
      return M.chainBH(eff('2'), _2, _3);
    }
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}

function i() {
  return M.chainBH(eff('1'), _1, _3);

  function _1(a) {
    if (a) {
      return M.pure();
    } else {
      console.log('2');
      return M.chainBH(eff(2), _2, _3);
    }
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}

function j() {
  return M.chainBH(eff('1'), _1, _3);

  function _1(a) {
    if (a) {
      return M.pure();
    } else {
      console.log('2');
      return M.chainBH(eff(2), _2, _3);
    }
  }

  function _2() {
    console.log('3');
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}