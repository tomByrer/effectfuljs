function a() {
  var a = M.context();
  return M.scopeH(a_1, a_5);
}

function a_1(a) {
  return M.chainBH(eff(1), a_2, a_5);
}

function a_2(a, b) {
  a._ = b;
  return M.chainBH(eff(2), a_3, a_5);
}

function a_3(a, b) {
  return M.chainBH(effC(a._, b), a_4, a_5);
}

function a_4(a) {
  return M.pure();
}

function a_5(a, e) {
  return M.raise(e);
}