function a() {
  var a = M.context();
  return M.scopeH(a_1, a_6);
}

function a_1(a) {
  return M.chainBH(eff(1), a_2, a_6);
}

function a_2(a) {
  return M.chainBH(eff(2), a_3, a_6);
}

function a_3(a, c) {
  if (c) {
    return M.chainBH(eff3(), a_4, a_6);
  } else {
    b;
    return M.pure();
  }
}

function a_4(a) {
  return M.chainBH(eff4(), a_5, a_6);
}

function a_5(a) {
  return M.pure();
}

function a_6(a, e) {
  return M.raise(e);
}