function a() {
  var j;

  function b(i) {
    return M.jM1(eff1(i, j), _1, i);

    function _1(i) {
      i++, j++;
      return eff2(i, j);
    }
  }

  var i;
  i = 0;
  j = 0;
  return M.jM1(eff3(i, j), _1, i);

  function _1(i) {
    i++, j--;
    return M.jM1(b(i), _2, i);
  }

  function _2(i) {
    i--, j++;
    return eff4(i, j);
  }
}