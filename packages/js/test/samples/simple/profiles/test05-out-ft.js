function a() {
  var a = M.context();

  a._a = function a() {
    var _a = M.context();

    return M.scopeH(a_1, a_4);
  };

  a._b = function b() {
    var _b = M.context();

    return M.scopeH(b_1, b_4);
  };

  return M.scopeH(_a_1, a_6);
}

function a_1(_a) {
  console.log('hi');
  return M.chainBH(e1(), a_2, a_4);
}

function a_2(_a) {
  return M.chainBH(e2(), a_3, a_4);
}

function a_3(_a) {
  return M.pure();
}

function a_4(_a, e) {
  return M.raise(e);
}

function b_1(_b) {
  p4();
  p5();
  return M.chainBH(e1(), b_2, b_4);
}

function b_2(_b) {
  return M.chainBH(e(2), b_3, b_4);
}

function b_3(_b) {
  return M.pure();
}

function b_4(_b, e) {
  return M.raise(e);
}

function _a_1(a) {
  return M.chainBH(p1(), _a_2, a_6);
}

function _a_2(a) {
  return M.chainBH(p2(), _a_3, a_6);
}

function _a_3(a) {
  return M.chainBH(p2(), _a_4, a_6);
}

function _a_4(a) {
  return M.chainBH(p3(), a_5, a_6);
}

function a_5(a) {
  return M.pure();
}

function a_6(a, e) {
  return M.raise(e);
}