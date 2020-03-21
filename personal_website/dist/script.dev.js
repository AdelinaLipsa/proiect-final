"use strict";

$(window).scroll(function () {
  $(".scrollDown").css("opacity", 1 - $(window).scrollTop() / 250);
});
$(window).scroll(function () {
  var scrollPos = $(window).scrollTop();
  navbar = $(".logo-text, .center");
  navbarBg = $(".navbar");

  if (scrollPos > $(window).height()) {
    navbar.addClass("alt-color");
    navbarBg.addClass("alt-color");
  } else {
    navbar.removeClass("alt-color");
    navbarBg.removeClass("alt-color");
  }
});
$(document).ready(function () {
  $(".contact").click(function (e) {
    $(".card").toggleClass("active");
    $(".banner").toggleClass("active");
    $(".photo").toggleClass("active");
    $(".social-media-banner").toggleClass("active");
    $(".email-form").toggleClass("active");
    var buttonText = $("button.contact#main-button").text();

    if (buttonText === "back") {
      buttonText = "click to get in touch";
      $("button.contact#main-button").text(buttonText);
    } else {
      buttonText = "back";
      $("button.contact#main-button").text(buttonText);
    }
  });
  $("#projects > li").hover(function () {
    $(this).siblings().addClass("blur");
  }, function () {
    $(this).removeClass("clicked").siblings().removeClass("blur");
  });
  $("#projects > li").click(function (e) {
    $(this).addClass("clicked");
  });

  function generateBalls() {
    for (var i = 0; i < Math.floor(window.innerWidth / 20); i++) {
      $(".gooey-animations").append("\n      <div class=\"ball\"></div>\n    ");
      var colors = ["#28323B", "#ff4d5a"];
      $(".ball").eq(i).css({
        bottom: "0px",
        left: Math.random() * window.innerWidth - 100,
        "animation-delay": Math.random() * 5 + "s",
        transform: "translateY(" + Math.random() * 10 + "px)",
        "background-color": colors[i % 2]
      });
    }
  }

  generateBalls();
  window.addEventListener("resize", function (e) {
    $(".gooey-animations .ball").remove();
    generateBalls();
  });
});