function a() {
  var a = M.context();
  return M.scopeH(a_1, a_3);
}

function a_1(a) {
  return M.chainBH(eff('1'), a_2, a_3);
}

function a_2(a, b) {
  console.log(b, 3);
  console.log('2');
  return M.pure(console.log('3'));
}

function a_3(a, e) {
  return M.raise(e);
}