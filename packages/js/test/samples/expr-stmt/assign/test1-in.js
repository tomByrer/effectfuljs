function aS(){
  var b1 = eff(1);
  eff("a");
  eff("b");
}

exports.a = a

function a(){
  var b1 = 0
  b1 = eff(1);
  eff("a");
  eff("b");
}

function a1(){
  var a;
  a = eff(1);
  eff("a");
  eff("b");
}

function bS(){
  var b1 = eff(1), b2 = eff(2);
  eff(b1);
  eff(b2);
}

function b() {
  var b1 = eff(1), b2 = eff(2);
  eff(b1);
  eff(b2);
  b1 = b2 = 100
}

function b1(){
  var a, c;
  a = eff(1), c = eff(2);
  eff(a); 
  eff(c);
}

function c(){
  var a = eff(1), b = 2, c = eff(3);
  eff("a");
  eff("b");
  var d = eff(4), e = 5, f = eff(6), 
      g = eff(7), j = 8;
  var x = eff("x"), y = "y", z = eff("z");
  eff(9);
  a = b = c = d = e = f = g = j = x = y = z = 1000;
  eff(10);
}

function d() {
  eff1("a").some = eff(2);
  eff("b").some+=eff(3);
  eff("c").some++;
  some['d']--;
}
function e1() {
  var cc = eff(1,cc);
  cc = eff(2,cc);
  eff(2,cc)
}
function e2() {
  var cc = eff(1,cc);
  cc = eff(2,cc);
  eff(3,cc)
  {
    const cc = eff(4,cc);
    cc = eff(5,cc)
    eff(6,cc)
  }
  eff(7,cc)
}
