function a() {
  var a = M.context();
  return M.scopeH(a_1, a_4);
}

function a_1(a) {
  a._i = 0;
  return M.chainBH(eff2(2), a_2, a_4);
}

function a_2(a, b) {
  return M.chainBH(eff1(b), a_3, a_4);
}

function a_3(a) {
  return M.pure();
}

function a_4(a, e) {
  return M.raise(e);
}