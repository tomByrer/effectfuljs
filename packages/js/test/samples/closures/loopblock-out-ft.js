function a(p) {
  var a = M.context();
  a._p = p;
  return M.scopeH(a_1, a_8);
}

function a_1(a) {
  return M.chainBH(eff(1), a_2, a_8);
}

function a_2(a) {
  var b;
  a._a = 0;
  b = a._a;
  return M.chainBH(eff(2, b), a_3, a_8);
}

function a_3(a, c) {
  var b;
  b = M.iterator(c);
  a._loop = b;
  return M.jumpH(a_4, a_8);
}

function a_4(a) {
  var b, c;

  if (!(a._loop = a._loop.step()).done) {
    a._i = a._loop.value;
    return M.jumpRH(a_5, a_9);
  } else {
    b = a._a;
    c = a._p;
    return M.chainBH(eff(8, b, c), a_7, a_8);
  }
}

function f_1(ctx) {
  var a, b;
  a = ctx._a._a;
  b = ctx._a._a;
  return M.chainBH(eff(3, a, b), f_2, f_5);
}

function b_1(_b) {
  var a, b, c, d;
  a = _b._a._a;
  b = _b._f._j;
  c = _b._k++;
  d = _b._a._p;
  return M.chainBH(eff(4, a, b, c, d), b_2, b_5);
}

function b_2(_b) {
  var a, b, c;
  _b._k1 = 10;
  _b._f._j++;
  _b._a._a++;
  _b._f._i++;
  _b._k1++, _b._a._p++;
  a = _b._a._a;
  b = _b._f._i;
  c = _b._a._p;
  return M.chainBH(eff(5, a, b, _b._k1, c), b_3, b_5);
}

function b_3(_b) {
  var a, b, c;
  a = _b._a._a;
  b = _b._f._i;
  c = _b._a._p;
  return M.chainBH(eff(6, a, b, _b._k, c), b_4, b_5);
}

function b_4(_b) {
  return M.pure();
}

function b_5(_b, e) {
  return M.raise(e);
}

function f_2(ctx) {
  ctx._j = ctx._i + 1;
  ctx._k = ctx._i + 1;
  ctx._i++;
  return M.chainBH(eff(function b(k) {
    var _b = M.context();

    _b._a = ctx._a;
    _b._f = ctx;
    _b._k = k;
    return M.scopeH(b_1, b_5);
  }), f_3, f_5);
}

function f_3(ctx) {
  var a, b, c;
  a = ctx._a._a;
  b = ctx._i;
  c = ctx._j;
  return M.chainBH(eff(7, a, b, c), f_4, f_5);
}

function f_4(ctx) {
  return M.pure();
}

function f_5(ctx, e) {
  return M.raise(e);
}

function a_5(a) {
  return M.chainBH((i => {
    var ctx = M.context();
    ctx._a = a;
    ctx._i = i;
    return M.scopeH(f_1, f_5);
  })(a._i), a_4, a_8);
}

function a_6(a) {
  a._e = a._ex;

  if (a._loop.exit) {
    a._loop.exit();
  }

  throw a._e;
}

function a_7(a) {
  return M.pure();
}

function a_8(a, e) {
  return M.raise(e);
}

function a_9(a, b) {
  a._ex = b;
  return M.jumpH(a_6, a_8);
}