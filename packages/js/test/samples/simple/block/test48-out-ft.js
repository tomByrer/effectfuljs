function a() {
  var a = M.context();
  return M.scopeH(a_1, a_3);
}

function a_1(a) {
  a._i = 0;
  return M.chainBH(eff(1), a_2, a_3);
}

function a_2(a) {
  return M.pure();
}

function a_3(a, e) {
  return M.raise(e);
}