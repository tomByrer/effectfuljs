(function () {
  var j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return M.jumpH(_1, _4, j, len, ref);

  function _1(j, len, ref) {
    var i;

    if (j < len) {
      i = ref[j];
      return M.chainBH(eff(i), _2, _4, j, len, ref);
    } else {
      return M.pure();
    }
  }

  function _2(a, j, len, ref) {
    if (a) {
      return M.jumpRH(_3, _4, j, len, ref);
    } else {
      return M.jumpRH(_3, _4, j, len, ref);
    }
  }

  function _3(j, len, ref) {
    j++;
    return M.jumpRH(_1, _4, j, len, ref);
  }

  function _4(e) {
    return M.raise(e);
  }
});

(function () {
  return M.chainBH(eff('bi'), _1, _5);

  function _1() {
    var i;
    i = 0;
    return M.jumpH(_2, _5, i);
  }

  function _2(i) {
    if (i < 3) {
      return M.chainBH(eff('bi:', i), _3, _5, i);
    } else {
      return M.chainBH(eff('ai'), _4, _5);
    }
  }

  function _3(i) {
    i++;
    return M.jumpRH(_2, _5, i);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
});

(function () {
  return M.chainBH(eff('bi'), _1, _5);

  function _1() {
    var i;
    i = 0;
    return M.jumpH(_2, _5, i);
  }

  function _2(i) {
    if (i < 3) {
      return M.chainBH(eff('bi:', i), _3, _5, i);
    } else {
      return M.chainBH(eff('ai'), _4, _5);
    }
  }

  function _3(i) {
    i++;
    return M.jumpRH(_2, _5, i);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
});

(function () {
  return M.chainBH(eff('bi'), _1, _9);

  function _1() {
    var i;
    i = 0;
    return M.jumpH(_2, _9, i);
  }

  function _2(i) {
    if (i < 3) {
      return M.chainBH(eff('bj:' + i), _3, _9, i);
    } else {
      return M.jumpH(_7, _9);
    }
  }

  function _3(i) {
    var j;
    j = 0;
    return M.jumpRH(_4, _9, i, j);
  }

  function _4(i, j) {
    if (j < 40) {
      if (j === 10) {
        return M.jumpH(_6, _9, i);
      } else {
        if (j === 30) {
          return M.jumpH(_7, _9);
        } else {
          return M.chainBH(eff(i + j), _5, _9, i, j);
        }
      }
    } else {
      return M.chainBH(eff('aj:' + i), _6, _9, i);
    }
  }

  function _5(i, j) {
    j += 10;
    return M.jumpRH(_4, _9, i, j);
  }

  function _6(i) {
    i++;
    return M.jumpRH(_2, _9, i);
  }

  function _7() {
    return M.chainBH(eff('ai'), _8, _9);
  }

  function _8() {
    return M.pure();
  }

  function _9(e) {
    return M.raise(e);
  }
});

function a() {
  return M.chainBH(eff('b'), _1, _5);

  function _1() {
    var i;
    i = 0;
    return M.jumpH(_2, _5, i);
  }

  function _2(i) {
    if (i < 3) {
      if (i === 2) {
        console.log(i);
      }

      return M.chainBH(eff(i), _3, _5, i);
    } else {
      return M.chainBH(eff('a'), _4, _5);
    }
  }

  function _3(i) {
    i++;
    return M.jumpRH(_2, _5, i);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}

;

function a1() {
  return M.chainBH(eff('b'), _1, _5);

  function _1() {
    var i, j;
    i = 0;
    j = 10;
    return M.jumpH(_2, _5, i, j);
  }

  function _2(i, j) {
    if (i < 3) {
      if (i === 2) {
        console.log(i, j);
      }

      return M.chainBH(eff(i, j), _3, _5, i, j);
    } else {
      return M.chainBH(effRes(i, j), _4, _5);
    }
  }

  function _3(i, j) {
    i++, j += 2;
    return M.jumpRH(_2, _5, i, j);
  }

  function _4() {
    return M.pure();
  }

  function _5(e) {
    return M.raise(e);
  }
}

function b() {
  return M.chainBH(eff('b'), _1, _2);

  function _1() {
    if (i === 2) {
      console.log(i);
    }

    return M.chainBH(eff(i), _1, _2);
  }

  function _2(e) {
    return M.raise(e);
  }
}

function c() {
  return M.chainBH(eff('b'), _1, _2);

  function _1() {
    if (i === 2) {
      console.log(i);
    }

    if (i === 3) {
      return M.pure(10);
    } else {
      return M.chainBH(eff(i), _1, _2);
    }
  }

  function _2(e) {
    return M.raise(e);
  }
}

function d() {
  var result, i;
  result = 0;
  i = 0;
  return M.jumpH(_1, _4, result, i);

  function _1(result, i) {
    if (i < 10) {
      return M.chainBH(eff(result, i), _2, _4, i);
    } else {
      return M.chainBH(eff(result), _3, _4);
    }
  }

  function _2(a, i) {
    var result;
    result = a;
    i++;
    return M.jumpRH(_1, _4, result, i);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}

function e() {
  var result, i;
  result = 0;
  i = 0;
  return M.jumpH(_1, _4, i);

  function _1(i) {
    if (i < 10) {
      return M.chainBH(eff(i), _2, _4, i);
    } else {
      return M.chainBH(eff(), _3, _4);
    }
  }

  function _2(a, i) {
    var result;
    result = a;
    i++;
    return M.jumpRH(_1, _4, i);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}

function f() {
  var result, i;
  result = 0;
  i = 0;
  return M.jumpH(_1, _4, result, i);

  function _1(result, i) {
    if (i < 10) {
      return M.chainBH(eff(i), _2, _4, i);
    } else {
      return M.chainBH(eff(result), _3, _4);
    }
  }

  function _2(a, i) {
    var result;
    result = a;
    i++;
    return M.jumpRH(_1, _4, result, i);
  }

  function _3() {
    return M.pure();
  }

  function _4(e) {
    return M.raise(e);
  }
}

function c1() {
  var result, i, a;
  result = [];

  for (i = 0; i < 10;) {
    (i => {
      result[i] = function cc() {
        var a;
        a = result += i++;
        return M.chainBH(eff(a), _1, _2);

        function _1() {
          return M.pure();
        }

        function _2(e) {
          return M.raise(e);
        }
      };
    })(i);
  }

  a = result;
  return M.chainBH(eff(a), _1, _2);

  function _1() {
    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}

function c2() {
  var result, i;
  result = [];
  i = 0;
  return M.jumpH(_1, _3, i);

  function _1(i) {
    var a;

    if (i < 10) {
      return M.chainBH((i => {
        return M.chainBH(eff(function cc() {
          var a;
          a = result += i++;
          return M.chainBH(eff(a), _1, _2);

          function _1() {
            return M.pure();
          }

          function _2(e) {
            return M.raise(e);
          }
        }), _1, _2);

        function _1(a) {
          result[i] = a;
          return M.pure();
        }

        function _2(e) {
          return M.raise(e);
        }
      })(i), _1, _3, i);
    } else {
      a = result;
      return M.chainBH(eff(a), _2, _3);
    }
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}

function c2() {
  var result, i;
  result = [];
  i = 0;
  return M.jumpH(_1, _3, i);

  function _1(i) {
    var a;

    if (i < 10) {
      return M.chainBH((i => {
        var a;
        a = i++;
        return M.chainBH(function cc(j) {
          var a;
          a = result += i += j;
          return M.chainBH(eff(a), _1, _2);

          function _1() {
            return M.pure();
          }

          function _2(e) {
            return M.raise(e);
          }
        }(a), _1, _3);

        function _1(a) {
          return M.chainBH(eff(a), _2, _3);
        }

        function _2(a) {
          result[i] = a;
          return M.pure();
        }

        function _3(e) {
          return M.raise(e);
        }
      })(i), _1, _3, i);
    } else {
      a = result;
      return M.chainBH(eff(a), _2, _3);
    }
  }

  function _2() {
    return M.pure();
  }

  function _3(e) {
    return M.raise(e);
  }
}