function a() {
  var a = M.context();
  return M.scopeH(a_1, a_16);
}

function a_1(a) {
  a._i = 0;
  return M.chainBH(eff0(), a_2, a_16);
}

function a_2(a) {
  a._i += 2;
  return M.chainBH(effM(), a_3, a_16);
}

function a_3(a) {
  return M.chainBH(effN(), a_4, a_16);
}

function a_4(a) {
  var b;
  b = ++a._i;
  return M.chainBH(effI1(b), a_5, a_16);
}

function a_5(a, b) {
  return M.chainBH(eff2(b), a_6, a_16);
}

function a_6(a, b) {
  a._ = b;
  a._1 = a._i++;
  return M.chainBH(eff3(a._i), a_7, a_16);
}

function a_7(a, b) {
  return M.chainBH(eff1(a._, a._1, b), a_8, a_16);
}

function a_8(a) {
  return M.chainBH(effN(), a_9, a_16);
}

function a_9(a, b) {
  return M.chainBH(effI(b), a_10, a_16);
}

function a_10(a, b) {
  return M.chainBH(effM(b), a_11, a_16);
}

function a_11(a) {
  return M.chainBH(effI(), a_12, a_16);
}

function a_12(a, b) {
  a._2 = b;
  return M.chainBH(effJ(), a_13, a_16);
}

function a_13(a, b) {
  return M.chainBH(eff4(a._2, b), a_14, a_16);
}

function a_14(a) {
  return M.chainBH(eff5(), a_15, a_16);
}

function a_15(a) {
  return M.pure();
}

function a_16(a, e) {
  return M.raise(e);
}