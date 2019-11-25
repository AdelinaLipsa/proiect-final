"use strict";

var background = document.querySelector('.background');
document.addEventListener('scroll', function () {
  var scrollY = window.scrollY;

  if (scrollY !== 0) {
    background.style.backgroundPosition = "calc(50% + ".concat(scrollY, "px) calc(50% + ").concat(scrollY, "px)");
  } else {
    background.style.backgroundPosition = '';
  }
});