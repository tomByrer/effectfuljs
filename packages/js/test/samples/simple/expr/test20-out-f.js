function a() {
  var r;
  return M.chainBH(eff('1'), _1, _3);

  function _1(a) {
    console.log(a, 3);
    console.log('2');
    console.log('3');
    return M.chainBH(eff(2), _2, _3);
  }

  function _2(r) {
    return M.pure(r);
  }

  function _3(e) {
    return M.raise(e);
  }
}