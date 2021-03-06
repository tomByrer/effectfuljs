function aa() {
  var A = class A {
    method() {
      return M.scopeH(_1, _2);

      function _1() {
        return M.pure('from A');
      }

      function _2(e) {
        return M.raise(e);
      }
    }

    static smethod() {
      return M.scopeH(_1, _2);

      function _1() {
        return M.pure('static from A');
      }

      function _2(e) {
        return M.raise(e);
      }
    }

  },
      B = class B extends A {
    method() {
      var _this = this;

      return M.scopeH(_1, _3, _this);

      function _1(_this) {
        var a;
        a = Object.getPrototypeOf(B.prototype).method.call(_this);
        return M.chainBH(M.chain(a), _2, _3);
      }

      function _2(a) {
        return M.pure('from B ' + a);
      }

      function _3(e) {
        return M.raise(e);
      }
    }

    static smethod() {
      var _this = this;

      return M.scopeH(_1, _3, _this);

      function _1(_this) {
        var a;
        a = Object.getPrototypeOf(B.prototype).method.call(_this);
        return M.chainBH(M.chain(a), _2, _3);
      }

      function _2(a) {
        return M.pure('static from B ' + a);
      }

      function _3(e) {
        return M.raise(e);
      }
    }

  };
  return M.scopeH(_1, _2);

  function _1() {
    return M.pure();
  }

  function _2(e) {
    return M.raise(e);
  }
}