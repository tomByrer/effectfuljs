function a() {
  eff(1);
  eff(2);
  return eff(3);
}

function b() {
  var b = M.context();
  return M.scopeH(b_1, b_4);
}

function b_1(b) {
  eff(1);
  return M.chainBH(eff(2), b_2, b_4);
}

function b_2(b) {
  eff(3);
  return M.chainBH(eff(4), b_3, b_4);
}

function b_3(b) {
  return M.pure(5);
}

function b_4(b, e) {
  return M.raise(e);
}