function a() {
  var a = M.context();
  return M.scopeH(a_1, a_3);
}

function a_1(a) {
  if (true) {
    1 + 1;
  }

  return M.chainBH(M.pure(), a_2, a_3);
}

function a_2(a, r) {
  return M.pure(r);
}

function a_3(a, e) {
  return M.raise(e);
}