function asyncify(fn) {
  var orig_fn = fn,
    intv = setTimeout(function() {
      intv = null;
      if (fn) {
        fn();
      }
    }, 0);

  fn = null;
  return function() {
    if (intv) {
      fn = orig_fn.bind.apply(
        orig_fn,
        [this].concat([].slice.call(arguments))
        );
    }
    // 이미 비동기
    else {
      orig_fn.apply(this, arguments);
    }
  };
}