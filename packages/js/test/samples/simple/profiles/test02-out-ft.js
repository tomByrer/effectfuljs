function e() {
  var e = M.context();
  return M.scopeH(e_1, e_4);
}

function e_1(e) {
  return M.chainBH(eff1(), e_2, e_4);
}

function e_2(e) {
  return M.chainBH(eff2(), e_3, e_4);
}

function e_3(e) {
  return M.pure();
}

function e_4(e, _e) {
  return M.raise(_e);
}